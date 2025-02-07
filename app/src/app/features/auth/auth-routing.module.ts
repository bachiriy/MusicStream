import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthResolver } from '../../core/resolvers/auth.resolver';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      auth: AuthResolver
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    resolve: {
      auth: AuthResolver
    }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
