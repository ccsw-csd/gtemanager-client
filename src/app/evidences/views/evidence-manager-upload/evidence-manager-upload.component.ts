import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SnackbarService } from "src/app/core/services/snackbar.service";
import { EvidenceManagerService } from "../../services/evidence-manager.service";

@Component({
  selector: 'app-evidence-manager-upload',
  templateUrl: './evidence-manager-upload.component.html',
  styleUrls: ['./evidence-manager-upload.component.scss']
})
export class EvidenceManagerUploadComponent implements OnInit {

  file: File;
  isLoading: boolean;

  /**
   * Constructor: inicializa servicios necesarios para comunicación y manejo de datos en pantalla.
   * 
   * @param evidenceManagerService Servicio EvidenceManagerService para envío de datos a backend
   * @param dialogRef DynamicDialogRef, referencia al diálogo de la ventana Upload
   * @param config DynamicDialogCongig, configuración del diálogo de la ventana Upload
   * @param snackbarService Servicio SnackbarService para muestra de notificaciones o avisos en pantalla
   */
  constructor(
      private evidenceManagerService: EvidenceManagerService,
      public dialogRef: DynamicDialogRef,
      public config: DynamicDialogConfig,
      private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
      this.isLoading = false;
  }

  onSelect(event: { currentFiles: File[]; }) {
      this.file = event.currentFiles[0];
  }

  onRemove() {
      this.file = null;
  }

  onImport() {
      let formData = new FormData;
      formData.append("file", this.file);
      this.isLoading = true;
      this.evidenceManagerService.uploadEvidenceManager(formData).subscribe({
          next: result => {
              if (result)
                  this.snackbarService.showMessage("Archivo subido correctamente. " + result);
              else
                  this.snackbarService.showMessage("Archivo subido correctamente.");
              this.isLoading = false;
              this.close(true);
          },
          error: error => {
              this.snackbarService.error(error);
              this.isLoading = false;
          }
      });
  }

  onCancel() {
      this.close(false);
  }

  close(isUpload: boolean) {
      this.dialogRef.close(isUpload);
  }

}
