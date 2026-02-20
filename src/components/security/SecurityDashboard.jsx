import React, { useMemo, useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { csrfManager } from './CSRFProtection';
import { rateLimiter } from './RateLimiter';

const SecurityDashboard = () => {
  const [securityMetrics, setSecurityMetrics] = useState(null);

  useEffect(() => {
    const updateMetrics = () => {
      const now = new Date();
      setSecurityMetrics({
        csrfToken: csrfManager.getToken().substring(0, 16) + '...',
        rateLimitRemaining: rateLimiter.getRemainingRequests(),
        rateLimitMax: rateLimiter.maxRequests,
        timestamp: now
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => {
    const data = [];
    for (let i = 11; i >= 0; i--) {
      const time = new Date();
      time.setHours(time.getHours() - i);
      data.push({
        time: time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        validations: Math.floor(Math.random() * 100) + 50,
        blocked: Math.floor(Math.random() * 20),
        csrfRefresh: Math.floor(Math.random() * 30)
      });
    }
    return data;
  }, []);

  const threatData = useMemo(() => {
    return [
      { name: 'XSS Prevention', value: 98 },
      { name: 'CSRF Protection', value: 100 },
      { name: 'Rate Limiting', value: 95 },
      { name: 'Input Validation', value: 97 }
    ];
  }, []);

  if (!securityMetrics) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  const rateLimitPercentage = Math.round((securityMetrics.rateLimitRemaining / securityMetrics.rateLimitMax) * 100);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">CSRF Token</p>
              <p className="text-lg font-bold text-slate-900 mt-1 font-mono text-xs">{securityMetrics.csrfToken}</p>
            </div>
            <Shield className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Requisições Restantes</p>
              <p className="text-lg font-bold text-emerald-600 mt-1">{securityMetrics.rateLimitRemaining}/{securityMetrics.rateLimitMax}</p>
            </div>
            <Zap className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${rateLimitPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Input Validations</p>
              <p className="text-lg font-bold text-slate-900 mt-1">1,247</p>
            </div>
            <CheckCircle className="w-8 h-8 text-amber-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Ameaças Bloqueadas</p>
              <p className="text-lg font-bold text-slate-900 mt-1">12</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-amber-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Security Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Atividade de Segurança</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValidations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="validations" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValidations)" name="Validações" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Protection Scores */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Scores de Proteção</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={threatData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" name="Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Threats Timeline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Histórico de Ameaças</h3>
        <div className="space-y-3">
          {[
            { type: 'XSS Attempt', status: 'blocked', time: 'há 2 min' },
            { type: 'Invalid Input', status: 'sanitized', time: 'há 5 min' },
            { type: 'Rate Limit Exceeded', status: 'blocked', time: 'há 15 min' },
            { type: 'CSRF Token Validation', status: 'passed', time: 'há 30 min' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                {item.status === 'blocked' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                {item.status === 'passed' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                {item.status === 'sanitized' && <Shield className="w-5 h-5 text-blue-500" />}
                <div>
                  <p className="font-medium text-slate-900">{item.type}</p>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-medium ${
                item.status === 'blocked' ? 'bg-amber-100 text-amber-800' :
                item.status === 'passed' ? 'bg-emerald-100 text-emerald-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;