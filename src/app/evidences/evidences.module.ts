import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { EvidenceListComponent } from './views/evidence-list/evidence-list.component';



@NgModule({
  declarations: [
    EvidenceListComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class EvidencesModule { }
