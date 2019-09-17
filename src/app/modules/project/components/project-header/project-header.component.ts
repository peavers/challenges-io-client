import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../../../../core/domain/modules';

@Component({
  selector: 'app-project-header-component',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent implements OnInit {
  @Input()
  challenge: Challenge;

  ngOnInit(): void {}
}
