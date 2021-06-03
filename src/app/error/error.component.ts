import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  public link: string = "";
  constructor(private router : Router) { }

  ngOnInit(): void {

      this.link = this.router.url;
      console.log(this.router.url);

  }

}
