import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from '../model/User';
import { UserPage } from '../model/UserPage';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-access-management-list',
  templateUrl: './access-management-list.component.html',
  styleUrls: ['./access-management-list.component.scss']
})
export class AccessManagementListComponent implements OnInit {


  pageable: Pageable = {
    pageNumber: 0,
    pageSize: 5,
    sort: [{
      property: 'username',
      direction: 'asc'
    }]
  }

  userPage: UserPage;
  listOfData : User[];
  totalElements: number;
  isloading: boolean = false;
  filterUsername: string;
  filterName: string;
  lastTableLazyLoadEvent: LazyLoadEvent;

  constructor(
    private cdRef : ChangeDetectorRef,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  onCleanFilter(): void {
    this.filterUsername = null;
    this.filterName = null;
    this.loadPage(this.lastTableLazyLoadEvent);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  loadPage(event?:LazyLoadEvent) {

    if (event != null) {
      this.lastTableLazyLoadEvent = event;
      this.pageable.pageSize = event.rows;
      this.pageable.pageNumber = event.first / event.rows;

      if (event.sortField != null){
        this.pageable.sort = [{property:event.sortField, direction:event.sortOrder == 1 ? 'asc':'desc'}];
      }

      this.isloading = true;
      this.userService.findPage(this.pageable, this.filterUsername, this.filterName).subscribe({
        next: (res: UserPage) => {
          this.userPage = res;
        },
        error: () => {},
        complete: () => {
          this.listOfData = this.userPage.content;
          this.totalElements = this.userPage.totalElements;
          this.isloading = false;
        }
      });
    }
  }
}
