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
  link: any;
  displayedColumns = ['name', 'smiles', 'id', 'result', 'group', 'domain'];
  dataSource = new MatTableDataSource<Data>([]);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('datalist', { static: true }) datalist: ElementRef;

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
    this.link = document.createElement('a');
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
    this.link.download = 'drugGenerator.txt';
    this.downloadFile();
  }

  downloadCSV(): void {
    console.log(this.dataSource.data);
    const s = this.dataSource.data[0].similarity;
    const simKeys = [...Object.keys(s).map(key => 'similarity.' + key)].join('\t');
    const dataKeys = [...Object.keys(this.dataSource.data[0])].join('\t').replace('similarity', simKeys);
    console.log(simKeys);
    console.log(dataKeys);
    const lines = [];
    this.dataSource.data.forEach(data => lines.push(data.toCSV()));
    const csv = dataKeys + '\n' + lines.join('\n');
    this.file = new Blob([csv], { type: 'text/csv'});
    this.link.download = 'drugGenerator.tsv';
    this.downloadFile();
  }

  downloadFile(): void {
   // let url = window.URL.createObjectURL(this.file);
    this.link.href = window.URL.createObjectURL(this.file);
    this.link.click();
    // window.open(url);
  }
}
