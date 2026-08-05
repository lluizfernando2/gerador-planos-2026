import { LOGO_SP_BASE64 } from '../data/logoSp';
import { buildAvaEfapeDocumentHTML } from '../data/subjectMappings';

export { buildAvaEfapeDocumentHTML };

export function getWeeksForBimestre(bimestre: string) {
  if (bimestre === '1º Bimestre') {
    return [
      { num: 1, period: "02 a 06/02/2026", holiday: "" },
      { num: 2, period: "09 a 13/02/2026", holiday: "" },
      { num: 3, period: "16 a 20/02/2026", holiday: "Feriado: 17/02 - Carnaval" },
      { num: 4, period: "23 a 27/02/2026", holiday: "" },
      { num: 5, period: "02 a 06/03/2026", holiday: "" },
      { num: 6, period: "09 a 13/03/2026", holiday: "" },
      { num: 7, period: "16 a 20/03/2026", holiday: "" },
      { num: 8, period: "23 a 27/03/2026", holiday: "Revisão / Prova Paulista" },
      { num: 9, period: "30/03 a 03/04/2026", holiday: "Feriado: 03/04 - Sexta-feira Santa; Recuperação" },
      { num: 10, period: "06 a 10/04/2026", holiday: "Consolidação" }
    ];
  }
  if (bimestre === '2º Bimestre') {
    return [
      { num: 1, period: "22 a 30/04/2026", holiday: "Dia do Trabalho (01/05)" },
      { num: 2, period: "04 a 08/05/2026", holiday: "" },
      { num: 3, period: "11 a 15/05/2026", holiday: "" },
      { num: 4, period: "18 a 22/05/2026", holiday: "" },
      { num: 5, period: "25 a 29/05/2026", holiday: "" },
      { num: 6, period: "01 a 05/06/2026", holiday: "Feriado: 04/06 - Corpus Christi" },
      { num: 7, period: "08 a 12/06/2026", holiday: "" },
      { num: 8, period: "15 a 19/06/2026", holiday: "Prova Paulista" },
      { num: 9, period: "22 a 26/06/2026", holiday: "Recuperação" },
      { num: 10, period: "29/06 a 03/07/2026", holiday: "Consolidação" }
    ];
  }
  if (bimestre === '3º Bimestre') {
    return [
      { num: 1, period: "24 a 31/07/2026", holiday: "" },
      { num: 2, period: "03 a 07/08/2026", holiday: "" },
      { num: 3, period: "10 a 14/08/2026", holiday: "" },
      { num: 4, period: "17 a 21/08/2026", holiday: "" },
      { num: 5, period: "24 a 28/08/2026", holiday: "" },
      { num: 6, period: "31/08 a 04/09/2026", holiday: "" },
      { num: 7, period: "07 a 11/09/2026", holiday: "Feriado: 07/09 - Independência do Brasil" },
      { num: 8, period: "14 a 18/09/2026", holiday: "Revisão e Preparatório" },
      { num: 9, period: "21 a 25/09/2026", holiday: "PROVA PAULISTA 3º BIMESTRE" },
      { num: 10, period: "28/09 a 02/10/2026", holiday: "Consolidação e Devolutiva" }
    ];
  }
  return [
    { num: 1, period: "05 a 09/10/2026", holiday: "" },
    { num: 2, period: "12 a 16/10/2026", holiday: "Feriado: 12/10 - N. Sra. Aparecida" },
    { num: 3, period: "19 a 23/10/2026", holiday: "" },
    { num: 4, period: "26 a 30/10/2026", holiday: "" },
    { num: 5, period: "02 a 06/11/2026", holiday: "Feriado: 02/11 - Finados" },
    { num: 6, period: "09 a 13/11/2026", holiday: "" },
    { num: 7, period: "16 a 20/11/2026", holiday: "Feriado: 20/11 - Consciência Negra" },
    { num: 8, period: "23 a 27/11/2026", holiday: "Previsão SARESP (25/11 e 26/11)" },
    { num: 9, period: "30/11 a 04/12/2026", holiday: "Recuperação" },
    { num: 10, period: "07 a 18/12/2026", holiday: "Consolidação / Atividades de Fechamento" }
  ];
}

