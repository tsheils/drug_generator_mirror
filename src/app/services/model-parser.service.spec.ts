import { TestBed, inject } from '@angular/core/testing';

import { ModelParserService } from './model-parser.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ModelParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelParserService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([ModelParserService], (service: ModelParserService) => {
    expect(service).toBeTruthy();
  }));
});
