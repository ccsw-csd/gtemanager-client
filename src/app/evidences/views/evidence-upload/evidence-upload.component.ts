import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { EvidenceService } from "../../services/evidence.service";

/**
 * Componente EvidenceUpload
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

    /** Constructor */
    constructor(
        private evidenceService: EvidenceService,
        public dialogRef: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private messageService: MessageService
    ) { }

    /** Init: limpiar variable deleteComments */
    ngOnInit(): void {
        this.deleteComments = false;
    }

    /** Seleccionar archivo */
    onSelect(event: { files: File[]; }) {
        this.file = event.files[0];
    }

    /** Eliminar archivo seleccionado */
    onRemove(event) {
        this.file = null;
        this.deleteComments = false;
    }

    /** Importar archivo seleccionado */
    onImport(event: { files: File[]; }) {
        if (!this.file || (this.file && (this.file.type != "application/vnd.ms-excel" && this.file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))) {
            this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Debe seleccionar un archivo.' });
            this.onRemove(event);
            return;
        }

        let formData = new FormData;
        formData.append("file", this.file);
        formData.append("deleteComments", JSON.stringify(this.deleteComments));

        this.evidenceService.upload(formData).subscribe({
            next: () => {
                console.log("OK");
                this.messageService.add({ severity: 'success', summary: 'Archivo subido correctamente.' });
                this.close();
            },
            error: error => {
                console.log("KO: " + error.message);
                this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Se ha producido un error subiendo el archivo.' });
            }
        });
    }

    /** Cancelar subida */
    onCancel(event) {
        this.close();
    }

    /** Cerrar componente */
    close() {
        this.dialogRef.close();
    }
}
