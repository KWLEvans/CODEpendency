import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QuestionFormComponent } from './question-form/question-form.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create',
    component: QuestionFormComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
