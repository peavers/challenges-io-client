import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ChallengeService } from '../../../../core/services/challenge.service';

import { Challenge } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewResolver implements Resolve<Challenge> {
  constructor(private challengeService: ChallengeService, private codeFileService: CodeFileService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const challengeId = route.paramMap.get('id');

    const observables = [];

    observables.push(this.challengeService.findById(challengeId));
    observables.push(this.codeFileService.getTableOfContent(challengeId));

    return forkJoin(observables).pipe(map((allResponses) => {
      return {
        challenge: allResponses[0],
        toc: allResponses[1]
      };
    }));
  }
}
