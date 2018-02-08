import {Component, NgZone, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {LoadingService} from '../services/loading.service';
import {MolService} from '../services/mol.service';
import {ModelParserService} from '../services/model-parser.service';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {map, startWith} from "rxjs/operators";
import {PredictorService} from "../services/predictor.service";
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-sketcher',
  templateUrl: './sketcher.component.html',
  styleUrls: ['./sketcher.component.css']
})
export class SketcherComponent implements OnInit {
  marvinSketcherInstance;
  url: SafeResourceUrl;
  modelCtrl: FormControl = new FormControl();
  filteredModels: Observable<any[]>;
  models: any[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private ngZone: NgZone,
    private loadingService: LoadingService,
    private predictorService: PredictorService,
    private molService: MolService,
    private modelParserService: ModelParserService) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./assets/vendor/marvin/editorws.html');
  }

  ngOnInit() {
    this.modelParserService.getData().subscribe(res => {
      this.models = res;
      this.filteredModels = Observable.of(res);
    });
    window['MarvinJSUtil'].getEditor('#sketcher').then((marvin) => {
      this.marvinSketcherInstance = marvin;
      this.marvinSketcherInstance.on('molchange',() => {

      })
    }, function (err) {
      console.log(err);
    });
    this.filteredModels = this.modelCtrl.valueChanges
      .pipe(
        startWith(''),
        map(model => model ? this.filterModels(model) : this.models.slice())
      );
  }

  filterModels(name: string) {
    return this.models.filter(model =>
      model.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  submit(): void {
    this.loadingService.toggleVisible(true);
    this.marvinSketcherInstance.exportStructure('mol').then((mol: any) => {
      // solution and explanation from here: https://stackoverflow.com/a/48528672
      // basically, the marvin callbacks aren't run within angular, so they can't update the scope data
      this.ngZone.run(() => {
        this.predictorService.getPredictions(mol, this.modelCtrl.value);
       // this.molService.setMol(mol)
      });
    });
  }
}
