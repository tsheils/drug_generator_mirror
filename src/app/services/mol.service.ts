import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class MolService {

  private _molSource = new Subject<any>();
  //  Observable navItem stream
  data$ = this._molSource.asObservable();

  constructor() { }

  setMol(mol: string) {
    this._molSource.next(mol);
  }
}



