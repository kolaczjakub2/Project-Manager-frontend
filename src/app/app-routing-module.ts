import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TaskViewComponent} from './components/task-view/task-view.component';
import {ProjectViewComponent} from './components/project-view/project-view.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'issues/:id', component: TaskViewComponent},
  {
    path: 'project', children: [{
      path: ':id',
      component: ProjectViewComponent
    }]
  },
  // { path: 'login', component: LoginComponent },
  {path: '**', pathMatch: 'full', redirectTo: '/login'},
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
