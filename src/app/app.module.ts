import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing-module';
import {LoginComponent} from './components/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UsersTaskComponent} from './components/users-task/users-task.component';
import {UsersProjectsComponent} from './components/users-projects/users-projects.component';
import {WelcomePageComponent} from './components/welcome-page/welcome-page.component';
import {ListComponent} from './components/shared/list/list.component';
import {TaskViewComponent} from './components/task-view/task-view.component';
import {CreateTaskDialogComponent} from './components/create-task-dialog/create-task-dialog.component';
import {SelectComponent} from './components/shared/select/select.component';
import {CommentTabViewComponent} from './components/comment-tab-view/comment-tab-view.component';
import {CommentComponent} from './components/comment/comment.component';
import {TaskActionsComponent} from './components/task-actions/task-actions.component';
import {CommonModule} from '@angular/common';
import {WorkLogDialogComponent} from './components/work-log-dialog/work-log-dialog.component';
import {WorkLogTabViewComponent} from './components/work-log-tab-view/work-log-tab-view.component';
import {WorkLogComponent} from './components/work-log/work-log.component';
import {SubTaskViewComponent} from './components/sub-task-view/sub-task-view.component';
import {ConvertToSubTaskDialogComponent} from './components/convert-to-sub-task-dialog/convert-to-sub-task-dialog.component';
import {TextMaskModule} from 'angular2-text-mask';
import {ChooseUserDialogComponent} from './components/choose-user-dialog/choose-user-dialog.component';
import { UserListDialogComponent } from './components/user-list-dialog/user-list-dialog.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopMenuComponent,
    SideMenuComponent,
    DashboardComponent,
    UsersTaskComponent,
    UsersProjectsComponent,
    WelcomePageComponent,
    ListComponent,
    TaskViewComponent,
    CreateTaskDialogComponent,
    SelectComponent,
    CommentTabViewComponent,
    CommentComponent,
    TaskActionsComponent,
    WorkLogDialogComponent,
    WorkLogTabViewComponent,
    WorkLogComponent,
    SubTaskViewComponent,
    ConvertToSubTaskDialogComponent,
    ChooseUserDialogComponent,
    UserListDialogComponent,
    ProjectViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule, CommonModule, TextMaskModule
  ],
  entryComponents: [CreateTaskDialogComponent, WorkLogDialogComponent, ConvertToSubTaskDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
