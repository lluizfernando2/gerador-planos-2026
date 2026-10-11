/**
 * ============================================================================
 * ÁREA PROTEGIDA. NÃO ALTERAR LAYOUT, ESTRUTURA, CAMPOS OU ESTILOS DOS TEMPLATES
 * SEM AUTORIZAÇÃO EXPRESSA.
 * 
 * Este módulo define e encapsula os templates e geradores documentais imutáveis:
 * - Modelo Oficial 1 (Base Guia Priorizado 2026 - Padrão Campinas Leste)
 * - Modelo Oficial 1 Customizável (Sequência Customizável)
 * - Modelo AVA-EFAPE
 * - Planos de Recuperação Semestral (Resolução SEDUC 42/2024)
 * ============================================================================
 */

export { 
  buildDocumentHTML, 
  buildAvaEfapeDocumentHTML, 
  getWeeksForBimestre, 
  getWeekPeriod, 
  getVerificationStrategy, 
  sanitizeHtmlForExport 
} from '../../lib/documentGenerator';

export {
  PRESET_RECOVERY_TEMPLATES,
  generateCustomRecoveryPlan,
  buildRecoveryPlanHTML,
  generateRecoveryPlanMarkdown
} from '../../data/recoveryTemplates';
