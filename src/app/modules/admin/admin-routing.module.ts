import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AppListComponent } from './components/app-list/app-list.component';
import { AprofileComponent } from './components/aprofile/aprofile.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DeveloperComponent } from './components/developer/developer.component';
import { PendingComponent } from './components/pending/pending.component';
import { UserlistComponent } from './components/userlist/userlist.component';

const routes: Routes = [
  {path:'aprofile', component:AprofileComponent},
  {path:'addUser', component:AddUserComponent},
  {path:'appList', component:AppListComponent},
  {path:'userList', component:UserlistComponent},
  {path:'departments', component:DepartmentsComponent},
  {path:'pending', component:PendingComponent},
  {path:'developer', component:DeveloperComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
