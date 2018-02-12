
import {Similarity} from './similarity';

export class Data {
  name: string;
  id: string;
  similarity: Similarity;
  result: string;
  group: string;
  endPoint: string;
  domain: number;
  description: string;
  chembl: boolean;
  imageUrl: string;

  constructor (data) {
    this.description = data.description;
    this.name = data.name;
    this.id = data.id;
    this.result = data.result;
    this.group = data.group;
    this.endPoint = data.endPoint;
    this.domain = data.domain;
    this.similarity = new Similarity(data.similarity);
    this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?size=200&structure=' +
      this.parseSmiles(data.smile) + '&standardize=true&format=svg';
    this.chembl = data.id.split('CHEMBL').length > 1;
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
}
