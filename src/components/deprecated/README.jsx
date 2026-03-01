# 🗂️ Deprecated Components

Este diretório contém arquivos históricos de sprint/fase que foram consolidados ou substituídos.

## 📝 Política de Deprecated Files

- **Quando mover para aqui:** Arquivos de auditoria, relatórios de fase, tags de sprint (SPRINT_*, PHASE_*, *_VALIDATION, *_COMPLETION, *_DIAGNOSTIC, *_REPORT)
- **Quando remover:** Após 3 sprints sem referência no codebase (90+ dias)
- **Padrão de nomeação:** Original filename preserved

## 📂 Estrutura

```
deprecated/
├── audit-reports/       # Relatórios de auditoria (*_AUDIT, *_DIAGNOSTIC)
├── sprint-artifacts/    # Tags de sprint (SPRINT_*, *_COMPLETION)
├── phase-artifacts/     # Tags de fase (PHASE_*, *_VALIDATION)
└── README.md           # Este arquivo
```

## 🔗 Referência

Para acessar arquivos movidos:
```javascript
// ❌ NÃO FAZER
import { SomeComponent } from '@/components/dashboard/SPRINT_15_COMPLETION';

// ✅ FAZER
// 1. Verificar se funcionalidade foi absorvida em outro componente
// 2. Se necessário recuperar lógica, consultar git history
// git log --all -- 'components/dashboard/SPRINT_15_COMPLETION.jsx'
```

## 📅 Última atualização
- Sprint 1: 2026-03-01 (Higienização inicial)