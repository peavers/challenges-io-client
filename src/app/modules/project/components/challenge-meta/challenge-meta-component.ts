import { Component, Input } from '@angular/core';
import { Challenge } from '../../../../core/domain/modules';

@Component({
  selector: 'app-challenge-meta',
  templateUrl: './challenge-meta-component.html',
  styleUrls: ['./challenge-meta-component.scss']
})
export class ChallengeMetaComponent {
  @Input()
  challenge: Challenge;

  constructor() {
  }
}
