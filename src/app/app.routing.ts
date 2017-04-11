import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewDeckComponent } from './new-deck/new-deck.component';
import { DeckManagerComponent } from './deck-manager/deck-manager.component';
import { StudyComponent } from './study/study.component';
import { LoginPageComponent } from './login-page/login-page.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new-deck',
    component: NewDeckComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'decks/:id',
    component: DeckManagerComponent
  },
  {
    path: 'study/:filter',
    component: StudyComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
