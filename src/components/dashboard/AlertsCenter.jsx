import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { AlertCircle, TrendingDown, Clock, DollarSign } from 'lucide-react';

export default function AlertsCenter({ tenantId }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const checkAlerts = async () => {
      try {
        const invoices = await base44.entities.Invoice.filter({ tenant_id: tenantId });
        const alerts = [];

        // Alerta: Faturas atrasadas
        const overdue = invoices.filter(i => i.status === 'overdue');
        if (overdue.length > 0) {
          alerts.push({
            id: 'overdue',
            type: 'error',
            title: 'Faturas Atrasadas',
            message: `${overdue.length} fatura(s) com pagamento atrasado`,
            icon: AlertCircle
          });
        }

        // Alerta: Faturas vencendo em breve
        const upcoming = invoices.filter(i => {
          const dueDate = new Date(i.due_date);
          const today = new Date();
          const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
          return daysUntilDue <= 7 && daysUntilDue > 0;
        });
        if (upcoming.length > 0) {
          alerts.push({
            id: 'upcoming',
            type: 'warning',
            title: 'Faturas Vencendo',
            message: `${upcoming.length} fatura(s) vencendo nos próximos 7 dias`,
            icon: Clock
          });
        }

        // Alerta: Baixo recebimento
        const paidAmount = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.paid_amount || 0), 0);
        const totalAmount = invoices.reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const receivedRate = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;
        
        if (receivedRate < 50) {
          alerts.push({
            id: 'low-received',
            type: 'warning',
            title: 'Taxa de Recebimento Baixa',
            message: `Apenas ${receivedRate.toFixed(0)}% das faturas foram recebidas`,
            icon: DollarSign
          });
        }

        setAlerts(alerts);
      } catch (error) {
        console.error('Erro ao verificar alertas:', error);
      }
    };

    checkAlerts();
    const interval = setInterval(checkAlerts, 300000);
    return () => clearInterval(interval);
  }, [tenantId]);

  if (alerts.length === 0) return null;

  const colors = {
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  };

  return (
    <div className="space-y-3">
      {alerts.map(alert => {
        const Icon = alert.icon;
        return (
          <div key={alert.id} className={`${colors[alert.type]} border rounded-lg p-4 flex gap-3`}>
            <Icon className={`w-5 h-5 flex-shrink-0 ${alert.type === 'error' ? 'text-red-600' : 'text-yellow-600'}`} />
            <div>
              <p className="font-medium text-sm text-slate-900">{alert.title}</p>
              <p className="text-sm text-slate-600">{alert.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}