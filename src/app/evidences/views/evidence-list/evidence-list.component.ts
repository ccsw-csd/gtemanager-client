import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EvidenceUploadComponent } from '../evidence-upload/evidence-upload.component';

@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.scss'],
  providers: [DialogService]
})
export class EvidenceListComponent implements OnInit {

  constructor(
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  importarDatos(): void {
    const dialogRef = this.dialogService.open(EvidenceUploadComponent, {header: "Subir archivo"});
  }

}
