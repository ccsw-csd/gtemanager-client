import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EvidenceUploadComponent } from '../evidence-upload/evidence-upload.component';

/**
 * EvidenceListComponent: componente de lista de evidencias.
 * 
 * @author cavire
 */
@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.scss'],
  providers: [DialogService]
})
export class EvidenceListComponent implements OnInit {

  /**
   * Constructor: inicializa servicio DialogService para componente EvidenceUpload.
   * 
   * @param dialogService Servicio DialogService
   */
  constructor(
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Inicia componente EvidenceUpload tras pulsar botón de importación de datos.
   * 
   * Se ajusta título del diálogo y anchura al 50% del espacio disponible.
   */
  importarDatos(): void {
    const dialogRef = this.dialogService.open(EvidenceUploadComponent, { header: "Importar datos de GTE", width: "50%", closable: false });
  }

}
