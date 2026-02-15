import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

const StatBox = React.memo(({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-600 text-sm">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {trend && <p className="text-xs text-green-600 mt-2">↑ {trend}%</p>}
      </div>
      <Icon className="w-8 h-8" style={{ color }} />
    </div>
  </div>
));

StatBox.displayName = 'StatBox';

export default function AnalyticsDashboard({ tenantId }) {
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('month');

  const loadData = useCallback(async () => {
    if (!tenantId) return;
    
    try {
      const [invData, payData, clientData] = await Promise.all([
        base44.entities.Invoice.filter({ tenant_id: tenantId }),
        base44.entities.Payment.filter({ tenant_id: tenantId }),
        base44.entities.Client.filter({ tenant_id: tenantId })
      ]);
      
      setInvoices(invData);
      setPayments(payData);
      setClients(clientData);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const stats = useMemo(() => {
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total_amount, 0);
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === 'active').length;
    const pendingInvoices = invoices.filter(i => i.status === 'pending' || i.status === 'sent').length;
    
    return {
      totalRevenue,
      totalPaid,
      pending: totalRevenue - totalPaid,
      totalClients,
      activeClients,
      pendingInvoices,
      conversionRate: ((totalPaid / totalRevenue) * 100).toFixed(1)
    };
  }, [invoices, payments, clients]);

  const monthlyData = useMemo(() => {
    const data = {};
    invoices.forEach(inv => {
      const date = new Date(inv.issue_date);
      const key = `${date.getMonth() + 1}/${date.getFullYear()}`;
      if (!data[key]) data[key] = { month: key, revenue: 0, paid: 0 };
      data[key].revenue += inv.total_amount;
    });
    
    payments.forEach(pay => {
      const date = new Date(pay.payment_date);
      const key = `${date.getMonth() + 1}/${date.getFullYear()}`;
      if (data[key]) data[key].paid += pay.amount;
    });
    
    return Object.values(data).sort((a, b) => a.month.localeCompare(b.month)).slice(-6);
  }, [invoices, payments]);

  const statusData = useMemo(() => [
    { name: 'Pago', value: invoices.filter(i => i.status === 'paid').length, fill: '#10b981' },
    { name: 'Pendente', value: invoices.filter(i => i.status === 'pending').length, fill: '#f59e0b' },
    { name: 'Enviado', value: invoices.filter(i => i.status === 'sent').length, fill: '#3b82f6' },
    { name: 'Cancelado', value: invoices.filter(i => i.status === 'cancelled').length, fill: '#ef4444' }
  ].filter(d => d.value > 0), [invoices]);

  if (loading) return <div className="text-center py-12">Carregando análises...</div>;

  return (
    <div className="space-y-6">
      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox icon={DollarSign} label="Receita Total" value={`R$ ${stats.totalRevenue.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`} color="#3b82f6" />
        <StatBox icon={DollarSign} label="Valor Recebido" value={`R$ ${stats.totalPaid.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`} trend={(stats.conversionRate)} color="#10b981" />
        <StatBox icon={Clock} label="Pendências" value={`R$ ${stats.pending.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`} color="#f59e0b" />
        <StatBox icon={Users} label="Clientes Ativos" value={stats.activeClients} trend={(stats.activeClients > 0 ? 5 : 0)} color="#8b5cf6" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Receita Mensal */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                <Legend />
                <Bar dataKey="revenue" name="Receita" fill="#3b82f6" />
                <Bar dataKey="paid" name="Recebido" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status de Faturas */}
        <Card>
          <CardHeader>
            <CardTitle>Status das Faturas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}