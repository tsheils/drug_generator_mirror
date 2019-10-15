import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MaterialModule} from '../assets/material/material.module';
import {NcatsFooterComponent} from './ncats-footer/ncats-footer.component';
import {NcatsHeaderComponent} from './ncats-header/ncats-header.component';
import {DataListComponent} from './data-list/data-list.component';
import {DataViewerComponent} from './data-viewer/data-viewer.component';
import {SketcherComponent} from './sketcher/sketcher.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingService} from './services/loading.service';
import {PredictorService} from './services/predictor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ModelParserService} from './services/model-parser.service';
import {DataListService} from './services/data-list.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NcatsFooterComponent,
        NcatsHeaderComponent,
        DataListComponent,
        DataViewerComponent,
        SketcherComponent
      ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        LoadingService,
        PredictorService,
        ModelParserService,
        DataListService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
/*  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');*/
 // }));
});
