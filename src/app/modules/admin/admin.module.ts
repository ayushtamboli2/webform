import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/material/mat/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AprofileComponent } from './components/aprofile/aprofile.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AppListComponent } from './components/app-list/app-list.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { PendingComponent } from './components/pending/pending.component';
import { DeveloperComponent } from './components/developer/developer.component';


@NgModule({
  declarations: [
    AprofileComponent,
    AddUserComponent,
    AppListComponent,
    UserlistComponent,
    DepartmentsComponent,
    PendingComponent,
    DeveloperComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
