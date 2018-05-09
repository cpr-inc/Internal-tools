import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss']
})
export class UserdataComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserdataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  
  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
