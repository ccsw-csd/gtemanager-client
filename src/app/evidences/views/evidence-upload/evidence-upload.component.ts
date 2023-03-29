import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SnackbarService } from "src/app/core/services/snackbar.service";
import { EvidenceService } from "../../services/evidence.service";

/**
 * Componente EvidenceUpload: diálogo de selección de archivo de hoja de cálculo de evidencias para su subida a la aplicación.
 */
@Component({
    selector: 'app-evidence-upload',
    templateUrl: './evidence-upload.component.html',
    styleUrls: ['./evidence-upload.component.scss']
})
export class EvidenceUploadComponent implements OnInit {

    file: File;
    deleteComments: boolean;
    deleteColors: boolean;
    isLoading: boolean;

    /**
     * Constructor: inicializa servicios necesarios para comunicación y manejo de datos en pantalla.
     * 
     * @param evidenceService Servicio EvidenceService para envío de datos a backend
     * @param dialogRef DynamicDialogRef, referencia al diálogo de la ventana Upload
     * @param config DynamicDialogCongig, configuración del diálogo de la ventana Upload
     * @param snackbarService Servicio SnackbarService para muestra de notificaciones o avisos en pantalla
     */
    constructor(
        private evidenceService: EvidenceService,
        public dialogRef: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private snackbarService: SnackbarService
    ) { }

    /**
     * Inicializar componente: reset de deleteComments y ocultar animación de carga.
     */
    ngOnInit(): void {
        this.deleteComments = false;
        this.deleteColors = false;
        this.isLoading = false;
    }

    /**
     * Asignar el archivo subido a través de fileUpload a variable local file.
     * 
     * @param event Evento recibido tras selección de archivo
     */
    onSelect(event: { currentFiles: File[]; }) {
        this.file = event.currentFiles[0];
        this.deleteComments = false;
        this.deleteColors = false;
    }

    /**
     * Eliminar archivo seleccionado de variable local, y resetear valor deleteComments.
     */
    onRemove() {
        this.file = null;
        this.deleteComments = false;
        this.deleteColors = false;
    }

    /**
     * Enviar archivo seleccionado y valor de deleteComments al backend a través de EvidenceService.
     * 
     * Se habilita la animación de carga hasta recibir una respuesta de backend.
     * Se asume que se ha seleccionado un archivo, y que es de formato .xls o .xlsx.
     * Se muestra un error en pantalla en caso de recibir un archivo no válido o de producirse un fallo durante el envío.
     * Este método no se ejecutará si no se ha seleccionado un archivo (botón deshabilitado).
     */
    onImport() {
        let formData = new FormData;
        formData.append("file", this.file);
        formData.append("deleteComments", JSON.stringify(this.deleteComments));
        formData.append("deleteColors", JSON.stringify(this.deleteColors));
        this.isLoading = true;
        this.evidenceService.uploadEvidence(formData).subscribe({
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

    /**
     * En caso de cancelar el proceso, cerrar el diálogo.
     */
    onCancel() {
        this.close(false);
    }

    /**
     * Cerrar diálogo.
     */
    close(isUpload: boolean) {
        this.dialogRef.close(isUpload);
    }
}
