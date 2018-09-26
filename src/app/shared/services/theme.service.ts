import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentThemeValue: Themes = Themes.DEFAULT;
  private _currentTheme$: BehaviorSubject<string>
    = new BehaviorSubject<string>(this.getThemeCssClass(this.currentThemeValue));

  get currentTheme$() {
    return this._currentTheme$.asObservable();
  }

  constructor(private overlayContainer: OverlayContainer) {
    this.overlayContainer.getContainerElement().classList.add(this.getThemeCssClass(Themes.DEFAULT));
    this.switchThemeTo(Themes.DEFAULT);
  }

  public switchThemeTo(theme: Themes): void {
    this._currentTheme$.next(this.getThemeCssClass(theme));
    this.overlayContainer.getContainerElement().classList.replace(
      this.getThemeCssClass(this.currentThemeValue), this.getThemeCssClass(theme)
    );
    this.currentThemeValue = theme;
  }

  private getThemeCssClass(theme: Themes): string {
    switch (theme) {
      case Themes.DARK:
        return 'dark-theme';
      default:
        return 'default-theme';
    }
  }

  public toggleTheme() {
    let nextTheme: Themes;
    switch (this.currentThemeValue) {
      case Themes.DARK:
        nextTheme = Themes.DEFAULT;
        break;
      case Themes.DEFAULT:
        nextTheme = Themes.DARK;
        break;
      default:
        nextTheme = Themes.DEFAULT;
        break;
    }
    this.switchThemeTo(nextTheme);
  }
}

export enum Themes {
  DEFAULT,
  DARK
}
