import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription, Subject, of } from 'rxjs';
import { tap, take, filter, flatMap, map, shareReplay } from 'rxjs/operators';
import { PromiseState, resolve } from 'q';

@Injectable()
export class UserService {

  private usersUrl = 'https://angular-material-api.azurewebsites.net/users';

  private users$: BehaviorSubject<User[]>;
  private dataStore: { users: User[] };

  constructor(private httpClient: HttpClient) {
    this.dataStore = { users: [] };
    this.users$ = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    if (!this.dataStore.users.length) {
      this.loadUsers().subscribe();
    }
    return this.users$.asObservable();
  }

  getUserById(id: number): Observable<User> {
    if (!this.dataStore.users.length) {
      return this.loadUsers()
        .pipe(
          map(users => users.find(u => u.id === id))
        );
    } else {
      return of(this.dataStore.users.find(u => u.id === id));
    }
  }

  addUser(user: User): Promise<User> {
    return new Promise((resolver, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this.users$.next(Object.assign({}, this.dataStore).users);
      resolver(user);
    });
  }

  private loadUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl)
      .pipe(
        shareReplay(),
        tap(users => {
          this.dataStore.users = users;
          this.users$.next(Object.assign({}, this.dataStore).users);
        })
      );
  }
}
