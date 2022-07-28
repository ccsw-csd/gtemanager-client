import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  visibleSideBar = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(response => { 

      if (response.user == null) {
        this.authService.clearCredentials();
        this.router.navigate(['login']);
        return;
      }

      this.authService.putUserInfo(response.user); 
      this.checkUserDetails();
    }); 
  }

  private checkUserDetails() : void {
    let user = this.authService.getUserInfo();

    if (user == null || user.username == null) {
      this.authService.clearCredentials();
      this.router.navigate(['main']);
    }
  }

  public toggleMenu() : void {
    this.visibleSideBar = !this.visibleSideBar;
  }

}
