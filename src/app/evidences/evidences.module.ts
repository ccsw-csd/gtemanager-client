import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    EvidenceListComponent,
    EvidenceUploadComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FileUploadModule,
    DynamicDialogModule,
    CheckboxModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ProgressSpinnerModule,
    HttpClientModule
  ]
})
export class EvidencesModule { }
