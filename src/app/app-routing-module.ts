import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TaskViewComponent} from './components/task-view/task-view.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'issues/:id', component: TaskViewComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/login' },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
