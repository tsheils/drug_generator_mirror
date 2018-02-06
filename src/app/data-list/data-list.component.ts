import {AfterViewInit, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Data} from '../models/data';
import {DataListService} from '../services/data-list.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit, AfterViewInit {
  data: Data[] = [];
  file: any;
  snackBarRef: any;
  displayedColumns = ['name', 'smiles', 'id','result', 'group', 'domain'];
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
      const dataSet = Array.from(new Set(this.data));
      if (this.dataSource.data.length === dataSet.length) {
          this.openSnackBar(res.name + ' already in list!', 'See List');
      } else {
          this.openSnackBar(res.name + ' added!', 'See List');
      }
      this.dataSource.data = dataSet;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openSnackBar(message: string, action: string) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 2000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.datalist.nativeElement.scrollIntoView({behavior: 'smooth'});
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  downloadJSON(){
    this.file = new Blob([JSON.stringify(this.dataSource.data)], { type: "type: 'text/json'"});
    this.downloadFile();
  }

  downloadFile(): void {
    var reader = new FileReader();
    reader.addEventListener("loadend", function() {
      // reader.result contains the contents of blob as a typed array
    });
    console.log(reader.readAsText(this.file));
    let url = window.URL.createObjectURL(this.file);
    window.open(url);
  }
}
