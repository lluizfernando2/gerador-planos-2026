# Especificação de APIs - Backend Express

## Endpoints Públicos

### `GET /api/health`
Métricas de saúde e status do sistema.
- **Resposta**: `{ status: "ok", system: "...", securityStatus: "...", timestamp: "..." }`

### `GET /api/curriculum/subjects`
Lista de componentes curriculares e formatos suportados.

### `GET /api/curriculum/search?q=...&subject=...&grade=...&bimester=...`
Busca e filtragem de objetos de aprendizagem no servidor.

### `GET /api/comments`
Retorna a lista de depoimentos e sugestões da comunidade.

### `POST /api/comments`
Publica um novo comentário (Rate Limit: 10 requisições / 5 min).
- **Body**: `{ name: string, role: string, rating: number, text: string }`

### `POST /api/comments/:id/like`
Registra curtida em comentário (Rate Limit: 30 requisições / min).

### `POST /api/ai/verify-prompt`
Valida e encapsula prompts contra injeção e jailbreak (Rate Limit: 20 requisições / min).

### `POST /api/plans/validate`
Valida integridade e parâmetros do plano de ensino (Rate Limit: 30 requisições / min).
