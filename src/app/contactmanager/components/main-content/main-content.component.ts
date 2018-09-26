import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  private selectedIndexValue = 0;

  @Output() selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() get selectedIndex() {
    return this.selectedIndexValue;
  }

  set selectedIndex(value: number) {
    this.selectedIndexValue = value;
    this.selectedIndexChange.emit(value);
  }

  private destroyer$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntil(this.destroyer$)
    ).subscribe(
      paramMap => {
        const id = paramMap.get('id');
        this.user$ = this.userService.getUserById(+id);
        this.selectedIndex = 0;
      }
    );
  }

  ngOnDestroy() {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
