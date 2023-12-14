import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './views/dashboard-main/dashboard-main.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    DashboardMainComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FileUploadModule,
    DynamicDialogModule,
    OverlayPanelModule,
    CheckboxModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    HttpClientModule,
    InputTextareaModule,
    InputTextModule,
    DropdownModule,
    ProgressSpinnerModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    AutoCompleteModule,
    ContextMenuModule,
    ClipboardModule,
    ChartModule,
  ]
})
export class DashboardModule { }
