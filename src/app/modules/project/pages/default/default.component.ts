import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { Challenge } from '../../../../core/domain/modules';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  challenges: Challenge[] = [];

  firstName: string;

  constructor(private challengeService: ChallengeService, private authService: AuthService) {}

  ngOnInit() {
    this.challengeService.findAll().subscribe(challenge => {
      this.challenges = challenge;
    });

    this.firstName = this.authService.getUser().displayName.split(' ')[0];
  }
}
