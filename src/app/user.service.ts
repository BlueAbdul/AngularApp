import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs'
import {tap, catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  idUser = ""
  tokenUser = ""
  username = ""
  connection_url = "http://localhost:8080/users/connect"
  create_user_url = "http://localhost:8080/users/post"
  edit_user_url = "http://localhost:8080/users/edit/"
  constructor(private http: HttpClient) {

  }

  login(data:any):Observable<any>{
    return this.http.post<any>(this.connection_url, data)
    .pipe(
      tap(

        (data:any) => {
        this.idUser = data.user._id
        this.tokenUser = data.token
        this.username = data.user.username
        localStorage.setItem('idUser', data.user._id)
        localStorage.setItem('tokenUser', data.token)
        localStorage.setItem('username', data.user.username)

      }
      ),
      catchError( (error:any) =>{

        let objErr = ""

        if(error.status == 401){
          objErr = 'Mauvais mot de passe';
        }
        if(error.status == 400){
          objErr = 'Mauvaises informations envoyées';
        }
        if(error.status == 404){
          objErr = 'Utilisateur non trouvé, avez vous déjà un compte ? ';
        }

        return of(objErr)
      }))



  }

  createUser(data:any):any{

      const promise = new Promise((resolve,reject) =>{
        this.http.post(`${this.create_user_url}`,data)
        .toPromise()
        .then(
          (res : any) =>{
            localStorage.setItem('idUser', res._id)
            localStorage.setItem('tokenUser', res.token)
            localStorage.setItem('username', res.user.username)
          resolve(res)
        }, err => {
        console.log(err)})
      })
      return promise

  }

  updateUser(data:any, id:any, token:any):any{
    const promise = new Promise((resolve,reject)=>{
      this.http.put(`${this.edit_user_url}${id}`,data, {headers : {Authorization : token}})
        .toPromise()
        .then(
          (res : any) =>{
          localStorage.setItem('username', data.username)
          resolve(res)
        }, err => {
        console.log(err)})
    })
    return promise
  }
}
