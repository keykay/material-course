import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { Router } from '@angular/router';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toogleSidenav: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  openAddContactDialog(): void {
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          const snackbarRef = this.snackBar.open('New contact added.', 'Navigate', {
            duration: 5000
          });
          snackbarRef.onAction().subscribe(() => this.router.navigate(['/contactmanager', result.id]));
        }
      }
    );
  }

}
