import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];

  user: User;
  name = new FormControl('', [Validators.required]);
  themeClass$: Observable<string>;

  getNameErrorMessage(): string {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  constructor(
    private dialog: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService,
    private themeService: ThemeService
  ) {
    this.themeClass$ = this.themeService.currentTheme$;
  }

  ngOnInit() {
    this.user = {
      id: -1,
      name: '',
      avatar: this.avatars[0]
    };
  }

  save(): void {
    this.userService.addUser(this.user).then(
      u => this.dialog.close(u)
    );
  }

  dismiss(): void {
    this.dialog.close(null);
  }
}
