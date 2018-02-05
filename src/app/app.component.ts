import {AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {DOCUMENT} from '@angular/common';
import {LoadingService} from "./services/loading.service";


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
  loading = false;
  navIsFixed: boolean;
  title = 'app';
  data: {};

  url: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer,
              private loadingService: LoadingService,
              private http: HttpClient,
              @Inject(DOCUMENT) private document: Document) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./assets/vendor/marvin/editorws.html');
  }
  ngOnInit(){
    this.loadingService.loading$.subscribe(res =>this.loading = res);
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
    this.loadingService.toggleVisible('false');
    let ctrl = this;
    ctrl.marvinSketcherInstance.exportStructure("mol").then(function(source){
      console.log(source);
      ctrl.http.post('https://predictor.ncats.io/route/predx/structurePredict', source).subscribe(res => {
        console.log(res[0]);
        ctrl.data = res[0];
        this.loadingService.toggleVisible('true');
      })
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.navIsFixed = false;
    }
  }

  scrollToTop() { (function smoothscroll() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  })();
  }
}
