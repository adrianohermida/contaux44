import React, { useState, useCallback } from 'react';
import { Settings, GripVertical, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * Dashboard Customizer - Permite personalizar widgets e layout
 * Drag-and-drop, adicionar/remover widgets, salvar configuração
 */
export default function DashboardCustomizer({ onConfigChange }) {
  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem('dashboardConfig');
    return saved ? JSON.parse(saved) : getDefaultWidgets();
  });
  const [editMode, setEditMode] = useState(false);

  const saveConfig = useCallback(() => {
    localStorage.setItem('dashboardConfig', JSON.stringify(widgets));
    onConfigChange?.(widgets);
    setEditMode(false);
  }, [widgets, onConfigChange]);

  const addWidget = useCallback((type) => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      type,
      title: getWidgetTitle(type),
      position: widgets.length,
      size: 'medium'
    };
    setWidgets([...widgets, newWidget]);
  }, [widgets]);

  const removeWidget = useCallback((id) => {
    setWidgets(widgets.filter(w => w.id !== id));
  }, [widgets]);

  const moveWidget = useCallback((fromIdx, toIdx) => {
    const newWidgets = [...widgets];
    const [moved] = newWidgets.splice(fromIdx, 1);
    newWidgets.splice(toIdx, 0, moved);
    setWidgets(newWidgets.map((w, i) => ({ ...w, position: i })));
  }, [widgets]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Personalizar Dashboard</h3>
        <Button
          variant={editMode ? 'default' : 'outline'}
          size="sm"
          onClick={() => editMode ? saveConfig() : setEditMode(true)}
        >
          <Settings className="w-4 h-4 mr-1" />
          {editMode ? 'Salvar' : 'Editar'}
        </Button>
      </div>

      {editMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 mb-3">Arraste widgets para reorganizar ou clique para remover</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {['kpi', 'chart', 'table', 'forecast', 'alert'].map(type => (
              <Button
                key={type}
                variant="outline"
                size="sm"
                onClick={() => addWidget(type)}
              >
                <Plus className="w-3 h-3 mr-1" /> {getWidgetTitle(type)}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {widgets.map((widget, idx) => (
          <div
            key={widget.id}
            className={`flex items-center gap-3 p-4 border rounded-lg transition-all ${
              editMode ? 'bg-gray-50 cursor-move' : 'bg-white'
            }`}
            draggable={editMode}
            onDragStart={(e) => {
              e.dataTransfer.setData('index', idx);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const fromIdx = parseInt(e.dataTransfer.getData('index'));
              if (fromIdx !== idx) moveWidget(fromIdx, idx);
            }}
          >
            {editMode && <GripVertical className="w-5 h-5 text-gray-400" />}
            <div className="flex-1">
              <p className="font-medium text-sm">{widget.title}</p>
              <p className="text-xs text-gray-500">Tipo: {widget.type}</p>
            </div>
            {editMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeWidget(widget.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function getDefaultWidgets() {
  return [
    { id: 'kpi-1', type: 'kpi', title: 'KPI - Receita', position: 0, size: 'medium' },
    { id: 'kpi-2', type: 'kpi', title: 'KPI - Pagamentos', position: 1, size: 'medium' },
    { id: 'chart-1', type: 'chart', title: 'Gráfico - Receita Mensal', position: 2, size: 'large' },
    { id: 'table-1', type: 'table', title: 'Tabela - Últimas Transações', position: 3, size: 'large' }
  ];
}

function getWidgetTitle(type) {
  const titles = {
    kpi: 'KPI',
    chart: 'Gráfico',
    table: 'Tabela',
    forecast: 'Previsão',
    alert: 'Alertas'
  };
  return titles[type] || type;
}