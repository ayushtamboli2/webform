
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackComponent } from './components/track/track.component';
import { FormComponent } from './components/form/form.component';
import { UprofileComponent } from './components/uprofile/uprofile.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { ApplistComponent } from './components/applist/applist.component';

const routes: Routes = [
  {path:'form', component:FormComponent},
  {path:'track', component:TrackComponent},
  {path:'uprofile', component:UprofileComponent},
  {path:'change-pass', component:ChangePassComponent},
  {path:'applist', component:ApplistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
