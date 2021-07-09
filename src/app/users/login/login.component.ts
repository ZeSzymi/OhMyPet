import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from '../services/users-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private usersService: UsersService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log(this.authService.isAuthorized);
    if (this.authService.isAuthorized) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }

  submit() { 
    const { email, password } = this.loginForm.value;
    this.usersService.loginUser(email, password).subscribe(response => {
      const expiry =  +(<any>response.headers.get("expiry"))
      const token =  response.headers.get("access-token")  as string
      const client =  response.headers.get("client")  as string
      const email = (<any>response.body).data.email;
      const id =  (<any>response.body).data.id;

      this.authService.loginUser(email, token, expiry, id, client);
      this.router.navigate(['app/dashboard']);
      console.log(response.headers.keys());
      console.log(this.authService.getUser());
    });
  }
}
