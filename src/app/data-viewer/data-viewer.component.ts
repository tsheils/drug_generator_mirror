import {Component, OnInit } from '@angular/core';
import {LoadingService} from '../services/loading.service';
import {HttpClient} from '@angular/common/http';
import {MolService} from '../services/mol.service';
import {Data} from '../models/data';
import {DataListService} from '../services/data-list.service';
import {PredictorService} from "../services/predictor.service";

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
export class DataViewerComponent implements OnInit {
loading: boolean = false;
  data: Data;
  err: string;


  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private predictorService: PredictorService,
    private dataListService: DataListService
  ) { }

  ngOnInit() {
    this.loadingService.loading$.subscribe(res => this.loading = res);
    this.predictorService.data$.subscribe(res => {
      this.data = res;
      this.loadingService.toggleVisible(false);
    });
    this.predictorService.error$.subscribe(res => {
      console.log(res);
      this.err = res;
      this.loadingService.toggleVisible(false);
    });
   // this.molService.data$.subscribe(mol => this.getPredictions(mol));
  }



 /* getPredictions(mol: string): void {
    this.err = null;
    this.http.post('https://predictor.ncats.io/route/predx/structurePredict', mol).subscribe(res => {
      this.data = new Data(res[0]);
      this.loadingService.toggleVisible(false);
    },
      err =>{
      this.err = err.error;
        this.loadingService.toggleVisible(false);
      })
  }*/

  addToList(){
    this.dataListService.addData(this.data);
  }
}


