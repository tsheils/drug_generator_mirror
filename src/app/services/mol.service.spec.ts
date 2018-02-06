import { TestBed, inject } from '@angular/core/testing';

import { MolService } from './mol.service';

describe('MolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MolService]
    });
  });

  it('should be created', inject([MolService], (service: MolService) => {
    expect(service).toBeTruthy();
  }));
});
