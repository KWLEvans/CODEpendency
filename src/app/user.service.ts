import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from './user.model';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.users = this.angularFire.database.list('users');
  }

  getUsers() {
    return this.users;
  }

  getUserByUserName(inputUserName: string) {
    return this.angularFire.database.list('users/', {
      query: {
        orderByChild: 'userName',
        equalTo: inputUserName
      }
    })
  }

  getUserById(inputId: string){
    return this.angularFire.database.object('users/'+inputId);
  }

  saveUser(userToSave: User){
    this.users.push(userToSave);
  }

  addQuestion(localUser){
    let userToUpdate = this.getUserById(localUser.$key);
      userToUpdate.update({
        userName: localUser.userName,
        questionsAnswered: localUser.questionsAnswered,
      });
    }
}
