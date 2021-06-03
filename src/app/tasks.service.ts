import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks = []
  tasksUrl = "http://localhost:8080/tasks"
  constructor(private http: HttpClient) { }

  seekTasks(data: any, token :any):any{
    const promise = new Promise((resolve,reject) =>{
      this.http.get(`${this.tasksUrl}/user/${data}`, {headers: {Authorization : token}})
      .toPromise()
      .then(
        (res : any) =>{
        resolve(res)
      }, err => {
      console.log(err)})
    })
    return promise
  }
  createTasks(data: any, token :any):any{
    const promise = new Promise((resolve,reject) =>{
      this.http.post(`${this.tasksUrl}/post`,data, {headers: {Authorization : token}})
      .toPromise()
      .then(
        (res : any) =>{
        resolve(res)
      }, err => {
      console.log(err)})
    })
    return promise
  }
  deleteTask(id:any, token:any):any{
    const promise = new Promise((resolve,reject) =>{
      this.http.delete(`${this.tasksUrl}/delete/${id}`, {headers: {Authorization : token}})
      .toPromise()
      .then(
        (res : any) =>{
        resolve(res)
      }, err => {
      console.log(err)})
    })
    return promise
  }

  updateTask(data:any,id:any,token:any):any{
    const promise = new Promise((resolve, reject) =>{
      console.log(id);
      this.http.put(`${this.tasksUrl}/edit/${id}`,data, {headers: {Authorization : token}})
      .toPromise()
      .then(
        (res : any) =>{
        resolve(res)
      }, err => {
      console.log(err)})
    })
    return promise
  }
}
