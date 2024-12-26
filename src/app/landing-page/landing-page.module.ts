import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/landing-page.component';



@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    
  ],
  exports: [
    LandingPageComponent
  ]
  
})
export class LandingPageModule { }
