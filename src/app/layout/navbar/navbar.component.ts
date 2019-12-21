import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Feedback } from '../../core/domain/modules';
import { AddApplicantDialogComponent } from '../../shared/component/add-applicant-dialog/add-applicant-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router, private authService: AuthService, private dialog: MatDialog) {
  }

  async ngOnInit() {
  }

  addApplicant() {
    const dialogRef = this.dialog.open(AddApplicantDialogComponent, {
      width: '30vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe((newFeedback: Feedback) => {
      if (newFeedback) {

      }
    });
  }

  getUser() {
    return this.authService.getUser();
  }

  googleLogout() {
    this.authService.logout();
  }
}
