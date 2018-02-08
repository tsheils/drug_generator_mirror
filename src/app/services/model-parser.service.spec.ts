import { TestBed, inject } from '@angular/core/testing';

import { ModelParserService } from './model-parser.service';

describe('ModelParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelParserService]
    });
  });

  it('should be created', inject([ModelParserService], (service: ModelParserService) => {
    expect(service).toBeTruthy();
  }));
});
