import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewerComponent } from './data-viewer.component';
import {MaterialModule} from '../../assets/material/material.module';
import {LoadingService} from '../services/loading.service';
import {PredictorService} from '../services/predictor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataListService} from '../services/data-list.service';

describe('DataViewerComponent', () => {
  let component: DataViewerComponent;
  let fixture: ComponentFixture<DataViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataViewerComponent ],
      imports: [
        MaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        LoadingService,
        PredictorService,
        DataListService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
