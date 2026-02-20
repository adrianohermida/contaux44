# DESIGN SYSTEM - CONTAUX DASHBOARD

## 🎨 PALETA DE CORES OFICIAL

### Primária
- **Azul Principal**: `#1e40af` (blue-900)
- **Azul Claro**: `#3b82f6` (blue-500)
- **Azul Muito Claro**: `#f0f9ff` (blue-50)

### Gradientes
- **Sidebar**: `from-blue-900 to-blue-950`
- **Cards**: `from-blue-50 to-blue-100`
- **Hover**: `hover:bg-blue-800`

### Complementares
- **Sucesso**: `#059669` (emerald-600)
- **Alerta**: `#dc2626` (red-600)
- **Info**: `#1e40af` (blue-900)

---

## 🏗️ COMPONENTES PADRÃO

### Cards
```jsx
<Card className="p-4 border-blue-200 hover:shadow-md transition-shadow">
  {/* Conteúdo */}
</Card>
```

### Métricas
```jsx
<Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
  <p className="text-xs text-blue-600 font-semibold">Label</p>
  <p className="text-2xl font-bold text-blue-900 mt-1">Valor</p>
</Card>
```

### Gráficos
```jsx
<LineChart>
  <CartesianGrid stroke="#dbeafe" />
  <Line stroke="#1e40af" />
  <Tooltip contentStyle={{ backgroundColor: '#f0f9ff', border: '1px solid #bfdbfe' }} />
</LineChart>
```

---

## 📱 RESPONSIVIDADE MOBILE-FIRST

### Breakpoints
- **Mobile**: < 640px (default)
- **Tablet**: 640px - 1024px (sm, md)
- **Desktop**: > 1024px (lg, xl)

### Layout
- Mobile: Stack vertical, menu inferior
- Tablet: Sidebar colapsado, conteúdo adaptado
- Desktop: Sidebar completo, grid 2-3 colunas

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

- [x] Azul como cor primária em sidebar
- [x] Gradientes azuis em cards
- [x] Mobile-first responsive layout
- [x] ClientPortal removido do menu
- [x] Componentes profiling com design consistente
- [ ] Home page redirecionamento corrigido
- [ ] Todos os módulos seguindo design system