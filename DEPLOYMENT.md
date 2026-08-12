# Guia de Implantação e Deploy (DEPLOYMENT.md)

## Requisitos de Ambiente
- Node.js v18+
- Porta 3000 (Obrigatória no ambiente Cloud Run / Nginx Proxy)

## Scripts do `package.json`
- `npm run dev`: Inicia o servidor backend Express com suporte a TypeScript via `tsx`
- `npm run build`: Compila os arquivos estáticos do frontend Vite e gera o bundle CommonJS do servidor em `dist/server.cjs` via `esbuild`
- `npm run start`: Executa o servidor compilado em produção com `node dist/server.cjs`
- `npm run lint`: Executa a verificação estática de tipos sem emissão de código (`tsc --noEmit`)

## Regras de Segurança Firestore
Para aplicar as regras RLS atualizadas no Firebase:
Deploy de regras de segurança executado automaticamente via ferramentas do ecossistema AI Studio.