export function getWeekPeriod(bimestre: string, weekIndex: number) {
  const weeks = getWeeksForBimestre(bimestre);
  const w = weeks[weekIndex];
  if (!w) return '';
  if (w.holiday) {
    return `${w.period} | ${w.holiday}`;
  }
  return w.period;
}

export const getVerificationStrategy = (weekContentLower: string, estrategiaSelected: string, weekIndex: number): string => {
  if (weekContentLower.includes('exercício') || weekContentLower.includes('cálculo') || weekContentLower.includes('equação') || weekContentLower.includes('resolução') || weekContentLower.includes('problema') || weekContentLower.includes('quadro') || weekContentLower.includes('matemática') || weekContentLower.includes('fórmula')) {
    const list = [
      "Pedir que estudantes demonstrem procedimentos no quadro.",
      "Solicitar que os estudantes identifiquem e corrijam um erro proposital no exemplo.",
      "Promover checagem em duplas onde um estudante explica a resolução do problema ao outro."
    ];
    return list[weekIndex % list.length];
  }

  if (weekContentLower.includes('discussão') || weekContentLower.includes('debate') || weekContentLower.includes('conceito') || weekContentLower.includes('leitura') || weekContentLower.includes('texto') || weekContentLower.includes('análise') || weekContentLower.includes('teoria')) {
    const list = [
      "Fazer perguntas abertas que exijam explicação do raciocínio pelo estudante.",
      "Propor sínteses rápidas do que foi aprendido, por escrito ou oralmente.",
      "Pedir aos estudantes que formulem uma pergunta sobre a principal dúvida do tema abordado."
    ];
    return list[weekIndex % list.length];
  }

  if (weekContentLower.includes('grupo') || weekContentLower.includes('dupla') || weekContentLower.includes('prática') || weekContentLower.includes('oficina') || weekContentLower.includes('projeto') || weekContentLower.includes('estação') || estrategiaSelected.includes('Rotação') || estrategiaSelected.includes('grupo')) {
    const list = [
      "Circular pela sala observando produções e conversas.",
      "Promover checagem em duplas onde um estudante explica a resolução do problema ao outro.",
      "Aplicar um teste rápido de resposta única (exit ticket) para verificar a compreensão imediata."
    ];
    return list[weekIndex % list.length];
  }

  const defaultList = [
    "Fazer perguntas abertas que exijam explicação do raciocínio pelo estudante.",
    "Pedir que estudantes demonstrem procedimentos no quadro.",
    "Circular pela sala observando produções e conversas.",
    "Propor sínteses rápidas do que foi aprendido, por escrito ou oralmente.",
    "Solicitar que os estudantes identifiquem e corrijam um erro proposital no exemplo.",
    "Promover checagem em duplas onde um estudante explica a resolução do problema ao outro.",
    "Aplicar um teste rápido de resposta única (exit ticket) para verificar a compreensão imediata."
  ];

  return defaultList[weekIndex % defaultList.length];
};

export function sanitizeHtmlForExport(html: string): string {
  if (!html) return '';
  return html
    .replace(/<button[^>]*class="[^"]*gemini-prompt-trigger[^"]*"[^>]*>[\s\S]*?<\/button>/gi, '<span style="float: right; font-size: 8.5pt; font-weight: bold; color: #166534; background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 6px; border-radius: 4px;">🎁 Bônus: Prompt Gemini Incluído</span>')
    .replace(/<button[^>]*data-week-idx="[^"]*"[^>]*>[\s\S]*?<\/button>/gi, '<span style="float: right; font-size: 8.5pt; font-weight: bold; color: #166534; background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 6px; border-radius: 4px;">🎁 Bônus: Prompt Gemini Incluído</span>');
}

/**
 * Standardized document builder for both "Modelo Oficial 1" and "Modelo Oficial 1 (Sequência Customizável)".
 * Ensures 100% exact parity in table structure, rows, columns, styles, borders and layout.
 */
