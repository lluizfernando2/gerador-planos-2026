# Suíte de Testes Automatizados (TESTING.md)

## Execução

### Testes de Segurança e Sanidade
```bash
npx tsx scripts/test-security.ts
```

### Typecheck TypeScript
```bash
npm run lint
```

## Cobertura dos Testes Atuais
- ✅ Sanitização de Payloads XSS e Injeção de Código
- ✅ Detecção de Tentativa de Injeção de Prompt
- ✅ Estrutura do Super Prompt de Segurança
- ✅ API Backend Operacional e Headers HTTP Ativos (`X-Content-Type-Options`, `X-Frame-Options`)
- ✅ Bloqueio de Mass Assignment de Campos Privilegiados
- ✅ Endpoint de Verificação AI Ativo
