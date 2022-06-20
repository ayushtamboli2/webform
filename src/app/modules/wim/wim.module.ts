import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/material/mat/mat.module';
import { WimRoutingModule } from './wim-routing.module';
import { PendingComponent } from './components/pending/pending.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewComponent } from './components/view/view.component';
import { NgxPrintModule } from 'ngx-print';
import { ApplicationsComponent } from './components/applications/applications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DownloadComponent } from './components/download/download.component';



@NgModule({
  declarations: [
    PendingComponent,
    ChangePassComponent,
    ViewComponent,
    ApplicationsComponent,
    ProfileComponent,
    DownloadComponent
  ],
  imports: [
    CommonModule,
    WimRoutingModule,
    MatModule,
    NgxPrintModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WimModule { }
