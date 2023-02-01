import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }
    onSignUpButtonClicked(email: string, password: string) {
      this.authService.signup(email, password).subscribe((res: HttpResponse<any>)=> {
        if (res.status === 200){
          this.router.navigate(['/log-in'])
        }
        console.log(res);
      });
    }
}