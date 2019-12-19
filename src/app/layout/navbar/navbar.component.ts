import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router, private authService: AuthService) {
  }

  async ngOnInit() {
  }

  getUser() {
    return this.authService.getUser();
  }

  googleLogout() {
    this.authService.logout();
  }
}
