import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/components/landing-page.component';



export const routes: Routes = [

  {path: 'facesnaps', loadChildren: () => import('./face-snpas/face-snpas.module').then(m => m.FaceSnpasModule)},
  {path: '', component : LandingPageComponent} // route par defaut 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }