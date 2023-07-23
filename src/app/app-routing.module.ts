import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UserDetailsComponent} from "./user-details/user-details.component";

const routes: Routes = [
  {path: 'users' ,children:[{path:'',component: UsersComponent},
  {path: ':id' , component: UserDetailsComponent},]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
