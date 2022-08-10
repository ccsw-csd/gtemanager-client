import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { EvidenceService } from "../../services/evidence.service";

/**
 * Componente EvidenceUpload: diálogo de selección de archivo de hoja de cálculo de evidencias para su subida a la aplicación.
 * 
 * @author cavire
 */
@Component({
    selector: 'app-evidence-upload',
    templateUrl: './evidence-upload.component.html',
    styleUrls: ['./evidence-upload.component.scss']
})
export class EvidenceUploadComponent implements OnInit {

    file: File;
    deleteComments: boolean;

    /**
     * Constructor: inicializa servicios necesarios para comunicación y manejo de datos en pantalla.
     * 
     * @param evidenceService Servicio EvidenceService para envío de datos a backend
     * @param dialogRef DynamicDialogRef, referencia al diálogo de la ventana Upload
     * @param config DynamicDialogCongig, configuración del diálogo de la ventana Upload
     * @param messageService Servicio MessageService para muestra de notificaciones o avisos en pantalla
     */
    constructor(
        private evidenceService: EvidenceService,
        public dialogRef: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private messageService: MessageService
    ) { }

    /**
     * Inicializar componente: reset de deleteComments.
     */
    ngOnInit(): void {
        this.deleteComments = false;
    }

    /**
     * Asignar el archivo subido a través de fileUpload a variable local file.
     * 
     * @param event Evento recibido tras selección de archivo
     */
    onSelect(event: { files: File[]; }) {
        this.file = event.files[0];
    }

    /**
     * Eliminar archivo seleccionado de variable local, y resetear valor deleteComments.
     * 
     * @param event Evento recibido tras eliminación de archivo
     */
    onRemove(event) {
        this.file = null;
        this.deleteComments = false;
    }

    /**
     * Validar y enviar archivo seleccionado y valor de deleteComments al backend a través de EvidenceService.
     * 
     * Se valida que se haya seleccionado un archivo, y que sea de formato .xls o .xlsx.
     * Se muestra un error en pantalla en caso de recibir un archivo no válido o de producirse un fallo durante el envío.
     * 
     * @param event Evento recibido tras confirmación de subida de archivo
     */
    onImport(event: { files: File[]; }) {
        if (!this.file || (this.file && (this.file.type != "application/vnd.ms-excel" && this.file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))) {
            this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Debe seleccionar un archivo.' });
            this.onRemove(event);
            return;
        }

        let formData = new FormData;
        formData.append("file", this.file);
        formData.append("deleteComments", JSON.stringify(this.deleteComments));

        this.evidenceService.uploadEvidence(formData).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Archivo subido correctamente.' });
                this.close();
            },
            error: error => {
                this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Se ha producido un error subiendo el archivo.' });
            }
        });
    }

    /**
     * En caso de cancelar el proceso, cerrar el diálogo.
     * 
     * @param event Evento recibido tras cancelación de subida
     */
    onCancel(event) {
        this.close();
    }

    /**
     * Cerrar diálogo.
     */
    close() {
        this.dialogRef.close();
    }
}
