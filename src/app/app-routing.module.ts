import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AdminGuardGuard } from './guard/admin-guard.guard';
import { UserGuardGuard } from './guard/user-guard.guard';
import { WimGuardGuard } from './guard/wim-guard.guard';

const routes: Routes = [
  
  {path:'header', component:HeaderComponent},
  {path:'sidenav', component:SidenavComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'user', loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule),canActivate:[UserGuardGuard]}, 
  {path:'wim', loadChildren:()=>import('./modules/wim/wim.module').then(m=>m.WimModule),canActivate:[WimGuardGuard]}, 
  {path:'admin', loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule),canActivate:[AdminGuardGuard]}, 
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'**', component:NotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
