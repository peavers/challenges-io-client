import { Component, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-picture',
  templateUrl: './user-picture.component.html',
  styleUrls: ['./user-picture.component.scss']
})
export class UserPictureComponent {
  @Input()
  name?: string;

  @Input()
  pictureUrl?: any;

  @Input()
  large: boolean;

  constructor(private authService: AuthService) {
    if (this.name === undefined) {
      this.name = authService.getUser().displayName;
    }

    if (this.pictureUrl == undefined) {
      this.pictureUrl = authService.getUser().photoURL;
    }
  }
}
