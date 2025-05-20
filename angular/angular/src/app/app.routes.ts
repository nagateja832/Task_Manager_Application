import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

// export const routes: Routes = [
//   { path: '', component: TaskListComponent },
//   { path: 'create', component: TaskFormComponent },s
//   { path: 'edit/:id', component: TaskFormComponent },
// ];

export const routes: Routes = [
  { path: 'task', component: TaskListComponent },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'create', component: TaskFormComponent },
  { path: 'edit/:id', component: TaskFormComponent },
  { path: 'login', component: LoginComponent },
];
