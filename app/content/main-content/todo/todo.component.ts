import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeletemodalComponent } from '../../..//share/element/modal/deletemodal/deletemodal.component'
import { EditmodalComponent } from '../../../share/element/modal/editmodal/editmodal.component'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Task } from '../../../entities/task'
import { ThemecolorService } from '../../../core/service/themecolor.service'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  ThemeColor: string
  i:number = 0;
  alltaskitems:number = 0;
  title: string = "";
  priority = "";
  state = "";
  subscription: Subscription;

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

  DeleteAlertFlag=[];
  taskcolor=[];

  tasks: Task[];
  alltasks: Task[];
  tasksRef: AngularFireList<any>;
  alltasksRef: AngularFireList<any>;

  alltasksItemsRef: AngularFireObject<any>;


  bg_priority_font_bk:string;


  // displayedColumns = ['No', 'タスク名', '重要度', '作業状況', '編集', '削除'];
  // dataSource = this.tasks;


  
  constructor(
    public dialog: MatDialog,
    private db: AngularFireDatabase,
    private ThemecolorService: ThemecolorService,
  ) {
    this.tasksRef = db.list('/tasks', ref => ref.orderByChild('isTrash').equalTo(false));
    this.alltasksRef = db.list('/tasks');
    this.ThemeColor = ThemecolorService.GetColor();
    console.log(this.ThemeColor)
  }

  ngOnInit() {
    // trashtask以外
    this.tasksRef.snapshotChanges()
    .subscribe(snapshots => {
      this.tasks = snapshots.map(snapshot => {
        // console.log(this.i,this.DeleteAlertFlag[this.i]) //ngOnChanges  
        const values = snapshot.payload.val();
        return new Task({ key: snapshot.payload.key, ...values });
      });
      this.i = 0; //ngOnChanges
      for(var task of this.tasks){
        if(task.priority=="高"){
          this.taskcolor[this.i] = "bg-yellow-font-bk";
        }else if(task.priority=="中"){
          this.taskcolor[this.i] = "bg-MediumPurple-font-bk";
        }else if(task.priority=="低"){
          this.taskcolor[this.i] = "bg-powderBlue-font-bk";
        }else{
          this.taskcolor[this.i] = "";
        }
        this.i++;
      }
    });
    //全てのタスク
    this.alltasksRef.snapshotChanges()
    .subscribe(snapshots => {
      this.i = 0; //ngOnChanges
      this.alltasks = snapshots.map(snapshot => {
        this.i++; this.DeleteAlertFlag[this.i] = false; //ngOnChanges
        // console.log(this.i,this.DeleteAlertFlag[this.i]) //ngOnChanges  
        const values = snapshot.payload.val();
        return new Task({ key: snapshot.payload.key, ...values });
      });
      this.alltaskitems = this.alltasks.length
    });
    this.subscription = this.ThemecolorService.ThemeColor$.subscribe(
      ThemeClassName => {
        this.ThemeColor = ThemeClassName;
        console.log(this,' → modal color:',this.ThemeColor)
      }
    );
  }

  addproperty(){
    for(let task of this.alltasks){
      // if(!task.state){
      //   let taskRef = this.db.object(`tasks/${task.key}`);
      //   taskRef.remove()
      //   // taskRef.update({state: task.status})
      //   }
      const delet = "status"
      let taskRef = this.db.object(`tasks/${task.key}/${delet}`);
      taskRef.remove()

    }
  }

  openDialog(sentkey: string){
    if(sentkey.match(/edit/)){
      let key = sentkey.substring(0, sentkey.indexOf("+"));
      this.openEditDialog(key);
    }
    if(sentkey.match(/delete/)){
      let key = sentkey.substring(0, sentkey.indexOf("+"));
      this.tasksRef.update(key, { isTrash: true });
      // this.openDeleteDialog(key);
    }
  }

  openEditDialog(editkey: string): void {
    let result = this.tasks.filter( value =>  {
      return value.key === editkey;
    })
    console.log(result)
    let dialogRef = this.dialog.open(EditmodalComponent, {
      width: '60vw',
      height: '45vh',
      panelClass: this.ThemeColor,
      data: { title: result[0].title, priority: result[0].priority, state: result[0].state },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed',result);
      if(result){
        this.tasksRef.update(editkey, { title: result[1].title, priority: result[1].priority, state: result[1].state });
      }
      this.tasksRef.update(editkey, { isEdit: false });
    });
  }

  openDeleteDialog(deletekey: string): void {
    let dialogRef = this.dialog.open(DeletemodalComponent, {
      width: '20vw',
      height: '25vh',
      panelClass: this.ThemeColor,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed, trash :',result);
      if(result){
        this.tasksRef.update(deletekey, { isTrash: true });
      }
    });
  }

  AddTask(): void {
    this.tasksRef.push(new Task({title: this.title, state: this.state , priority: this.priority, No: this.alltaskitems+1}));
    this.title = "";
    this.state = "";
    this.priority = "";
  }

  ToggleEdit(key: string, index: number): void {
    this.tasksRef.update(key, { isEdit: true });
    // this.openEditDialog(this.tasks[index].title,this.tasks[index].priority,this.tasks[index].state,key);
  }

}
