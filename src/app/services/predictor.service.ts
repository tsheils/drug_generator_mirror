import { Injectable } from '@angular/core';
import {Data} from "../models/data";
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {LoadingService} from "./loading.service";

@Injectable()
export class PredictorService {
  private _dataSource = new Subject<any>();
  private _errorSource = new Subject<any>();
  //  Observable navItem stream
  data$ = this._dataSource.asObservable();
  error$ = this._errorSource.asObservable();
  constructor(private http: HttpClient) { }

  getPredictions(mol: string, name: string): void {
    console.log(name);
    this.http.post<any>('https://predictor.ncats.io/route/predx/structurePredict', mol).subscribe(res => {
      console.log(res);
      const r = res.filter(source => source.name === name );
      console.log(r);
        const data = new Data(r[0]);
        this._dataSource.next(data);
      },
      err =>{
      console.log(err);
        this._errorSource.next(err);
      })
  }
}
