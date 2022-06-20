import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { WimService } from 'src/app/services/wim.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatPaginator) paginator2: MatPaginator | undefined;
  @ViewChild(MatPaginator) paginator3: MatPaginator | undefined;
  displayedColumns1: string[] = ['sn', 'dept_name', 'date', 'form', 'letter', 'attachment', 'remark', 'wim_date'];
  displayedColumns2: string[] = ['sn', 'dept_name', 'date', 'form', 'letter', 'attachment', 'remark', 'wim_date', 'admin_date'];
  displayedColumns3: string[] = ['sn', 'dept_name', 'date', 'form', 'letter', 'attachment', 'remark', 'admin_date'];

  dataSource: any = [];
  dataSource2: any = [];
  dataSource3: any = [];
  dept_name: any = [];
  constructor(private wim: WimService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRejected();
    this.getApproved();
    this.getRejectedbyAdmin();
  }

  //Filter for table data for Rejected
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  //Filter for table data for Approved
  applyFilter2(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  };

  //Filter for table data for Approved
  applyFilter3(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  };

  openDialog(form_id: any) {
    console.log(form_id, 'Id Selected')
    this.wim.getFunction('users/selectForm/' + form_id).subscribe((res: any) => {
      // console.log(res)
      
      const dialogRef = this.dialog.open(ViewComponent,{data:res[0]});

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    })
  }

  getRejected() {
    //instance load data
    this.wim.getFunction('users/rejected').subscribe((res: any) => {
      // console.log(res);
      if (res.length) {
        this.dataSource = new MatTableDataSource(res.reverse());
      }
    });
  };

  getApproved() {
    //instance load data
    this.wim.getFunction('users/approved').subscribe((res: any) => {
      // console.log(res);
      if (res.length) {
        this.dataSource2 = new MatTableDataSource(res.reverse());
      }
    });
  };

  //get forms rejected by admin
  getRejectedbyAdmin() {
    //instance load data
    this.wim.getFunction('users/rejectedbyadmin').subscribe((res: any) => {
      // console.log(res);
      if (res.length) {
        this.dataSource3 = new MatTableDataSource(res.reverse());
      }
    });
  };


    //Download Letter Pdf
    letter_pdf(letter_pdf: any) {
      // console.log("I am letter PDF");
      // console.log(letter_pdf)
      const url = (environment.rootUrl+ 'letter/' + letter_pdf);
      window.open(url);
      // console.log(url);
    }
  
    //Download Letter Pdf
    soft_pdf(soft_pdf: any) {
      // console.log("I am letter PDF");
      // console.log(letter_pdf)
      const url = (environment.rootUrl+ 'soft/' + soft_pdf);
      window.open(url);
      // console.log(url);
    }
}
