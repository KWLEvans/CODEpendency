import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AngularFireModule } from 'angularfire2';
import { masterFirebaseConfig } from './api-keys';
import { AuthService } from './providers/auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { DeckManagerComponent } from './deck-manager/deck-manager.component';
import { QuestionTileComponent } from './question-tile/question-tile.component';
import { DeckIdPipe } from './deck-id.pipe';
import { NewDeckComponent } from './new-deck/new-deck.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionFormComponent,
    DeckManagerComponent,
    QuestionTileComponent,
    DeckIdPipe,
    NewDeckComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
