import { Component, OnInit, Input, ViewChild, AfterViewInit  } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2'
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss']
})
export class UsertableComponent implements OnInit {

  @Input() users

  @ViewChild(MatSort) sort: MatSort;

  @Output() SelectUid = new EventEmitter<String>();

  @Input() ThemeColor;

  // displayedColumns = ['displayName', 'email', 'department', 'isEdit', 'isTrash'];
  displayedColumns = ['select', 'displayName', 'email', 'department'];

  dataSource: MatTableDataSource<User>

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { 
  }

  ngOnChanges(users){
    if(this.users){
      this.dataSource = new MatTableDataSource(this.users);
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string){
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  Change(index: number){
    this.SelectUid.emit(this.users[index].uid);
  }

  AddRowColor(index:number){
    if(index % 2 == 0){
      return {'background-color': '#f9f9f9'};
    }else{
      return ""
    }
  }


}

export interface User {
  uid: string;
  displayName: string;
  department: string;
  isEdit: boolean;
  isTrash: boolean;
}