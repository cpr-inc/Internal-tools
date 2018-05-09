import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.scss']
})
export class DeletemodalComponent implements OnInit {

  trash: boolean = true

  constructor(
    public dialogRef: MatDialogRef<DeletemodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    // console.log('noclick');
    this.dialogRef.close();
  }

}
