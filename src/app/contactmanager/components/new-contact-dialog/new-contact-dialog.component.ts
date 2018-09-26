import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];

  newContactForm: FormGroup = new FormGroup({
    avatar: new FormControl(this.avatars[0], [Validators.required]),
    name: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl(''),
    bio: new FormControl('')
  });

  themeClass$: Observable<string>;

  constructor(
    private dialog: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService,
    private themeService: ThemeService
  ) {
    this.themeClass$ = this.themeService.currentTheme$;
  }

  ngOnInit() {
  }

  onSubmit() {
    const user: User = {
      id: -1,
      name: this.newContactForm.controls['name'].value,
      avatar: this.newContactForm.controls['avatar'].value,
      bio: this.newContactForm.controls['bio'].value,
      dateOfBirth: this.newContactForm.controls['dateOfBirth'].value,
      notes: []
    };

    this.userService.addUser(user).then(
      u => this.dialog.close(u)
    );
  }

  dismiss(): void {
    this.dialog.close(null);
  }
}
