import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './views/user-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';


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
  ]
})
export class UserModule { }
