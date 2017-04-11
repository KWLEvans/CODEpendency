import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  currentUserName: string;
  currentUserId: string;

  constructor(public af: AngularFire) { }

  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logout() {
    this.currentUserName = null;
    return this.af.auth.logout();
  }
}
