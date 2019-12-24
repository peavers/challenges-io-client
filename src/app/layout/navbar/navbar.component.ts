import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddApplicantDialogComponent } from '../../shared/component/add-applicant-dialog/add-applicant-dialog.component';
import { ChallengeService } from '../../core/services/challenge.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  badgeVisible: boolean = false;

  badgeValue: number = 0;

  constructor(
    public router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private challengeService: ChallengeService
  ) {}

  async ngOnInit() {
    this.challengeService.findAll().subscribe(results => {
      this.badgeValue = results.length;
      this.badgeVisible = results.length >= 1;
    });
  }

  addApplicant() {
    this.dialog.open(AddApplicantDialogComponent, {
      width: '40vw',
      data: {}
    });
  }

  googleLogout() {
    this.authService.logout();
  }
}
