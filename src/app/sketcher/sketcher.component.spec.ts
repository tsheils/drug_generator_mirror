import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SketcherComponent } from './sketcher.component';
import {MaterialModule} from '../../assets/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingService} from '../services/loading.service';
import {PredictorService} from '../services/predictor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ModelParserService} from '../services/model-parser.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SketcherComponent', () => {
  let component: SketcherComponent;
  let fixture: ComponentFixture<SketcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SketcherComponent ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        LoadingService,
        PredictorService,
        ModelParserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SketcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
