import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tasks; 

  @ViewChild(MatSort) sort: MatSort;

  @Output() event = new EventEmitter<String>();
  @Output() delete = new EventEmitter<String>();

  @Input() ThemeColor;

  displayedColumns = ['No', 'title', 'priority', 'startdate', 'deadline', 'state'];
  dataSource: MatTableDataSource<Task>
  @ViewChild(MatPaginator) paginator: MatPaginator;

  view: boolean = true;

  constructor(public snackBar: MatSnackBar) { 
  }

  ngOnChanges(tasks){
    if(this.tasks){
      this.dataSource = new MatTableDataSource(this.tasks);
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

  taskcolor(priority: string){
    if(priority=="高"){
      return "bg-yellow-font-bk";
    }else if(priority=="中"){
      return "bg-MediumPurple-font-bk";
    }else if(priority=="低"){
      return "bg-powderBlue-font-bk";
    }
  }

  Edit(key:string){
    this.event.emit(key+'+edit');
  }

  Delete(key: string,index: number){
    swal({
      customClass: this.ThemeColor,
      title: '注意！',
      text: `タスク「 ${this.tasks[index].title} 」を削除しますか？`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'swal-btn--ok',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value) {
        this.event.emit(key+'+delete');
        swal({
          customClass: this.ThemeColor,
          title: '削除完了',
          text: `タスク「 ${this.tasks[index].title} 」を削除しました。`,
          type: 'success',
          confirmButtonClass: 'swal-btn--ok',
        })
      }
    })
  }

  AddRowColor(index:number){
    if(index % 2 == 0){
      return {'background-color': '#f9f9f9'};
    }else{
      return ""
    }
  }

  openSnackBar() {
    if(this.view){
      let message = 'タスクタイトルから編集✏️・削除🗑️ ができます。'
      this.snackBar.open(message , '', {
        duration: 5000,
      });
      this.view = false;
    }
  }

}

export interface Task {
  key?: string;
  No: number;
  title: string;
  description?: string;
  priority?: string;
  deadline?: string;
  startdate?: string;
  state?: string;
  creatdate: string;
  isEdit?: boolean;
  isTrash?: boolean;

}
