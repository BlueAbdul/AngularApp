import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {

  monNom = "" as any;
  monForm: FormGroup
  isMenuCollapsed = true;

  constructor(private formBuilder:FormBuilder, private userService : UserService,  private router : Router) {

    this.monForm = this.formBuilder.group({
      nom : '',
      prenom :''
    })

  }
  ngOnInit(): void {

  }

  ngDoCheck():void{
    if(localStorage.getItem('username')){
      this.monNom = localStorage.getItem('username')
    }
  }

  disconnect():void{
    this.monNom = ''
    localStorage.removeItem('idUser');
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('username');
    this.router.navigate(['/'])
  }

}
