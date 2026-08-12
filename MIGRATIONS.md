# Migrações e Persistência (MIGRATIONS.md)

## Estratégia de Transição
1. **Transição de Armazenamento Local para Firestore Cloud**:
   - As configurações e planejamentos anteriormente salvos apenas no `localStorage` do navegador do usuário agora são sincronizados de forma transparente e persistente com as coleções `/user_plans` e `/user_settings` do Firestore.
2. **Backward Compatibility**:
   - O aplicativo lê do Firestore quando o usuário está autenticado e mantém fallback local seguro em offline/sessão anônima.
