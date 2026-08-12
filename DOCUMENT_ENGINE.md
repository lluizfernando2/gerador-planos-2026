# Motor de Geração Documental (DOCUMENT_ENGINE.md)

## Fidelidade Visual para Word / Google Docs

A geração de documentos HTML/DOCX do **Currículo Priorizado** foi projetada para resolver a instabilidade histórica em tabelas de planejamento pedagógico no Microsoft Word e Google Docs.

### Recursos do Engine
1. **Controle Estrito de Largura (`colgroup` e `width="50%"`):**
   - As tabelas possuem declarações explícitas de `<colgroup>` e colunas de `50%` ou larguras fixas.
2. **Propriedades MSO Word:**
   - `table-layout: fixed`
   - `mso-table-layout-alt: fixed`
   - `mso-table-lspace: 0pt`
   - `mso-table-rspace: 0pt`
   - `page-break-inside: avoid`
3. **Cabeçalhos e Margens de Seção:**
   - Declaração `@page Section1` com tamanho A4 (21.0cm x 29.7cm) e margens personalizáveis de 1.5cm por padrão.
4. **Modelos Suportados:**
   - Modelo Oficial 1 (Diretoria de Ensino - Região Campinas Leste)
   - Modelo Oficial 2 (Modelo AVA-EFAPE)
