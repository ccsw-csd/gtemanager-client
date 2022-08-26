import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './views/user-list/user-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import {AutoCompleteModule} from 'primeng/autocomplete';


@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ToastModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    AutoCompleteModule

  ]
})
export class UserModule { }
