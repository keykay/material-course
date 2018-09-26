import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { ThemeService } from '../../../shared/services/theme.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  users$: Observable<User[]>;
  themeClass$: Observable<string>;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(zone: NgZone, private userService: UserService, private router: Router,
    private themeService: ThemeService) {
    this.themeClass$ = this.themeService.currentTheme$;
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql)
    );
  }

  ngOnInit() {
    this.users$ = this.userService.users;
    this.router.events.subscribe(
      () => {
        if (this.isScreenSmall()) {
          this.sidenav.close();
        }
      }
    );
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
