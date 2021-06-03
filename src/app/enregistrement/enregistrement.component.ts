import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-enregistrement',
  templateUrl: './enregistrement.component.html',
  styleUrls: ['./enregistrement.component.scss']
})
export class EnregistrementComponent implements OnInit {

  monForm: FormGroup
  constructor(private formBuilder : FormBuilder) {
    this.monForm = this.formBuilder.group({
      nom : '',
      prenom :''
    })
   }

  ngOnInit(): void {
  }

}
