import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  falseData = false
  createAccount = false
  errorMessage = ""
  connexionForm: FormGroup
  constructor(private formBuilder : FormBuilder, private userService : UserService, private router : Router) {
    this.connexionForm = this.formBuilder.group({
      username : '',
      password :''
    })
   }
  ngOnInit(): void {
  }

  async connect() {
    if(this.connexionForm.value.username == "" || this.connexionForm.value.password == "" ){
      this.falseData = true
      this.errorMessage = "Merci de renseigner votre username / mot de passe"
    } else {
      this.falseData = false
      this.errorMessage = ""
      this.userService.login(this.connexionForm.value).subscribe(data =>{
        if(!data.token){
          this.errorMessage = data
          this.falseData = true
        } else{
          this.router.navigate(['/tasks'])
        }
      })
    }
  }
  async accountMaker():Promise<any>{
    if(this.connexionForm.value.username == "" || this.connexionForm.value.password == "" ){
      this.falseData = true
      this.errorMessage = "Merci de renseigner votre username / mot de passe"
    } else {
      this.falseData = false
      this.errorMessage = ""
      this.connexionForm.value.role = "user"
      let result = await this.userService.createUser(this.connexionForm.value)
      if(result){
        this.router.navigate(['/tasks'])
      }

    }

  }
  showCreate():void{
    this.createAccount = !this.createAccount
  }

}
