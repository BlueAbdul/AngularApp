import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  pseudo = "" as any
  monForm: FormGroup
  constructor(private formBuilder : FormBuilder, private userService : UserService,private router : Router) {
    this.monForm = this.formBuilder.group({
      username : ''
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem('username')){
      this.pseudo = localStorage.getItem('username')

    } else{
      this.router.navigate(['/'])
    }
  }

  async validForm():Promise<any>{

    console.log(this.monForm.value);
    console.log(localStorage.getItem('idUser'));
    let result = await this.userService.updateUser(this.monForm.value,localStorage.getItem('idUser'),localStorage.getItem('tokenUser') )
    if(result){
      this.router.navigate(['/tasks'])
    }

  }

}
