
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
  smiles: string;
  type: string;
  value: string;

  constructor (data) {
    console.log(data);
    this.description = data.description;
    this.domain = data.domain;
    this.endPoint = data.endPoint;
    this.group = data.group;
    this.id = data.id;
    this.name = data.name;
    this.result = data.result;
    this.similarity = new Similarity(data.similarity);
    this.smiles = data.smiles.replace('\n', '');
    this.type = data.type;
    this.value = data.value;
  }

  private parseSmiles(smiles: string): string {
      //  console.log(smiles);
      const parsed = smiles
        .replace(/[;]/g, '%3B')
        .replace(/[#]/g, '%23')
        .replace(/[@]/g, '%40')
        .replace(/[+]/g, '%2B')
        .replace(/[\\]/g, '%5C')
        .replace(/[\[]/g, '%5B')
        .replace(/[\]]/g, '%5D')
        .replace(/[|]/g, '%7C');
      return parsed;
  }

   toCSV(): string {
     const similarity = [...(Object.values(this.similarity))].join('\t');
     const data = [...(Object.values(this))].join('\t');
    return data.replace('[object Object]', similarity);
  }

  isChembl(): boolean {
    return this.id.split('CHEMBL').length > 1;
  }

  getImageUrl(): string {
    return 'https://tripod.nih.gov/servlet/renderServletv12/?size=200&structure=' +
      this.parseSmiles(this.smiles) + '&standardize=true&format=svg';
  }
}
