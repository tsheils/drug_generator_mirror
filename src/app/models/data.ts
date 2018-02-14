
import {Similarity} from './similarity';

export class Data {
  description: string;
  domain: number;
  endPoint: string;
  group: string;
  id: string;
  name: string;
  result: string;
  similarity: Similarity;
  smile: string;
  value: string;
  type: string;

  constructor (data) {
    this.description = data.description;
    this.domain = data.domain;
    this.endPoint = data.endPoint;
    this.group = data.group;
    this.id = data.id;
    this.name = data.name;
    this.result = data.result;
    this.similarity = new Similarity(data.similarity);
    this.smile = data.smile;
    this.value = data.value;
    this.type = data.type;
  }

  private parseSmiles(smiles: string): string {
    const parsed = smiles
      .replace(/[;]/g, '%3B')
      .replace(/[#]/g, '%23')
      .replace(/[+]/g, '%2B')
      .replace(/[\\]/g, '%5C')
      .replace(/[|]/g, '%7C');
    return parsed;
  }

   toCSV(): string {
     const similarity = [...(Object.values(this.similarity))].join(',');
     const data = [...(Object.values(this))].join(',');
    return data.replace('[object Object]', similarity);
  }

  isChembl(): boolean {
    return this.id.split('CHEMBL').length > 1;
  }

  getImageUrl(): string {
    return 'https://tripod.nih.gov/servlet/renderServletv12/?size=200&structure=' +
      this.parseSmiles(this.smile) + '&standardize=true&format=svg';
  }
}