export function buildDocumentHTML(
  escola: string,
  docente: string,
  segmento: string,
  componente: string,
  serie: string,
  bimestre: string,
  semanas: any[],
  _trabalhosDate?: string,
  _avaliacoesDate?: string
) {
  // Extract unique AEs for the global AEs block from week list
  const globalAEs: string[] = [];
  semanas.forEach(s => {
    if (!s.ae) return;
    const matches = s.ae.matchAll(/<li>(.*?)<\/li>/g);
    for (const match of matches) {
      const text = match[1].replace(/<[^>]*>/g, '').trim();
      if (text && !globalAEs.includes(text)) {
        globalAEs.push(text);
      }
    }
  });

  const getBimestreDateRange = (bim: string) => {
    if (bim === '1º Bimestre') return '1º (02/02 a 10/04/2026)';
    if (bim === '2º Bimestre') return '2º (23/04 a 08/07/2026)';
    if (bim === '3º Bimestre') return '3º (24/07 a 02/10/2026)';
    return '4º (05/10 a 18/12/2026)';
  };

  const tableRows = semanas.map((s, idx) => {
    // Standardize all subjects, including diversificadas, to use the official 2-column template
    const isDiversificada = false;

    const cleanConteudos = (s.conteudos || '')
      .replace(/atividade\s+verificadora(\s+de\s+aprendizagem)?/gi, '')
      .replace(/Atividade\s+Verificadora(\s+de\s+Aprendizagem)?/gi, '')
      .replace(/<\/?li>\s*<\/?li>/gi, '')
      .replace(/<li>\s*:\s*<\/li>/gi, '')
      .trim();

    const estrategiaVerificacaoTexto = s.estrategia_verificacao || getVerificationStrategy(cleanConteudos ? cleanConteudos.toLowerCase() : '', s.estrategia || '', idx);

    // Standard official 2-column table template
    return `
      <!-- Week Table -->
      <table border="1" width="100%" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 12pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; border: 1pt solid black; table-layout: fixed; mso-table-layout-alt: fixed; mso-table-lspace: 0pt; mso-table-rspace: 0pt; page-break-inside: avoid; line-height: 1.2;">
        <colgroup>
          <col width="50%" style="width: 50%;">
          <col width="50%" style="width: 50%;">
        </colgroup>
        <tbody>
          <!-- Row 1: Plano de Aula -->
          <tr>
            <td colspan="2" width="100%" style="border: 1pt solid black; padding: 5pt 8pt; background-color: #00b0f0; color: black; font-weight: bold; font-size: 11pt; line-height: 1.15; text-align: center; width: 100%;">
              <strong>Plano de Aula</strong>
            </td>
          </tr>
          <!-- Row 2: Período e Aula(s) material digital (fundo branco) -->
          <tr>
            <td width="50%" style="border: 1pt solid black; padding: 5pt 8pt; background-color: #ffffff; color: black; font-weight: bold; font-size: 11pt; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Período: ${s.periodo}</strong>
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 5pt 8pt; background-color: #ffffff; color: black; font-weight: bold; font-size: 11pt; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Aula(s) material digital: ${s.aulas_escopo}</strong>
            </td>
          </tr>
          <!-- Black divider row -->
          <tr>
            <td width="50%" style="border: 1pt solid black; padding: 2pt; background-color: #000000; color: #000000; font-size: 1pt; line-height: 1pt; width: 50%;">&nbsp;</td>
            <td width="50%" style="border: 1pt solid black; padding: 2pt; background-color: #000000; color: #000000; font-size: 1pt; line-height: 1pt; width: 50%;">&nbsp;</td>
          </tr>
          <!-- Row 3 Headers: Aprendizagem Essencial (AE) & Ações Tax. Bloom -->
          <tr style="background-color: white;">
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Aprendizagem Essencial (AE)</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Ações Tax. Bloom / Habilidades priorizadas</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
          </tr>
          <!-- Row 3 Content -->
          <tr>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${s.ae || ''}
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${s.acoes_bloom || ''}
            </td>
          </tr>

          <!-- Row 4 Headers: Conteúdo & Metodologia/Estratégia -->
          <tr style="background-color: white;">
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Conteúdo</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Metodologia/Estratégia</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
          </tr>
          <!-- Row 4 Content -->
          <tr>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${cleanConteudos || ''}
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${s.estrategia || ''}
            </td>
          </tr>

          <!-- Row 5 Headers: Estratégia de verificação / Parada Intencional & Avaliação -->
          <tr style="background-color: white;">
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Estratégia de verificação / Parada Intencional</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Avaliação</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
          </tr>
          <!-- Row 5 Content -->
          <tr>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${estrategiaVerificacaoTexto}
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${s.avaliacao || ''}
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }).join('\n<p style="margin: 6pt 0 6pt 0; font-size: 1pt; line-height: 1pt; display: block; mso-line-height-rule: exactly;">&nbsp;</p>\n');

  return `
    <div style="font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; line-height: 1.2; max-width: 21cm; margin: 0 auto; box-sizing: border-box; text-align: justify;">
        <!-- Header Logo Block -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 8pt; font-family: Cambria, Georgia, serif; border: none; font-size: 11pt; line-height: 1.15;">
          <tr>
            <td style="width: 160px; vertical-align: middle; border: none; padding: 0;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <img src="${LOGO_SP_BASE64}" alt="Logo Governo SP" style="width: 150px; height: auto; display: block;" />
              </div>
            </td>
            <td style="vertical-align: middle; border: none; padding: 0; text-align: center;">
              <div style="font-size: 10pt; font-weight: bold; line-height: 1.15; text-transform: uppercase; color: black; font-family: Cambria, Georgia, serif;">
                SECRETARIA DE ESTADO DA EDUCAÇÃO DE SÃO PAULO – DIRETORIA DE ENSINO
              </div>
              <div style="font-size: 10.5pt; font-weight: bold; line-height: 1.15; margin-top: 2pt; text-transform: uppercase; color: black; font-family: Cambria, Georgia, serif;">
                ${escola.toUpperCase() || 'E.E. NOME DA UNIDADE ESCOLAR'}
              </div>
              <div style="font-size: 8.5pt; color: black; line-height: 1.15; margin-top: 2pt; font-family: Cambria, Georgia, serif;">
                DIRETORIA DE ENSINO / UNIDADE REGIONAL DE ENSINO - SÃO PAULO
              </div>
            </td>
          </tr>
        </table>
        
        <!-- SP State Identity Accent Line (Dark Red) -->
        <div style="border-bottom: 2.5px solid #a31515; margin-bottom: 12pt; width: 100%;"></div>

        <!-- Identification Block (Yellow Theme #ffc000) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 12pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; border: 1.5pt solid black; table-layout: fixed; background-color: #ffc000; line-height: 1.15;">
          <tbody>
            <tr>
              <td colspan="3" style="border: 1pt solid black; padding: 5pt; text-align: center; font-weight: bold; font-size: 11pt; background-color: #ffc000; color: black; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                ${escola.toUpperCase() || 'E.E. NOME DA UNIDADE ESCOLAR'}
              </td>
            </tr>
            <tr>
              <td colspan="3" style="border: 1pt solid black; padding: 5pt; text-align: center; font-weight: bold; font-size: 11pt; background-color: #ffc000; color: black; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                PLANO DE ENSINO COM DESENVOLVIMENTO DO PLANO DE AULA
              </td>
            </tr>
            <tr>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; width: 50%; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Curso:</strong> ${segmento.toUpperCase()}
              </td>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; width: 50%; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;" colspan="2">
                <strong>Componente Curricular:</strong> ${componente.toUpperCase()}
              </td>
            </tr>
            <tr>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Docente:</strong> ${docente.toUpperCase() || 'DOCENTE RESPONSÁVEL'}
              </td>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Ano Letivo:</strong> 2026
              </td>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Bimestre:</strong> ${getBimestreDateRange(bimestre)}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Ano/Série:</strong> ${serie.toUpperCase()}
              </td>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              </td>
            </tr>
            <tr>
              <td colspan="3" style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; line-height: 1.25; font-size: 11pt; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Datas:</strong><br />
                ${bimestre === '1º Bimestre' ? `
                  FERIADOS E PONTO FACULTATIVO: 17/02/2026; 03/04/2026<br />
                  OMASP: 09 a 13/03/2026<br />
                  PROVA PAULISTA 1º BIMESTRE: 23 a 27/03/2026
                ` : bimestre === '2º Bimestre' ? `
                  FERIADOS E PONTO FACULTATIVO: 01/05/2026; 04 e 05/06/2026; 09/07/2026<br />
                  OMASP: 18 a 22/05/2026<br />
                  PROVA PAULISTA 2º BIMESTRE: 15 a 19/06/2026
                ` : bimestre === '4º Bimestre' ? `
                  FERIADOS E PONTO FACULTATIVO: 12/10/2026; 02/11/2026; 20/11/2026; 08/12/2026<br />
                  PREVISÃO SARESP: 25/11/2026 e 26/11/2026<br />
                  PROVA PAULISTA 4º BIMESTRE: 23 a 27/11/2026
                ` : `
                  FERIADOS E PONTO FACULTATIVO: 07/09/2026<br />
                  RECUPERAÇÃO E APROFUNDAMENTO: 27 a 30/07/2026<br />
                  PROVA DE RECUPERAÇÃO: 03 a 07/08/2026<br />
                  OLISP: 24 a 28/08/2026<br />
                  PROVA PAULISTA 3º BIMESTRE: 21 a 25/09/2026
                `}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Section 1: PLANO DE ENSINO (Cyan #00b0f0) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 6pt; border: 1pt solid black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="background-color: #00b0f0; border: 1pt solid black; padding: 5pt; text-align: center; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              PLANO DE ENSINO – BASE GUIA PRIORIZADO
            </td>
          </tr>
        </table>

        <!-- Global Aprendizagens Essenciais Block -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 12pt; border: 1pt solid black; font-size: 11pt; line-height: 1.2; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="border: 1pt solid black; padding: 6pt; vertical-align: top;">
              <strong style="color: #002060; font-size: 11pt; display: block; margin-bottom: 4pt;">APRENDIZAGENS ESSENCIAIS (AE) DO BIMESTRE:</strong>
              ${globalAEs.length > 0 ? `<ul style="margin: 0; padding-left: 15pt;">` + globalAEs.map(ae => `<li style="margin-bottom: 3pt; text-align: justify;">${ae}</li>`).join('') + `</ul>` : '<p style="margin: 0;">Conforme detalhado no cronograma semanal.</p>'}
            </td>
          </tr>
        </table>

        <!-- Section: Taxonomia de Bloom (Cyan #00b0f0) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 0pt; border: 1pt solid black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="background-color: #00b0f0; border: 1pt solid black; padding: 5pt; text-align: left; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              Taxonomia de Bloom
            </td>
          </tr>
        </table>
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 12pt; border: 1pt solid black; border-top: none; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="border: 1pt solid black; padding: 8pt 6pt; text-align: justify; background-color: white; font-size: 11pt; line-height: 1.15; color: black; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>1. Conhecimento/Memorizar: Verbos:</strong> enumerar, definir, descrever, identificar, denominar, listar, nomear, combinar, realçar, apontar, relembrar, recordar, relacionar, reproduzir, solucionar, declarar, distinguir, rotular, memorizar, ordenar e reconhecer.</p>
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>2. Compreensão: Verbos:</strong> alterar, construir, converter, decodificar, defender, definir, descrever, distinguir, discriminar, estimar, explicar, generalizar, dar exemplos, ilustrar, inferir, reformular, prever, reescrever, resolver, resumir, classificar, discutir, identificar, interpretar, reconhecer, redefinir, selecionar, situar e traduzir.</p>
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>3. Aplicação: Verbos:</strong> aplicar, alterar, programar, demonstrar, desenvolver, descobrir, dramatizar, empregar, ilustrar, interpretar, manipular, modificar, operacionalizar, organizar, prever, preparar, produzir, relatar, resolver, transferir, usar, construir, esboçar, escolher, escrever, operar e praticar.</p>
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>4. Análise: Verbos:</strong> analisar, reduzir, classificar, comparar, contrastar, determinar, deduzir, diagramar, distinguir, diferenciar, identificar, ilustrar, apontar, inferir, relacionar, selecionar, separar, subdividir, calcular, discriminar, examinar, experimentar, testar, esquematizar e questionar.</p>
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>5. Criar/Síntese: Verbos:</strong> categorizar, combinar, compilar, compor, conceber, construir, criar, desenhar, elaborar, estabelecer, explicar, formular, generalizar, inventar, modificar, organizar, originar, planejar, propor, reorganizar, relacionar, revisar, reescrever, resumir, sistematizar, escrever, desenvolver, estruturar, montar e projetar.</p>
              <p style="margin: 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>6. Avaliação: Verbos:</strong> Avaliar, averiguar, escolher, comparar, concluir, contrastar, criticar, decidir, defender, discriminar, explicar, interpretar, justificar, relatar, resolver, resumir, apoiar, validar, escrever um review sobre, detectar, estimar, julgar e selecionar.</p>
            </td>
          </tr>
        </table>

        <!-- Section: ESTRATÉGIA/METODOLOGIAS (Cyan #00b0f0) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 0pt; border: 1pt solid black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="background-color: #00b0f0; border: 1pt solid black; padding: 5pt; text-align: left; font-weight: bold; font-size: 11pt; color: black; text-transform: uppercase; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              ESTRATÉGIA/METODOLOGIAS
            </td>
          </tr>
        </table>
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 12pt; border: 1pt solid black; border-top: none; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="width: 50%; border: 1pt solid black; padding: 8pt 6pt; vertical-align: top; text-align: justify; background-color: white; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>A-</strong> Aula expositiva com discussão pautada no material digital;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>B-</strong> Aula de estudo directed pautada no recurso do material impresso;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>C-</strong> Estudo dirigido;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>D-</strong> Estudo de caso (análise criteriosa e minuciosa de uma situação)</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>E-</strong> Aprendizagem baseada em problemas;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>F-</strong> Brainstorm (chuva de ideias)</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>G-</strong> Mapa mental;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>H-</strong> Mapa conceitual;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>I-</strong> Gamificação;</p>
            </td>
            <td style="width: 50%; border: 1pt solid black; padding: 8pt 6pt; vertical-align: top; text-align: justify; background-color: white; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>J-</strong> Rotação por estações;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>K-</strong> Aula prática;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>L-</strong> Sala de aula invertida;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>M-</strong> Philips 66 (análise e discussão em grupo);</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>N-</strong> Estudo do meio;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>O-</strong> Seminário;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>P-</strong> Construção de painel;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>Q-</strong> Dimensão lúdica e cultural (danças, brincadeiras, lutas e adaptações dos esportes tradicionais.)</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>R-</strong> Outros (Especificar)</p>
            </td>
          </tr>
        </table>

        <!-- Section 2: PLANO DE AULA SEMANAL (Cyan #00b0f0) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 12pt; border: 1pt solid black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="background-color: #00b0f0; border: 1pt solid black; padding: 5pt; text-align: center; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              PLANO DE AULA SEMANAL
            </td>
          </tr>
        </table>

        <!-- Weekly Tables List -->
        ${tableRows}

        <!-- Section 5: Referências (Yellow #ffc000) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 0pt; border: 1pt solid black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="background-color: #ffc000; border: 1pt solid black; padding: 5pt; text-align: left; font-weight: bold; font-size: 11pt; color: black; text-transform: uppercase; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              REFERÊNCIAS
            </td>
          </tr>
        </table>
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 12pt; border: 1pt solid black; border-top: none; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="border: 1pt solid black; padding: 8pt 6pt; text-align: justify; background-color: white; font-size: 11pt; line-height: 1.15; color: black; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">BLOOM, B. S. et al. <strong>Taxonomy of educational objectives</strong>. New York: David Mckay, 1956. 262 p.</p>
              <p style="margin: 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">FERRAZ, Ana Paula do C. M. e BELHOT, Renato V.. <strong>Taxonomia de Bloom: revisão teórica e apresentação das adequações do instrumento para definição de objetivos instrucionais</strong>. Gest. Prod., São Carlos, v. 17, n. 2, p. 421-431, 2010.</p>
            </td>
          </tr>
        </table>
    </div>
  `;
}
