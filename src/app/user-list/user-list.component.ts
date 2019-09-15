import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import {IUser} from '../Shared/IUser';
import {UsersService} from '../Core/users.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private users: IUser[];

  subjectObservableData = [];
  behaviorSubjectObservableData = [];
  replaySubjectObservableData = [];
  asyncSubjectObservableData = [];
 


  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(usrs => this.users = usrs);
  }

  getUsersSubject(){
    this.userService.subjectObservable$.subscribe( usersViaSubject => {
      this.subjectObservableData.push(usersViaSubject);
    })
  };

  getUsersBehaviorSubject(){
    this.userService.behaviorSubjectObservable$.subscribe( usersViaBehaviorSubject => {
      this.behaviorSubjectObservableData.push(usersViaBehaviorSubject);
    })
  };

  getUsersReplySubject(){
    this.userService.replaySubjectObservable$.subscribe( usersViaReplaySubject => {
      this.replaySubjectObservableData.push(usersViaReplaySubject);
    })
  };

  getUsersAsyncSubject(){
    this.userService.asyncSubjectObservable$.subscribe( usersViaAsyncSubject => {
      this.asyncSubjectObservableData.push(usersViaAsyncSubject);
    })
  };
}