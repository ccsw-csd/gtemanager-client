import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from '../../model/User';
import { UserPage } from '../../model/UserPage';
import { UserService } from '../../services/user.service';
import { DialogService } from 'primeng/dynamicdialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  pageable: Pageable = {
    pageNumber: 0,
    pageSize: 5,
    sort: [{
      property: 'username',
      direction: 'asc'
    }]
  }

  isDelete : boolean = false
  user: User
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
    private snackbarService: SnackbarService,
    private dialogService: DialogService
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

  saveUser(){
    const ref = this.dialogService.open(UserEditComponent, {
      width: '40%',
      height: '95%',
      closable:false,
      showHeader:false,
    })
    ref.onClose.subscribe(() => {
      this.loadPage(this.lastTableLazyLoadEvent)     
    });
  }

  deleteUser() {
    this.isDelete=true
    this.userService.deleteUserById(this.user.id).subscribe({
      next: () =>{
        this.snackbarService.showMessage("El usuario se ha borrado con éxito")
      },
      error:() =>{
        this.snackbarService.error("No se puede borrar el usuario")
        this.onCloseDialog()
      },
      complete:() =>{
        this.isDelete=false
        this.onCloseDialog()
      }
    })
   }

   openDialog(element){
    this.user=element
    this.snackbarService.showConfirmDialog()
   }

   onCloseDialog(){
      this.snackbarService.onCloseDialog()
      if(!this.isDelete){
        this.loadPage(this.lastTableLazyLoadEvent)
      }
   }

}
