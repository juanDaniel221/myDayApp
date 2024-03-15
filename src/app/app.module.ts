import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PendingComponent } from './pages/pending/pending.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { AllComponent } from './pages/all/all.component';
import { LocalStorageService } from './services/local-storage.service';
import { TaskService } from './services/TaskService';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PendingComponent,
    CompletedComponent,
    AllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [LocalStorageService, TaskService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
