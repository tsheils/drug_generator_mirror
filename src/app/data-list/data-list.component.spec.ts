import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListComponent } from './data-list.component';
import {MaterialModule} from '../../assets/material/material.module';
import {DataListService} from '../services/data-list.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('DataListComponent', () => {
  let component: DataListComponent;
  let fixture: ComponentFixture<DataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataListComponent ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        DataListService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
