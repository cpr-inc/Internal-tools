import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.scss']
})
export class EditmodalComponent implements OnInit {

  editdata = [
    {label: 'タスク', beforedata: this.data.title},
    {label: '重要度', beforedata: this.data.priorty},
    {label: '作業状況', beforedata: this.data.state}
  ];

  priorities = [
    {value: '高', viewValue: '高'},
    {value: '中', viewValue: '中'},
    {value: '低', viewValue: '低'}
  ];

  states = [
    {value: '開始', viewValue: '開始'},
    {value: '作業中', viewValue: '作業中'},
    {value: '終了', viewValue: '終了'}
  ];

  constructor(
    public dialogRef: MatDialogRef<EditmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  AddTask(){
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}
