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


@NgModule({
  declarations: [
    AppComponent,
    NcatsHeaderComponent,
    NcatsFooterComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
