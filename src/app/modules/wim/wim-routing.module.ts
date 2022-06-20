import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { PendingComponent } from './components/pending/pending.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:'changepass', component:ChangePassComponent},
  {path:'pending', component:PendingComponent},
  {path:'profile', component:ProfileComponent},
  {path:'applications', component:ApplicationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WimRoutingModule { }
