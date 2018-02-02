import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
/*
  @ViewChild('sketcher') sketchTarget: ElementRef;
*/
  marvinSketcherInstance;

  title = 'app';
  data: {};

  url: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer,
              private http: HttpClient) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./assets/vendor/marvin/editorws.html');
  }
  ngOnInit(){
    let ctrl = this;
    window['MarvinJSUtil'].getEditor('#sketcher').then(function (marvin) {
      console.log(marvin);
      ctrl.marvinSketcherInstance = marvin;
      ctrl.marvinSketcherInstance.on("molchange", function(){

      })
    }, function (err) {
      console.log(err);
    });
  }

  ngAfterViewInit(): void {

  }

  submit() {
    let ctrl = this;
    ctrl.marvinSketcherInstance.exportStructure("mol").then(function(source){
      console.log(source);
      ctrl.http.post('https://predictor.ncats.io/route/predx/structurePredict', source).subscribe(res => {
        console.log(res[0]);
        ctrl.data = res[0];
      })
    })
  }
}
