import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  _dataSource:MatTableDataSource<any>;
  get data() {
    return this._dataSource;
  }
  @Input() set data(value:any) {
    this._dataSource = new MatTableDataSource(value);
  }
  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

  }

  ngAfterViewInit() {
    this._dataSource.paginator = this.paginator;
    this._dataSource.sort = this.sort;
  }

  onClickRow(row: any) {
    this.onClick.emit(row);
  }
}
