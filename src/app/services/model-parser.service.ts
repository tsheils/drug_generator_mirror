import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

const URL = 'assets/Models_annotations_new.txt';

@Injectable()
export class ModelParserService {

  private _dataSource = new Subject<any>();
  //  Observable navItem stream
  data$ = this._dataSource.asObservable();
  // dataMap: Map<number, any[]> = new Map();

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get(URL, {responseType: 'text'})
      .pipe(
        map(response => this.csvJSON(response.trim())),
        catchError(this.handleError('getData', []))
      );
  }

  private csvJSON(csv): any[] {
     const lines: string[] = csv.split(/\r\n|\n/);
     const result: any[] = [];

     const headers = lines.shift().split('\t');
     for (const i of lines) {
       // ["Model_ID	Name	Prediction Type	End Point	Group	Titl…proach	Applicability domain	Reference	Source	Link"]
        const currentline = i.split('\t');
        result.push({id: currentline[0], name: currentline[1].replace(/"/g, '') });
}
return result.sort();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
