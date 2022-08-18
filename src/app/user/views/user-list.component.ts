import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from '../model/User';
import { UserPage } from '../model/UserPage';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers:[ConfirmationService]
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

  userPage: UserPage;
  listOfData : User[];
  totalElements: number;
  isloading: boolean = false;
  filterUsername: string;
  filterName: string;
  lastTableLazyLoadEvent: LazyLoadEvent;

  constructor(
    private cdRef : ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private userService: UserService,
    private messageService: MessageService
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

  deleteUser(user: User) {
    this.confirmationService.confirm({
      header: "Confirmación",
      message: 'Atención, se eliminará el acceso del usuario "'+ user.username + '". ¿Está seguro de que desea eliminar el acceso al usuario?',
      acceptLabel:"Aceptar" ,
      rejectLabel:"Cancelar",
      rejectButtonStyleClass:"p-button-secondary",
      accept: () => 
      {
        this.userService.deleteUserById(user.id).subscribe({
          next: () =>{
            this.showMessageDeleted()
            this.loadPage(this.lastTableLazyLoadEvent);
                      
          },
          error:() =>{            
            this.showMessageError();
            this.loadPage(this.lastTableLazyLoadEvent);
          },
          complete:() =>{
            this.loadPage(this.lastTableLazyLoadEvent);
          }
        })
      },
      reject: () =>{
        this.loadPage()
      }
    })
   }

  showMessageError(){
    this.messageService.add({key: 'userMessage', severity:'error', summary: 'ERROR', detail: 'No puedes borrar este usuario'});
  }
  
  showMessageDeleted(){
    this.messageService.add({key: 'userMessage', severity:'success', summary: 'Confirmado', detail: 'El usuario ha sido borrado con éxito'});
  }
}
