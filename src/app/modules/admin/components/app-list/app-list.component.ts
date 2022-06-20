import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ViewComponent } from 'src/app/modules/wim/components/view/view.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatPaginator) paginator2: MatPaginator | undefined;
  displayedColumns: string[] = ['sn', 'dept_name', 'date', 'form', 'letter', 'attachment', 'remark', 'admin_date'];
  displayedColumns2: string[] = ['sn', 'dept_name', 'date', 'form', 'letter', 'attachment', 'remark', 'admin_remark'];

  constructor(private admin: AdminService, public dialog: MatDialog) { }

  dataSource: any = [];
  dataSource2: any = [];
  dept_name: any = [];
  abc: any;
  res:any =[];
  status: any = ['4'];

  ngOnInit(): void {
    this.getUploadedList();
    this.getRejectList();
  }

  //Filter for table data
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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

  getUploadedList() {
    //instance load data
    this.admin.getFunction('admin/uploaded').subscribe((res: any) => {
      // console.log(res);
      if (res.length) {
        this.dataSource = new MatTableDataSource(res.reverse());
      }
    });
  };

  getRejectList() {
    //instance load data
    this.admin.getFunction('admin/Rejected').subscribe((res: any) => {
      // console.log(res);
      if (res.length) {
        this.dataSource2 = new MatTableDataSource(res.reverse());
      }
    });
  };

  //open View
  openDialog(form_id: any) {
    // console.log(form_id, 'Id Selected')
    this.admin.getFunction('users/selectForm/' + form_id).subscribe((res: any) => {
      // console.log(res)
      
      const dialogRef = this.dialog.open(ViewComponent,{data:res[0]});

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    })
  }
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
