/**
 * Formats educational prompts for teachers to copy and use in Google Gemini
 */
export function buildLessonPrompt(topic: string, grade: string, subject: string, skills?: string): string {
  return `Você é um especialista em planejamento pedagógico alinhado ao Currículo Paulista (Referencial 2026).

Por favor, elabore uma sugestão detalhada de plano de aula e atividades práticas para:
- Componente Curricular: ${subject}
- Ano/Série: ${grade}
- Tema/Conteúdo: ${topic}
${skills ? `- Habilidades Focais: ${skills}` : ''}

Diretrizes Obrigatórias:
1. NÃO faça referências a "revisão" nem crie frases que expliquem como o ensino está sendo aplicado nos campos de Aprendizagem Essencial e Taxonomia de Bloom.
2. NÃO use frases genéricas de modo algum (proibido usar termos vazios como "desenvolver habilidades", "compreender os conteúdos", "Lembrar, Compreender, Aplicar").
3. O campo "Aprendizagem Essencial" deve conter estritamente as habilidades curriculares oficiais específicas. SEMPRE que inserir o código de uma habilidade (ex.: EF09MA01, EM13CHS101), insira obrigatoriamente o texto completo com a descrição da habilidade no formato: (Código) - Descrição da Habilidade.
4. O campo "Taxonomia de Bloom / Ações Priorizadas" deve listar ações cognitivas diretas e mensuráveis aplicadas especificamente a "${topic}".

Estruture a proposta com:
1. Objetivo de aprendizagem claro e mensurável
2. Desenvolvimento metodológico (Início, Desenvolvimento e Encerramento)
3. Atividade prática ou situação-problema
4. Estratégia de avaliação formativa e acompanhamento das aprendizagens`;
}

export { buildSecuredPrompt, sanitizeInput, containsPromptInjection, SUPER_PROMPT_SYSTEM_INSTRUCTIONS } from './securityPrompt';
