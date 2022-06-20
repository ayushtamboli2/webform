import { environment } from './../../../../../environments/environment.prod';
import { FormService } from 'src/app/services/form.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core'; //View Child

interface type {
  info_type: string;
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})


export class FormComponent implements OnInit {

  // showReciept:boolean= true;
  showReciept: boolean = false;

  deptData: any;

  constructor(private fB: FormBuilder, private datePipe: DatePipe, private formS: FormService, private http: HttpClient, private AS: AuthService, private helper: JwtHelperService, private router: Router) {

    //getting token data
    this.deptData = localStorage.getItem('token');
    if (!this.helper.isTokenExpired(this.deptData)) {
      this.deptData = this.helper.decodeToken(this.deptData)
    }
  }

  InfoType: type[] = [
    { info_type: 'Recruitment' },
    { info_type: 'Announcement' },
    { info_type: 'Tender' },
    { info_type: 'Notice' },
  ];

  uploadForm: FormGroup = this.fB.group({
    dept_name: ['', [Validators.required]],
    info_type: ['', [Validators.required]],
    eng_link: ['', [Validators.required]],
    hindi_link: ['', [Validators.required]],
    from_date: ['', [Validators.required]],
    to_date: ['', [Validators.required]],
    submited_by: ['', [Validators.required, Validators.minLength(4)]],
    designation: ['', [Validators.required]],
    mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    letter_pdf: [''],
    soft_pdf: [''],
    agreed: ['', [Validators.required]]
  })

  public x: any = 0;
  letter: any;
  softCopy: any;
  folder_location: any;
  temp_file: any;

  dept_name: any = [''];
  public showoPreview: boolean = false;
  name: any;
  pathData: any;

  errorMsg:string = "";
  @ViewChild('letterFile',{ static: false }) letterFile!: ElementRef;
  getLetter(event: any) {
    if (event.target.files.length > 0) {
      this.errorMsg = "";
      if(event.target.files.length>1) {
        this.errorMsg = "alert: Max 1 files are allowed."
      }
      for(let i=0; i<event.target.files.length && this.errorMsg == ""; i++) {
        if(event.target.files[i].size>=10*1024*1024) {
          this.errorMsg = "alert: one or more file(s) are greater than 10MB"
          break;
        }
        if(event.target.files[i].type != 'application/pdf') {
          this.errorMsg = this.errorMsg == ""? "alert: one or more file(s) are not in PDF format": "alert: one or more file(s) are not in PDF format and exceeds 10MB limit";
          break;
        }  
      }
      if(this.errorMsg == "") {
        this.letter = event.target.files;
      }
      console.log(this.letter)
    }     
    if(this.errorMsg != "") {
      this.letterFile.nativeElement.value = '';                 //Deselect File
      Swal.fire({ icon: 'error', text: this.errorMsg, timer: 2000 })      
    }
  }

  @ViewChild('softFile',{ static: false }) softFile!: ElementRef;
  getSoftCopy(event: any) {
    if (event.target.files.length > 0) {
      this.errorMsg = "";
      if(event.target.files.length>5) {
        this.errorMsg = "alert: Max 5 files are allowed."
      }
      for(let i=0; i<event.target.files.length && this.errorMsg == ""; i++) {
        if(event.target.files[i].size>=10*1024*1024) {
          this.errorMsg = "alert: one or more file(s) are greater than 10MB"
          break;
        }
        if(event.target.files[i].type != 'application/pdf') {
          this.errorMsg = this.errorMsg == ""? "alert: one or more file(s) are not in PDF format": "alert: one or more file(s) are not in PDF format and exceeds 10MB limit";
          break;
        }  
      }
      if(this.errorMsg == "") {
          this.softCopy = event.target.files;
      }
    } 
    if(this.errorMsg != "") {
      this.softFile.nativeElement.value = '';                    //Deselect File
      Swal.fire({ icon: 'error', text: this.errorMsg, timer: 2000 })      
    }
  }

  
  ngOnInit(): void { }

  //Submit Form
  formSubmit() {
    // console.log()
    if (this.uploadForm.valid) {
      this.uploadForm.patchValue({
        letter_pdf: this.pathData.file1,
        soft_pdf: this.pathData.file2,
        from_date: this.datePipe.transform(this.uploadForm.get("from_date")?.value, "yyyy-MM-dd"),
        to_date: this.datePipe.transform(this.uploadForm.get("to_date")?.value, "yyyy-MM-dd")
      });
      this.formS.saveDetails('form/submit', this.uploadForm.value).subscribe((res: any) => {
        if (res.affectedRows) {
          this.uploadForm.reset();
          Swal.fire({ icon: 'success', text: "Submitted Successfully.", timer: 1000 });
          this.router.navigate(['/user/track'])
        }
      });
    } else {
      Swal.fire({ icon: 'error', text: "Click I Agree", timer: 2000 })
    }
  }

  

  uploadFile() {
    const formData = new FormData();
    for(let file of this.letter) {
      formData.append('letter', file);
    }
    for(let file of this.softCopy) {
      formData.append('soft', file);
    }
    
    this.http.post<any>(environment.rootUrl +'form/file', formData).subscribe(res => {
      this.pathData = res;
      this.formSubmit()
    })
  }
}
