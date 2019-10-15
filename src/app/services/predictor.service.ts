import { Injectable } from '@angular/core';
import {Data} from '../models/data';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/index';
import {environment} from '../../environments/environment.prod';

const URL = environment.predictorUrl;

@Injectable()
export class PredictorService {
  private _dataSource = new Subject<any>();
  private _errorSource = new Subject<any>();
  //  Observable navItem stream
  data$ = this._dataSource.asObservable();
  error$ = this._errorSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getPredictions(mol: string, name: string): void {


    this.http.post<any>(URL, mol).subscribe(res => {
      const r = res.filter(source => source.name === name );
      if (r.length === 0) {
        this._errorSource.next('No models found');
      } else {
        const data = new Data(r[0]);
        this._dataSource.next(data);
      }
      },
      err => {
      console.log(err);
        this._errorSource.next(err);
      });
  }
}
