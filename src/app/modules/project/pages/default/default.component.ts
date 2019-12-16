import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { Challenge } from '../../../../core/domain/modules';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  challenges: Challenge[] = [];

  constructor(public challengeService: ChallengeService) {}

  ngOnInit() {
    this.challengeService.findAll().subscribe(challenge => {
      this.challenges = challenge;
    });
  }
}
