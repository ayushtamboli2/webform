import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FormService } from 'src/app/services/form.service';
import * as CryptoJs from 'crypto-js';
import { SendmsgService } from 'src/app/services/sendmsg.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('dataContainer') dataContainer: ElementRef | undefined;

  //fro Password encryption Key
  encryptionKey = 'ayushTamboli';

  captchaText: any;

  loginForm: FormGroup = this.fB.group({
    // deptName: [''],
    username: ['', [Validators.required, Validators.minLength(3)]],
    dept_password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    textCaptcha: ['']
  })
//Password Should be
// At least 8 characters in length 
// Numbers
// Special characters

  constructor(private fB: FormBuilder, private form: FormService, private AS: AuthService, private router: Router, private SM: SendmsgService) { }

  department: any = [];

  //icon
  faLock = faLock;

  ngOnInit(): void {
    // this.getDepartment();
    this.captcha();
  }


  // captcha

  checkCaptcha() {
    var bytes = CryptoJs.AES.decrypt(this.captchaText, 'svgcaptcha_key');
    let txtCaptcha = '';
    if (bytes.toString()) {
      txtCaptcha = bytes.toString(CryptoJs.enc.Utf8);
    }
    if (this.loginForm.get('textCaptcha')!.value === txtCaptcha) {
      return true;
    } else {
      return false;
    }
  }

  captcha() {
    this.form.getCaptcha().subscribe((res: any) => {
      this.dataContainer!.nativeElement.innerHTML = res.data
      this.captchaText = res.text
      // console.log(this.captchaText)
    })
  }

  login() {
    // console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      if (this.checkCaptcha()==true) {
        var password = CryptoJs.AES.encrypt(this.loginForm.get('dept_password')?.value, this.encryptionKey).toString();
        this.loginForm.patchValue({ dept_password: `${password}` })
        this.AS.departmentlogin(this.loginForm.value).subscribe(res => {

          if (res.success) {
            this.sendData();
            let role = this.AS.currentUser.rolecode;

            switch (role) {
              case 1: {
                this.router.navigate(['/admin/pending'])
                break;
              }

              case 2: {
                this.router.navigate(['/user/form'])
                break;
              }

              case 3: {
                this.router.navigate(['/wim/pending'])
                break;
              }

              default: this.router.navigate(['/login'])
            }
          }else{
            // console.log(res)
            Swal.fire('Incorrect Username or password', '', 'error');
            this.captcha();
            this.loginForm.reset();
          }
        })
      }else{
        Swal.fire('Captcha is incorrect.', '', 'error');
        this.captcha();
      }
    }
  }

  sendData() {
    this.SM.messageEmitter.emit({
      "role": this.AS.currentUser.rolecode,
      "isLogin": this.AS.isLoggedIn(),
      "username": this.AS.currentUser.username,
      "dept_name": this.AS.currentUser.deptName,

    })
  }
 
}
