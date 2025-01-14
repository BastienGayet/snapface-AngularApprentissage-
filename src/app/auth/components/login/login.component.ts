import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(private auth: AuthService,
              private router: Router){}

  ngOnInit(): void {
  }
  onLogin():void{
    this.auth.login();
    this.router.navigateByUrl("/facesnaps");
  }
}
