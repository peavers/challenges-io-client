import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { Observable } from 'rxjs';
import { Challenge } from '../../../../core/domain/modules';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  challenges: Observable<Challenge[]> = new Observable<Challenge[]>();

  constructor(public challengeService: ChallengeService) {
  }

  ngOnInit() {
    this.challenges = this.challengeService.findAll();
  }
}
