import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

    onLogInButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>)=> {
      if (res.status === 200){
        this.router.navigate(['/lists']) 
        console.log(res);}
    });
  }
}