# Estrutura do Banco de Dados - Firebase Firestore

Database ID: `ai-studio-currculoprioriza-37ffe096-1718-471a-88ab-badfc6819341`

## Coleções

### 1. `users`
Guarda perfis dos docentes autenticados.
- `userId` (string) - UID do Firebase Auth (Chave do documento)
- `email` (string)
- `displayName` (string)
- `updatedAt` (string ISO)

### 2. `user_plans`
Guarda os planejamentos de ensino gerados pelo docente.
- `id` (string)
- `userId` (string) - Isolado por RLS
- `title` (string)
- `subject` (string)
- `grade` (string)
- `bimester` (string)
- `data` (map/object)
- `createdAt` (string ISO)
- `updatedAt` (string ISO)

### 3. `user_settings`
Configurações personalizadas por professor.
- `userId` (string) - Chave do documento
- `escola` (string)
- `docente` (string)
- `componente` (string)
- `serie` (string)
- `updatedAt` (string ISO)
