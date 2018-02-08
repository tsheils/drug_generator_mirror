export class Similarity {
  neighborImageUrl: string;
  index;
  value;
  neighborhoodActivity;

  constructor (data) {
    console.log(data);
    this.index = data.index;
    this.value = data.value;
    this.neighborhoodActivity = data.neighborhoodActivity;
    this.neighborImageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?size=200&structure=' +
      this.parseSmiles(data.neighborhoodStructure) + '&standardize=true&format=svg'
  }

  private parseSmiles(smiles: string): string {
    console.log(smiles);
    const parsed = smiles
      .replace(/[;]/g, '%3B')
      .replace(/[#]/g, '%23')
      .replace(/[+]/g, '%2B')
      .replace(/[\\]/g, '%5C')
      .replace(/[|]/g, '%7C');
    return parsed;
  }
}
