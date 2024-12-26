import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    LandingPageModule,
    AuthModule,
  ],
  
  bootstrap: [ AppComponent],
})
export class AppModule { }