import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingUpComponent } from './sing-up/sing-up.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  {
    path: 'sign-up',
    component: SingUpComponent,
  },
  { path: 'posts', component: PostComponent },
  { path: 'users', component: UserComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
