import { TestBed, inject } from '@angular/core/testing';

import { PredictorService } from './predictor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PredictorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PredictorService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([PredictorService], (service: PredictorService) => {
    expect(service).toBeTruthy();
  }));
});
