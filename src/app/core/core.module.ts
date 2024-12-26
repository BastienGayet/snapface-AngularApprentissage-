import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpInterceptorProviders } from './interceptors';
import { HeaderComponent } from './components/header/header.component';
import fr from '@angular/common/locales/fr';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    HttpInterceptorProviders
  ]
})
export class CoreModule {
  
}