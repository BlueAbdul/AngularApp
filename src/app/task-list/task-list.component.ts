import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { TasksService } from '../tasks.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasksOngoing = [

  ] as any;
  tasksPlanned = [

  ] as any;
  tasksEnded = [

  ] as any;

  loadingTasks = true;
  taskEdit = false;

  tempContent = {} as any;


  drop(
    event: CdkDragDrop<
      {
        referent: string;
        title: string;
        content: string;
        date: Date;
        status: string;
      }[]
    >
  ) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let data = event.previousContainer.data[event.previousIndex];
      console.log(data);
      data.status = event.container.element.nativeElement.id
      console.log(data);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  monForm: FormGroup
  constructor(private formBuilder : FormBuilder, private userService : UserService, private taskService : TasksService,private router : Router) {
    this.monForm = this.formBuilder.group({
      title : '',
      content :'',
      status : ''
    })
  }
  async validForm():Promise<any>{

    this.monForm.value.date = new Date();
    this.monForm.value.referent = localStorage.getItem('idUser');
    let result = await this.taskService.createTasks(this.monForm.value,localStorage.getItem('tokenUser'))
    if(result){
      this.populateTasks(localStorage.getItem('idUser'), localStorage.getItem('tokenUser'))
    }

  }
  async deleteTask(data:any):Promise<any>{
   let result = await this.taskService.deleteTask(data,localStorage.getItem('tokenUser'))
   if(result){
    this.populateTasks(localStorage.getItem('idUser'), localStorage.getItem('tokenUser'))
   }

  }
  ngOnInit(): void {
    if(localStorage.getItem('idUser')){
      this.populateTasks(localStorage.getItem('idUser'), localStorage.getItem('tokenUser'))

    } else{
      this.router.navigate(['/'])
    }
  }

  ngDoCheck():void{

  }

  async populateTasks(data:any, token:any):Promise<any>{
    this.tasksPlanned = []
    this.tasksOngoing = []
    this.tasksEnded = []
    let result = await this.taskService.seekTasks(data,token)
    if(result){
      this.renderTasks(result)
    }

  }

  renderTasks(tasks:any){
    tasks.forEach((elt:any) => {
      if(elt.status == 'planned'){ this.tasksPlanned.push(elt)}
      if(elt.status == 'ongoing'){this.tasksOngoing.push(elt)}
      if(elt.status == 'ended'){this.tasksEnded.push(elt)}
    });
    this.loadingTasks = false
  }
  editTask(data:any){
    this.taskEdit = !this.taskEdit
    this.monForm.value.title = data.title
    this.monForm.value.content = data.content
    this.monForm.value.status = data.status
    this.tempContent = data
    console.log(this.monForm.value);
  }

  async updateTask():Promise<any>{
    let result = await this.taskService.updateTask(this.monForm.value,this.tempContent._id, localStorage.getItem('tokenUser'))
    if(result){
      this.populateTasks(localStorage.getItem('idUser'), localStorage.getItem('tokenUser'))
    }
  }

}
