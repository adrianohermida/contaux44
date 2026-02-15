import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  paid: '#10b981',
  overdue: '#ef4444',
  sent: '#f59e0b',
  draft: '#94a3b8'
};

export default function PaymentStatusChart({ invoices }) {
  const chartData = useMemo(() => {
    const counts = { paid: 0, overdue: 0, sent: 0, draft: 0 };
    const today = new Date();

    invoices.forEach(inv => {
      if (inv.status === 'paid') counts.paid++;
      else if (inv.status === 'draft') counts.draft++;
      else if (new Date(inv.due_date) < today && inv.status !== 'paid') counts.overdue++;
      else counts.sent++;
    });

    return Object.entries(counts)
      .filter(([_, v]) => v > 0)
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));
  }, [invoices]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={chartData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} dataKey="value">
          {chartData.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name.toLowerCase()] || '#8b5cf6'} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}