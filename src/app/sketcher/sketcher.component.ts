import {Component, NgZone, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {LoadingService} from '../services/loading.service';
import {MolService} from '../services/mol.service';

@Component({
  selector: 'app-sketcher',
  templateUrl: './sketcher.component.html',
  styleUrls: ['./sketcher.component.css']
})
export class SketcherComponent implements OnInit {
  marvinSketcherInstance;
  url: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private ngZone: NgZone,
    private loadingService: LoadingService,
    private molService: MolService) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./assets/vendor/marvin/editorws.html');
  }

  ngOnInit() {
    window['MarvinJSUtil'].getEditor('#sketcher').then((marvin) => {
      this.marvinSketcherInstance = marvin;
      this.marvinSketcherInstance.on('molchange',() => {

      })
    }, function (err) {
      console.log(err);
    });
  }

  submit() {
    this.loadingService.toggleVisible(true);
    this.marvinSketcherInstance.exportStructure('mol').then((mol: any) => {
      // solution and explanation from here: https://stackoverflow.com/a/48528672
      // basically, the marvin callbacks aren't run within angular, so they can't update the scope data
      this.ngZone.run(() => {
        this.molService.setMol(mol)
      });
    });
  }
}
