import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './views/user-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ToastModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
  ]
})
export class UserModule { }