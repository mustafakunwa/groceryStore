import { Component, EventEmitter, Output } from '@angular/core';

import * as screenfull from 'screenfull';
import { SessionService } from '../../session/session.service';
import { AuthService } from '../../services'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output()
  toggleSidenav = new EventEmitter<void>();
  @Output()
  toggleNotificationSidenav = new EventEmitter<void>();

  isLoggedIn: boolean = false;

  constructor(
    private SessionService: SessionService,
    private AuthService: AuthService,
    private router: Router,
  ) {
    this.isLoggedIn = !!this.AuthService.getuserData()
  }

  fullScreenToggle(): void {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }


  logout() {
    this.SessionService.logout().subscribe(
      res => {
        this.AuthService.removeuserdata();
        this.router.navigateByUrl('/')
      }
    )
  }
}
