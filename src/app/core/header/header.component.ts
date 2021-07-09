import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/models/user-model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router:  Router) { }

  isAuthorized: boolean = false;
  authorize$: Subscription
  user: User;

  ngOnInit() {
    this.checkAuthorization();
    this.authorize$ =  this.authService.authorizationChangedSubject
      .subscribe(() => this.checkAuthorization());
  }

  checkAuthorization() {
    this.user = this.authService.getUser();
    this.isAuthorized = this.authService.isAuthorized;
  }

  signout() {
    this.authService.logOutUser();
    this.router.navigate(['/login'])
  }

}
