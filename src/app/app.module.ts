import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../assets/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NcatsHeaderComponent} from './ncats-header/ncats-header.component';
import {NcatsFooterComponent} from './ncats-footer/ncats-footer.component';
import {LoadingService} from './services/loading.service';
import {SketcherComponent} from './sketcher/sketcher.component';
import {DataViewerComponent} from './data-viewer/data-viewer.component';
import {MolService} from './services/mol.service';
import { DataListComponent } from './data-list/data-list.component';
import {DataListService} from './services/data-list.service';



@NgModule({
  declarations: [
    AppComponent,
    NcatsHeaderComponent,
    NcatsFooterComponent,
    SketcherComponent,
    DataViewerComponent,
    DataListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    LoadingService,
    MolService,
    DataListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
