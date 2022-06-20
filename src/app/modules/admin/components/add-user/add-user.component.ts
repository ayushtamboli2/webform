import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
import { EventEmitterService } from 'src/app/services/event-emitter.service';


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private admin: AdminService, private fB: FormBuilder, private eventEmitterService: EventEmitterService) { }

  adminRemark: FormGroup = this.fB.group({
    admin_remark: ['', [Validators.required]],
  })

  ngOnInit(): void {
  }

  reject(form_id: any) {
    // console.log(form_id);
    if (this.adminRemark.valid) {
      this.admin.updateFunction('admin/remark/' + form_id, this.adminRemark.value).subscribe((res: any) => {
        this.eventEmitterService.onSendClick();
        this.adminRemark.reset();
        if (res['affectedRows']) {
          // this.getPendingList();
          Swal.fire({ icon: 'success', text: "Rejected.", timer: 1000 });
        }
      })
    } else {
      Swal.fire({ icon: 'error', text: "Tell the reason", timer: 1000 });
    }
  }

}
