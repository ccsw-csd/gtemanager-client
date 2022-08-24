import { Component, OnInit } from '@angular/core';
import { Evidence } from '../../model/Evidence';
import { DialogService } from 'primeng/dynamicdialog';
import { EvidenceUploadComponent } from '../evidence-upload/evidence-upload.component';
import { EvidenceService } from '../../services/evidence.service';

@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.scss'],
  providers: [DialogService]
})
export class EvidenceListComponent implements OnInit {

  evidenceList: Evidence[];
  isLoading: boolean = false;
  comments: boolean = false;

  /**
   * Constructor: inicializa servicio DialogService para componente EvidenceUpload.
   * 
   * @param dialogService Servicio DialogService
   */
  constructor(
    private evidenceService: EvidenceService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.findEvidence();
  }

  findEvidence() {
    this.isLoading = true;
    this.evidenceService.findEvidenceByGeography().subscribe({
      next: (res: Evidence[]) => {
        this.evidenceList = res;
        console.log(this.evidenceList);
      },
      error: () => {},
      complete: ()  => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Inicia componente EvidenceUpload tras pulsar botón de importación de datos.
   * 
   * Se ajusta título del diálogo y anchura al 50% del espacio disponible.
   */
  importarDatos(): void {
    const dialogRef = this.dialogService.open(EvidenceUploadComponent, { header: "Importar datos de GTE", width: "50%" });
  }

}
