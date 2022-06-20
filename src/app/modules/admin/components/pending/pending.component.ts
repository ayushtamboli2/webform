import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ViewComponent } from 'src/app/modules/wim/components/view/view.component';
import { environment } from 'src/environments/environment';
import { AddUserComponent } from '../add-user/add-user.component';
import { EventEmitterService } from 'src/app/services/event-emitter.service'; 

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['sn', 'dept_name', 'date', 'form', 'letter', 'attachment', 'remark', 'reject', 'upload'];

  constructor(private admin: AdminService, public dialog: MatDialog, private eventEmitterService: EventEmitterService) { }

  dataSource: any = [];
  dept_name: any = [];
  abc: any;
  res: any = [];
  status: any = ['4'];

  ngOnInit(): void {
    this.getPendingList();

    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokePendingComponentFunction.subscribe((name:string) => {    
        this.getPendingList();    
      });    
    }    
  }

  //Filter for table data
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPendingList() {
    //instance load data
    this.admin.getFunction('admin/pending').subscribe((res: any) => {
      // console.log(res);
      if (res.length>=0) { 
        this.dataSource = new MatTableDataSource(res.reverse());   // For Revers order in table use .reverse()
      }
    });
  };

  //open View
  openDialog(form_id: any) {
    // console.log(form_id, 'Id Selected')
    this.admin.getFunction('users/selectForm/' + form_id).subscribe((res: any) => {
      // console.log(res)

      const dialogRef = this.dialog.open(ViewComponent, { data: res[0] });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    })
  }

  // reject(form_id: any) {
  //   // this.remark(form_id);
  //   this.admin.updateFunction('admin/reject/' + form_id, this.status.value).subscribe((res: any) => {
  //     // console.log(res)
  //     if (res['affectedRows']) {
  //       this.getPendingList();
  //       Swal.fire({ icon: 'success', text: "Rejected.", timer: 2000 });
  //     }
  //   })
  // }

  uploaded(form_id: any) {
    this.admin.updateFunction('admin/upload/' + form_id, this.status.value).subscribe((res: any) => {
      // console.log(res)
      if (res['affectedRows']) {
        this.getPendingList();
        Swal.fire({ icon: 'success', text: "Approved.", timer: 1000 });
      }
    })
  }

  //Download Letter Pdf
  letter_pdf(letter_pdf: any) {
    // console.log("I am letter PDF");
    // console.log(letter_pdf)
    const url = (environment.rootUrl + 'letter/' + letter_pdf);
    window.open(url);
    // console.log(url);
  }

  //Download Letter Pdf
  soft_pdf(soft_pdf: any) {
    // console.log("I am letter PDF");
    // console.log(letter_pdf)
    const url = (environment.rootUrl + 'soft/' + soft_pdf);
    window.open(url);
    // console.log(url);
  }

  //reject dialog box
  openReject(form_id:any) {
    this.admin.getFunction('users/selectForm/' + form_id).subscribe((res: any) => {
      // console.log(res)

      const dialogRef = this.dialog.open(AddUserComponent, { data: res[0] });

      dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
      });
    })
  }
}




