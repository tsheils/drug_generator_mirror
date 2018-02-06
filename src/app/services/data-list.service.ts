import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Data} from "../models/data";

@Injectable()
export class DataListService {

  private _dataListSource = new Subject<Data>();
  //  Observable navItem stream
  data$ = this._dataListSource.asObservable();

  constructor() { }

  addData(data: Data) {
    this._dataListSource.next(data);
  }
}



