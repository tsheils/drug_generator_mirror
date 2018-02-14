export class Similarity {
  index: string;
  neighborhoodActivity: string;
  neighborhoodStructure: string;
  value: string;

  constructor (data) {
    this.index = data.index;
    this.value = data.value;
    this.neighborhoodActivity = data.neighborhoodActivity;
    this.neighborhoodStructure = data.neighborhoodStructure;
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

  getNeighborImageUrl(): string {
    return 'https://tripod.nih.gov/servlet/renderServletv12/?size=200&structure=' +
      this.parseSmiles(this.neighborhoodStructure) + '&standardize=true&format=svg';
  }
}
