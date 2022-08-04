import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EvidenceUploadComponent } from '../evidence-upload/evidence-upload.component';

/**
 * EvidenceListComponent: componente de lista de evidencias
 * @author cavire
 */
@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.scss'],
  providers: [DialogService]
})
export class EvidenceListComponent implements OnInit {

  /** Constructor: inicializar DialogService */
  constructor(
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  /** Abrir diálogo de importación de evidencias */
  importarDatos(): void {
    const dialogRef = this.dialogService.open(EvidenceUploadComponent, { header: "Importar datos de GTE", width: "50%" });
  }

}
