import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { WimService } from 'src/app/services/wim.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['sn', 'dept_name', 'date', 'form', 'letter', 'attachment', 'remark', 'approve', 'reject'];


  constructor(private wim: WimService, public dialog: MatDialog, private fB: FormBuilder) { }

  webRemark: FormGroup = this.fB.group({
    remark: ['', [Validators.required]]
  })

  dataSource: any = [];
  dept_name: any = [];
  abc: any;
  res: any = [];
  status: any = ['2'];


  ngOnInit(): void {
    // this.getPendingForms();
    this.getFormList();
  }

  remark(form_id: any) {
    // console.log(this.webRemark.value)
    this.wim.updateFunction('users/remark/' + form_id, this.webRemark.value).subscribe((res: any) => {
      this.webRemark.reset();
    })
  }

  //Filter for table data
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFormList() {
    //instance load data
    this.wim.getFunction('users/pending').subscribe((res: any) => {
      if (res.length>=0) {
        this.dataSource = new MatTableDataSource(res.reverse());
      }
    });
  };

  //open View
  openDialog(form_id: any) {
    // console.log(form_id, 'Id Selected')
    this.wim.getFunction('users/selectForm/' + form_id).subscribe((res: any) => {
      // console.log(res)

      const dialogRef = this.dialog.open(ViewComponent, { data: res[0] });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    })
  }

  approve(form_id: any) {
    
    if (this.webRemark.valid) {
      this.remark(form_id);
      this.wim.updateFunction('users/approve/' + form_id, this.status.value).subscribe((res: any) => {
        // console.log(res)
        
        if (res['affectedRows']) {
          this.getFormList();
          Swal.fire({ icon: 'success', text: "Approved.", timer: 1000 });
        }
      })
    } else {
      Swal.fire({ icon: 'error', text: "Enter remark.", timer: 1000 });
    }
  }

  reject(form_id: any) {
    
    if (this.webRemark.valid) {
    this.remark(form_id);
    this.wim.updateFunction('users/reject/' + form_id, this.status.value).subscribe((res: any) => {
      // console.log(res)
      
      if (res['affectedRows']) {
        this.getFormList();
        Swal.fire({ icon: 'success', text: "Rejected.", timer: 2000 });
      }
    })
  }else{
    Swal.fire({ icon: 'error', text: "Enter remark.", timer: 2000 });
  }
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


}


