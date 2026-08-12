# Política e Modelo de Segurança (SECURITY.md)

## Princípios Fundamentais
- **Cliente = NÃO CONFIÁVEL**
- **Frontend = NÃO CONFIÁVEL**
- **Request HTTP = NÃO CONFIÁVEL**
- **Backend = AUTORIDADE DE NEGÓCIO**
- **Banco + RLS = ÚLTIMA BARREIRA DE ISOLAMENTO**

## Camadas de Defesa (Defense-in-Depth)

1. **Headers HTTP de Segurança**:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: strict-origin-when-cross-origin`

2. **Rate Limiting e Anti-DoS**:
   - Submissão de Comentários: máximo 10 por 5 minutos
   - Likes: máximo 30 por minuto
   - Verificação AI / Prompt: máximo 20 por minuto
   - Validação de Planos: máximo 30 por minuto

3. **Super Prompt e Sanitização contra Injeção de Código/Prompt**:
   - Sanitização de entrada de texto com strip de tags e neutralização de padrões maliciosos.
   - Detecção de tentativas de override de diretrizes do sistema (`containsPromptInjection`).

4. **Regras de Segurança Firestore (RLS)**:
   - `/user_plans/{planId}`: leitura, edição e exclusão permitidas **apenas** se `request.auth.uid == resource.data.userId`.
   - Impedimento estrito de injeção/alteração de campos privilegiados (`role`, `isAdmin`, `isSuperAdmin`).
