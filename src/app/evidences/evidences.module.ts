import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { EvidenceListComponent } from './views/evidence-list/evidence-list.component';
import { EvidenceUploadComponent } from './views/evidence-upload/evidence-upload.component';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { CommentComponent } from './views/comment/comment.component';
import { InputTextareaModule }  from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EvidenceEmailComponent } from './views/evidence-email/evidence-email.component';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ErrorListComponent } from './views/error-list/error-list.component';
import {InputTextModule} from 'primeng/inputtext';
import {ContextMenuModule} from 'primeng/contextmenu';
import { ParseErrorComponent } from './views/error-list/parse-error/parse-error.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    EvidenceListComponent,
    EvidenceUploadComponent,
    CommentComponent,
    EvidenceEmailComponent,
    ErrorListComponent,
    ParseErrorComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FileUploadModule,
    DynamicDialogModule,
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
    ContextMenuModule
  ]
})
export class EvidencesModule { }
