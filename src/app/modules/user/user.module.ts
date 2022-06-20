import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UprofileComponent } from './components/uprofile/uprofile.component';
import { TrackComponent } from './components/track/track.component';
import { ApplistComponent } from './components/applist/applist.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { FormComponent } from './components/form/form.component';
import { NgxPrintModule } from 'ngx-print';
import { MatModule } from 'src/app/material/mat/mat.module';


@NgModule({
  declarations: [
    UprofileComponent,
    TrackComponent,
    ApplistComponent,
    ChangePassComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule

  ],

})

export class UserModule { }
