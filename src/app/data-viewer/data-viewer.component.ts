import {Component, OnInit } from '@angular/core';
import {LoadingService} from '../services/loading.service';
import {Data} from '../models/data';
import {DataListService} from '../services/data-list.service';
import {PredictorService} from '../services/predictor.service';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
export class DataViewerComponent implements OnInit {
loading = false;
  data: Data;
  err: string;
  pushed = false;


  constructor(
    private loadingService: LoadingService,
    private predictorService: PredictorService,
    private dataListService: DataListService
  ) { }

  ngOnInit() {
    this.predictorService.data$.subscribe(res => {
      this.err = '';
      this.pushed = false;
      this.data = res;
      this.loadingService.toggleVisible(false);
    });
    this.predictorService.error$.subscribe(res => {
      this.err = res;
      this.loadingService.toggleVisible(false);
    });
  }

  addToList() {
    this.dataListService.addData(this.data);
    this.pushed = true;
  }
}


