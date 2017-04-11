import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from './user.model';

@Injectable()
export class UserService {
  allUsers: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.allUsers = this.angularFire.database.list('users');
  }

  getUsers() {
    return this.allUsers;
  }

  getUserById(userID: string) {
    return this.angularFire.database.object('users/' + userID);
  }

  addQuestion(currentUser, questionId, responseValue){
    let userToUpdate = this.getUserById(currentUser.$key);
    let userQuestions = userToUpdate.questionsAnswered;
    let questionFound = false;
    let weight = 1;
    if(userQuestions){
      for(let i = 0; i < userQuestions.length; i++){
        if(userQuestions[i][0] === questionId){
          if(responseValue === false){
            userQuestions[i][1]++;
            questionFound = true;
          } else if (responseValue === true && userQuestions[i].[1] > 0) {
            userQuestions[i][1]--;
            questionFound = true;
          }
        }
      };
    }
    if(questionFound === false){
      if(responseValue === false){
        weight++;
      };
      userToUpdate.userQuestions.push([questionId, weight]);
    };
    userToUpdate.update({userQuestions: userToUpdate.userQuestions})
  }

  saveUser(userToSave: User){
    this.allUsers.push(userToSave);
  }
}
