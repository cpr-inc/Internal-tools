import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/service/user.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  confirm_password:string = '';
  name:string = '';
  titleAlert:string = '未入力';
  message: boolean = true;

  password:string=''

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) { 
    this.rForm = fb.group({
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'confirm_password' : [null, Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }

  ngOnInit() {
  }

  reset(entry): void {
    console.log(entry.password)
    this.userService.reset(entry.password);
  }

}
