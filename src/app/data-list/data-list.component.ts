import {AfterViewInit, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Data} from '../models/data';
import {DataListService} from '../services/data-list.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit, AfterViewInit {
  data: Data[] = [];
  file: any;
  snackBarRef: any;
  displayedColumns = ['name', 'smiles', 'id', 'result', 'group', 'domain'];
  dataSource = new MatTableDataSource<Data>([]);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('datalist') datalist: ElementRef;

  constructor(
    public snackBar: MatSnackBar,
    private dataListService: DataListService
  ) { }

  ngOnInit() {
    this.dataListService.data$.subscribe(res => {
      this.data.push(res);
      this.openSnackBar(res.name + ' added!', 'See List');
      this.dataSource.data = this.data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openSnackBar(message: string, action: string): void {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 2000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.datalist.nativeElement.scrollIntoView({behavior: 'smooth'});
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  downloadJSON(): void {
    this.file = new Blob([JSON.stringify(this.dataSource.data)], { type: 'text/json'});
    this.downloadFile();
  }

  downloadCSV(): void {
  /*  const map=new Map();
    let ind=0;
    function exp(props){

      var tot=[];

      _.forIn(props, function(value,key){
        if(!map.has(key)){
          map.set(key, ind++);
        }
        var vi = map.get(key);
        tot[vi]={key:key, value:value};
      });

      var line="";
      _.forEach(tot,function (col, i){
        if(col){
          line+="\t" + col.value;
        }else{
          line+="\t";
        }
      });
      printLine(line);
    }
    var lines = [];

    function printLine(line){
      lines.push(line);
    }

    function printHeader(){
      var tot=[];
      var hline="";
      map.forEach(function (v,k){
        tot[v]=k;
      });
      _.forEach(tot,function (hName, i){
        hline+="\t" + hName;
      });
      console.log(lines);
//printLine(line);
      var lineOut= hline + "\n" + lines.join("\n");
      //$("#export").val(lineOut);
      var b = new Blob([lineOut], {type: "text/plain"});
      var url=URL.createObjectURL(b);
      $("#download").attr("href", url);


      this.file = new Blob([str], { type: 'text/csv' });
    this.downloadFile();*/
  }

  downloadFile(): void {
    const reader = new FileReader();
    reader.addEventListener('loadend', function() {
      // reader.result contains the contents of blob as a typed array
    });
    console.log(this.file);
   // let url = window.URL.createObjectURL(this.file);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(this.file);
    link.download = 'drugGenerator.txt';
    link.click();
    // window.open(url);
  }
}
