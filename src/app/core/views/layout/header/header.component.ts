import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : User | null = null;
  navOpen = true;
  isloading : boolean = false;
  @Output() navOpenEvent = new EventEmitter();
  items: MenuItem[];

  constructor(
    public auth: AuthService,
    public dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUserInfo();

    this.items = [
      {label: "Logout", icon: 'pi pi-sign-out',command: () => this.logout()}
    ]
  }

  toggleSideNav() {
    this.navOpen = !this.navOpen;
    this.navOpenEvent.emit(this.navOpen);
  }

  getName() : string {
    if (this.user == null) return "";

    return this.user.displayName + " (" + this.user.username + ")";
  }

  logout() {
    this.auth.logout();
  }

}
