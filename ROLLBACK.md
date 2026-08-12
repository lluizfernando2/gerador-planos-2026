# Plano de Rollback e Contingência (ROLLBACK.md)

## Procedimento de Recuperação de Emergência

1. **Rollback de Código**:
   - Reverter commits no repositório mantendo a suíte de testes de caracterização para revalidar a estabilidade.
2. **Rollback de Regras Firestore**:
   - As regras anteriores do Firestore em `firestore.rules` podem ser reimplantadas a qualquer momento via ferramenta de deploy sem downtime.
3. **Contingência Offline**:
   - Caso o serviço do Firestore sofra indisponibilidade, os módulos de domínio chave (`StaticCurriculumRepository`, `AcademicCalendar`, `DocxDocumentEngine`) continuam funcionando no modo cliente sem interrupções.
