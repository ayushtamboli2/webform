import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { SendmsgService } from 'src/app/services/sendmsg.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  // 0=notLoggedIn 1=User 2=WIM 3=Admin
  isLogin = false;
  role = 0;
  username = '';
  dept_name = '';

  constructor(private observer: BreakpointObserver, private AS: AuthService, private SM: SendmsgService, private router: Router) { }

  ngOnInit(): void {

    if(this.AS.isLoggedIn()){
      // console.log(this.AS.currentUser)
      this.role =this.AS.currentUser.rolecode
      this.isLogin =this.AS.isLoggedIn()
      this.username =this.AS.currentUser.username
      this.dept_name=this.AS.currentUser.deptName
    }
    this.SM.messageEmitter.subscribe((msg:any)=>{
      // console.log(msg)
      this.role =msg.role
      this.isLogin =msg.isLogin
      this.username =msg.username
      this.dept_name=msg.dept_name
    })

    // console.log(this.dept_name)
  };

  //Method for side Over
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)']).pipe(delay(1)).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  logout(){
    // localStorage.removeItem('token')
    this.AS.logout();
    location.reload();
    // this.router.navigate(['/login']);
  }

  click(){
    this.router.navigate(['/login'])
  }

}
