import { Component, Inject, OnInit } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { Challenge, CodeFile } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-default',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  challengeObservable: Observable<Challenge> = new Observable<Challenge>();
  codeFileObservable: Observable<CodeFile[]> = new Observable<CodeFile[]>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private challengeService: ChallengeService,
    private clipboardService: ClipboardService,
    private codeFileService: CodeFileService,
    private pageScrollService: PageScrollService,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.challengeObservable = this.challengeService.findById(params['id']);
      this.codeFileObservable = this.codeFileService.findAllByProjectId(params['id']);
    });
  }

  deleteChallenge(challenge: Challenge) {
    this.challengeService.delete(challenge);
  }

  copyToClip(url: string) {
    this.clipboardService.copyFromContent(url);

    this.snackBar.open(`Copied ${url}`, null, {
      duration: 5 * 1000
    });
  }

  countComments(codeFile: CodeFile) {
    let comments = 0;

    codeFile.codeLines.forEach(codeLine => {
      comments = comments + codeLine.comments.length;
    });

    if (comments == 0) {
      return false;
    }

    return comments;
  }

}

