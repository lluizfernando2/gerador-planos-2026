import { CurriculumItem } from '../../types';
import { initialCurriculumData } from '../../data/curriculumData';
import { fourthBimesterData } from '../../data/fourthBimesterData';
import { ensinoMedioFgbData } from '../../data/ensinoMedioFgbData';
import { ensinoMedioDiversificadaData } from '../../data/ensinoMedioDiversificadaData';
import { ensinoMedioItinerariosData } from '../../data/ensinoMedioItinerariosData';
import { ensinoMedioTecnicoData } from '../../data/ensinoMedioTecnicoData';
import {
  PROJETO_DE_VIDA_DATA,
  TECNOLOGIA_INOVACAO_DATA,
  ORIENTACAO_ESTUDO_MATEMATICA_DATA,
  ORIENTACAO_ESTUDO_PORTUGUES_DATA,
  EDUCACAO_FINANCEIRA_DATA,
  REDACAO_LEITURA_DATA
} from '../../data/diversificadaData';
import { itinerariosEMData } from '../../data/itinerariosEMData';
import { MATRIZ_SOCIOEMOCIONAL } from '../../data/socioemocionalDatabase';
import { ALL_TECNICO_DATA, mapTecnicoToCurriculum } from '../../data/tecnicoData';

export interface ICurriculumRepository {
  getFgbItems(): Promise<CurriculumItem[]>;
  getDiversificadaData(): Promise<any>;
  getItinerarioItems(): Promise<CurriculumItem[]>;
  getTecnicoItems(): Promise<CurriculumItem[]>;
  getAllItems(): Promise<CurriculumItem[]>;
  getSocioemocionalMatriz(): Promise<any>;
}

export class StaticCurriculumRepository implements ICurriculumRepository {
  private cachedAll: CurriculumItem[] | null = null;

  async getFgbItems(): Promise<CurriculumItem[]> {
    return [...fourthBimesterData, ...ensinoMedioFgbData];
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
    return ensinoMedioItinerariosData;
  }

  async getTecnicoItems(): Promise<CurriculumItem[]> {
    return ensinoMedioTecnicoData;
  }

  async getAllItems(): Promise<CurriculumItem[]> {
    if (this.cachedAll) return this.cachedAll;
    this.cachedAll = [
      ...fourthBimesterData,
      ...ensinoMedioFgbData,
      ...ensinoMedioDiversificadaData,
      ...ensinoMedioItinerariosData,
      ...ensinoMedioTecnicoData
    ];
    return this.cachedAll;
  }

  async getSocioemocionalMatriz(): Promise<any> {
    return MATRIZ_SOCIOEMOCIONAL;
  }
}

export const curriculumRepository = new StaticCurriculumRepository();

