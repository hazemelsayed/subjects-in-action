import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, of } from "rxjs";
import {IUser} from '../Shared/iuser'

@Injectable()
export class UsersService {

   // using Subject
  private subject$: Subject<IUser[]>;
  subjectObservable$: Observable<IUser[]>;

  // behavior Subject
  private behaviorSubject$;
  behaviorSubjectObservable$: Observable<IUser[]>;

  // Replay Subject
  private replaySubject$: ReplaySubject<IUser[]>;
  replaySubjectObservable$: Observable<IUser[]>;

  // Async Subject
  private asyncSubject$: AsyncSubject<IUser[]>;
  asyncSubjectObservable$: Observable<IUser[]>;

  users = [];
  intervalIds = [];

  constructor() {
    // Subject intiation
    this.subject$ = new Subject();
    this.subjectObservable$ = this.subject$.asObservable();
    
    this.behaviorSubject$ = new BehaviorSubject(this.users);
    this.behaviorSubjectObservable$ = this.behaviorSubject$.asObservable();

    this.replaySubject$ = new ReplaySubject();
    this.replaySubjectObservable$ = this.replaySubject$.asObservable();

    this.asyncSubject$ = new AsyncSubject();
    this.asyncSubjectObservable$ = this.asyncSubject$.asObservable();



    // simulate array getting new data from a data source
    let intervalId = setInterval(() => {
      let len = this.users.length + 1;
      this.users.push({
        id: len,
        name: 'User  ' + len ,
        address: 'address ' + len
      });
      let clone: IUser[] = JSON.parse(JSON.stringify(this.users));
      this.subject$.next(clone);
      this.behaviorSubject$.next(clone);
      this.replaySubject$.next(clone);
      this.asyncSubject$.next(clone);

      if (this.users.length > 5) {
        this.asyncSubject$.complete();
      }
    }, 3000);

    this.intervalIds.push(intervalId);
   }

  getUsers() : Observable<IUser[]> {
    const currentUsers = this.users;
    return of(currentUsers);
  }

}