import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddApplicantDialogComponent } from '../../shared/component/dialogs/add-applicant-dialog/add-applicant-dialog.component';
import { ChallengeService } from '../../core/services/challenge.service';
import { DIALOG_WIDTH } from '../../core/constants';
import { FirestoreUser } from '../../core/domain/modules';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  badgeVisible: boolean = false;

  badgeValue: number = 0;

  user: FirestoreUser;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private challengeService: ChallengeService
  ) {}

  async ngOnInit() {
    this.user = this.authService.getUser();

    this.challengeService.findAll().subscribe(results => {
      this.badgeValue = results.length;
      this.badgeVisible = results.length >= 1;
    });
  }

  addApplicant() {
    this.dialog.open(AddApplicantDialogComponent, {
      width: DIALOG_WIDTH,
      data: {}
    });
  }

  googleLogout() {
    this.authService.logout();
  }
}
