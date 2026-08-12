# Arquitetura do Sistema - Currículo Priorizado 2026

## Visão Geral
A aplicação utiliza uma arquitetura **Backend-First + RLS + Defense-in-Depth**, desacoplada em módulos funcionais e serviços de domínio.

```
React Frontend / Vite UI
  ├── features/curriculum (StaticCurriculumRepository)
  ├── features/planning (PlanningDraft Domain Model)
  ├── features/calendar (AcademicCalendar Service 2026)
  ├── features/auth (AuthService - Encapsulando Firebase & Google OAuth)
  ├── features/documents (DocxDocumentEngine & HTML Renderer)
  ├── features/pix (PixService - Gerador EMV QR Code)
  └── features/google (GoogleWorkspaceService)
         │
         ▼
Express API Backend (port 3000)
  ├── Middleware de Segurança (Helmet headers, Sanitização, Anti-Injection)
  ├── Rate-Limiters por Endpoint
  └── Rotas de Validação e Domínio (/api/*)
         │
         ▼
Firebase Firestore (Database ID: ai-studio-currculoprioriza-37ffe096-1718-471a-88ab-badfc6819341)
  ├── /users/{userId} - Perfis de Docentes
  ├── /user_plans/{planId} - Planos de Aula Isolados por RLS
  └── /user_settings/{userId} - Configurações do Docente
```

## Módulos Principais

1. **`CurriculumRepository`**: Encapsula os datasets da rede estadual SP (`curriculumData`, `diversificadaData`, `itinerariosEMData`, `tecnicoData`, `socioemocionalDatabase`).
2. **`AcademicCalendar`**: Gerencia calendários, bimestres, semanas e datas festivas/Saresp de 2026.
3. **`PlanningDraft`**: Modelo de planejamento validável e serializável para persistência.
4. **`AuthService`**: Controla sessões de docentes e escopos OAuth de forma segura em memória.
5. **`DocxDocumentEngine`**: Motorização de documentos com suporte a `table-layout: fixed`, `colgroup`, larguras de célula e regras mso-table para o Word e Google Docs.
