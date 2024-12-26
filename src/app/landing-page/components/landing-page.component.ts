import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'] 
})
export class LandingPageComponent   {

  //userEmail: string = 'me@my-house.com';

  userEmail!: string

  constructor(private router:Router){}

  
  onContinue() {
    this.router.navigateByUrl('facesnaps')
  }

  onSumbitForm(form:NgForm): void { // NgForme = type  ,    ngForm = directive
    console.log(form.value);
  }
}
