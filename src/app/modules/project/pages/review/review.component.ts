import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Challenge, CodeFile } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  challenge: Observable<Challenge> = new Observable<Challenge>();

  constructor(
    private route: ActivatedRoute,
    private codeFileService: CodeFileService,
    private challengeService: ChallengeService
  ) {}

  ngOnInit() {
    const challengeId = this.route.snapshot.paramMap.get('id');

    this.challenge = this.challengeService.findById(challengeId);
  }
}
