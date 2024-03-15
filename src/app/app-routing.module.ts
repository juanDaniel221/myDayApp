import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PendingComponent } from './pages/pending/pending.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { AllComponent } from './pages/all/all.component';

const routes: Routes = [
  {
    path: '',
    component: AllComponent,
  },
  {
    path: 'Pending',
    component: PendingComponent
  },
  {
    path: 'Completed',
    component: CompletedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }