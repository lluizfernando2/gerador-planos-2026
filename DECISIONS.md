# Registro de Decisões Arquiteturais (DECISIONS.md)

## ADR 001 - Manutenção da Lógica Curricular e do Motor HTML/DOCX
- **Status**: Aprovado e Executado.
- **Contexto**: A auditoria sinalizou risco crítico em reescrever o gerador de documentos e a lógica de negócios de 2026.
- **Decisão**: Preservar o motor HTML de alta fidelidade com `table-layout: fixed` e isolá-lo atrás de `DocxDocumentEngine`.

## ADR 002 - Desacoplamento do App.tsx em Serviços de Domínio
- **Status**: Aprovado e Executado.
- **Contexto**: O `App.tsx` concentrava responsabilidades de acesso a dados, regras de calendário, autenticação e exportação.
- **Decisão**: Mover acesso a dados para `CurriculumRepository`, calendário para `AcademicCalendar`, estado do planejamento para `PlanningDraft`, autenticação para `AuthService` e PIX para `PixService`.

## ADR 003 - Firebase Firestore RLS para Isolamento de Dados
- **Status**: Aprovado e Executado.
- **Contexto**: A aplicação precisava garantir isolamento total entre professores no nível de banco de dados.
- **Decisão**: Implementar Firestore com Security Rules que checam `request.auth.uid == resource.data.userId` e despojam propriedades de privilégios.
