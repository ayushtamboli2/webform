import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ViewComponent } from 'src/app/modules/wim/components/view/view.component';
import { FormService } from 'src/app/services/form.service';
import { environment } from 'src/environments/environment';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-applist',
  templateUrl: './applist.component.html',
  styleUrls: ['./applist.component.scss'],

})
export class ApplistComponent implements OnInit {

  @ViewChild(MatPaginator) paginator1: MatPaginator | undefined;
  @ViewChild(MatPaginator) paginator2: MatPaginator | undefined;
  @ViewChild(MatPaginator) paginator3: MatPaginator | undefined;
  displayedColumns: string[] = ['sn', 'dept_name', 'date', 'form', 'letter', 'attachment', 'remark', 'wim_date'];
  displayedColumns2: string[] = ['sn', 'dept_name', 'date', 'form', 'letter', 'attachment', 'remark', 'admin_remark'];
  displayedColumns3: string[] = ['sn', 'dept_name', 'date', 'form', 'letter', 'attachment', 'remark', 'admin_date'];

  deptData: any;

  constructor(private form: FormService, public dialog: MatDialog, private helper: JwtHelperService) {
    //getting token data
    this.deptData = localStorage.getItem('token');
    if (!this.helper.isTokenExpired(this.deptData)) {
      this.deptData = this.helper.decodeToken(this.deptData)
    }
  }

  dataSource1: any = [];
  dataSource2: any = [];
  dataSource3: any = [];
  dept_name: any = [];

  ngOnInit(): void {
    this.getRejectedList();
    this.getApprovedList();
    this.getUploadedList();
  }

  //Filter for table data
  applyFilter1(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  //Filter for table data
  applyFilter2(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  //Filter for table data
  applyFilter3(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();

    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }

  //get form list by perticular user logged in
  getRejectedList(): void {
    const dept_name = this.deptData.deptName;
    // console.log(this.deptData.deptName);
    //instance load data
    this.form.getFunction('form/rejectedList/' + dept_name).subscribe((res: any) => {
      // console.log(res);
      if (res.length) {
        this.dataSource1 = new MatTableDataSource(res.reverse());
      }
    });
  }

  //get form list by perticular user logged in
  getApprovedList(): void {
    const dept_name = this.deptData.deptName;
    // console.log(this.deptData.deptName);
    //instance load data
    this.form.getFunction('form/approvedList/' + dept_name).subscribe((res: any) => {
      // console.log(res);
      if (res.length) {
        this.dataSource2 = new MatTableDataSource(res.reverse());
      }
    });
  }

  //get form list by perticular user logged in
  getUploadedList(): void {
    const dept_name = this.deptData.deptName;
    // console.log(this.deptData.deptName);
    //instance load data
    this.form.getFunction('form/uploadedList/' + dept_name).subscribe((res: any) => {
      // console.log(res);
      if (res.length) {
        this.dataSource3 = new MatTableDataSource(res.reverse());
      }
    });
  }

  //open View
  openDialog(form_id: any) {
    // console.log(form_id, 'Id Selected')
    this.form.getFunction('users/selectForm/' + form_id).subscribe((res: any) => {
      console.log(res)

      const dialogRef = this.dialog.open(ViewComponent, { data: res[0] });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
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

}