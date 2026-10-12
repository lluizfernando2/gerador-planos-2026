import { CurriculumItem } from '../../types';
import { initialCurriculumData } from '../../data/curriculumData';
import { itinerariosEMData } from '../../data/itinerariosEMData';
import { ALL_TECNICO_DATA, mapTecnicoToCurriculum } from '../../data/tecnicoData';
import {
  PROJETO_DE_VIDA_DATA,
  TECNOLOGIA_INOVACAO_DATA,
  ORIENTACAO_ESTUDO_MATEMATICA_DATA,
  ORIENTACAO_ESTUDO_PORTUGUES_DATA,
  EDUCACAO_FINANCEIRA_DATA,
  REDACAO_LEITURA_DATA
} from '../../data/diversificadaData';
import { MATRIZ_SOCIOEMOCIONAL } from '../../data/socioemocionalDatabase';

export interface ICurriculumRepository {
  getFourthBimesterData(): Promise<CurriculumItem[]>;
  getFgbItems(): Promise<CurriculumItem[]>;
  getDiversificadaData(): Promise<any>;
  getItinerarioItems(): Promise<CurriculumItem[]>;
  getTecnicoItems(): Promise<CurriculumItem[]>;
  getAllItems(): Promise<CurriculumItem[]>;
  getSocioemocionalMatriz(): Promise<any>;
  
  // High School methods
  getHighSchoolFgbItems(): Promise<CurriculumItem[]>;
  getHighSchoolDiversificadaItems(): Promise<CurriculumItem[]>;
  getHighSchoolItinerarioItems(): Promise<CurriculumItem[]>;
  getHighSchoolTecnicoItems(): Promise<CurriculumItem[]>;
}

export class StaticCurriculumRepository implements ICurriculumRepository {
  private cachedAll: CurriculumItem[] | null = null;
  private getFourthBimester = () => initialCurriculumData.filter(i => i.bimestre === '4º Bimestre');

  async getFourthBimesterData(): Promise<CurriculumItem[]> {
    return this.getFourthBimester();
  }

  async getFgbItems(): Promise<CurriculumItem[]> {
    return initialCurriculumData;
  }

  async getDiversificadaData(): Promise<any> {
    return {
      'Projeto de Vida': PROJETO_DE_VIDA_DATA,
      'Tecnologia e Inovação': TECNOLOGIA_INOVACAO_DATA,
      'Orientação de Estudos - Matemática': ORIENTACAO_ESTUDO_MATEMATICA_DATA,
      'Orientação de Estudos - Português': ORIENTACAO_ESTUDO_PORTUGUES_DATA,
      'Educação Financeira': EDUCACAO_FINANCEIRA_DATA,
      'Redação e Leitura': REDACAO_LEITURA_DATA,
    };
  }

  async getItinerarioItems(): Promise<CurriculumItem[]> {
    return itinerariosEMData;
  }

  async getTecnicoItems(): Promise<CurriculumItem[]> {
    return ALL_TECNICO_DATA.map(mapTecnicoToCurriculum);
  }
  
  // Independent High School implementations
  async getHighSchoolFgbItems(): Promise<CurriculumItem[]> {
    return initialCurriculumData.filter(i => ['1ª Série', '2ª Série', '3ª Série'].includes(i.ano));
  }
  async getHighSchoolDiversificadaItems(): Promise<CurriculumItem[]> {
    const isEM = (ano: string) => ['1ª Série', '2ª Série', '3ª Série'].includes(ano);
    const pv = PROJETO_DE_VIDA_DATA.filter((i: any) => isEM(i.ano));
    const ef = EDUCACAO_FINANCEIRA_DATA.filter((i: any) => isEM(i.ano));
    const rl = REDACAO_LEITURA_DATA.filter((i: any) => isEM(i.ano));
    return [
      ...pv.map((p: any) => ({
        id: p.id || `pv-${p.ano}-${p.aula}`,
        ano: p.ano,
        bimestre: p.bimestre,
        aula: `Aula ${p.aula}`,
        titulo: p.titulo || `Tema: ${p.tema || 'Projeto de Vida'}`,
        conteudo: p.contexto || '',
        objetivos: p.compreensao || '',
        habilidade: p.habilidade || '',
        disciplina: 'Projeto de Vida',
        raw: p
      })),
      ...ef.map((e: any) => ({
        id: e.id || `ef-${e.ano}-${e.aula}`,
        ano: e.ano,
        bimestre: e.bimestre,
        aula: `Aula ${e.aula}`,
        titulo: e.titulo || '',
        conteudo: e.conteudo || '',
        objetivos: e.objetivos || '',
        habilidade: e.habilidade || '',
        disciplina: 'Educação Financeira',
        raw: e
      })),
      ...rl.map((r: any) => ({
        id: r.id || `rl-${r.ano}-${r.aula}`,
        ano: r.ano,
        bimestre: r.bimestre,
        aula: `Aula ${r.aula}`,
        titulo: r.titulo || '',
        conteudo: r.conteudo || '',
        objetivos: r.objetivos || '',
        habilidade: r.habilidade || '',
        disciplina: 'Redação e Leitura',
        raw: r
      }))
    ];
  }
  async getHighSchoolItinerarioItems(): Promise<CurriculumItem[]> {
    return itinerariosEMData;
  }
  async getHighSchoolTecnicoItems(): Promise<CurriculumItem[]> {
    return ALL_TECNICO_DATA.map(mapTecnicoToCurriculum);
  }

  async getAllItems(): Promise<CurriculumItem[]> {
    if (this.cachedAll) return this.cachedAll;
    const tecnico = ALL_TECNICO_DATA.map(mapTecnicoToCurriculum);
    this.cachedAll = [
      ...initialCurriculumData,
      ...itinerariosEMData,
      ...tecnico
    ];
    return this.cachedAll;
  }

  async getSocioemocionalMatriz(): Promise<any> {
    return MATRIZ_SOCIOEMOCIONAL;
  }
}

export const curriculumRepository = new StaticCurriculumRepository();


