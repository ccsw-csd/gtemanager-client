import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { EvidenceService } from "../../services/evidence.service";

@Component({
    selector: 'app-evidence-upload',
    templateUrl: './evidence-upload.component.html',
    styleUrls: ['./evidence-upload.component.scss']
})
export class EvidenceUploadComponent implements OnInit {

    file: File;
    deleteComments: boolean;

    constructor(
        private evidenceService: EvidenceService,
        public dialogRef: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.deleteComments = false;
    }

    onSelect(event: { files: File[]; }) {
        this.file = event.files[0];
    }

    onRemove(event) {
        this.file = null;
        this.deleteComments = false;
    }

    onImport(event: { files: File[]; }) {
        if (!this.file) {
            this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Debe seleccionar un archivo.' });
            return;
        }

        let formData = new FormData;
        formData.append("file", this.file);
        formData.append("deleteComments", JSON.stringify(this.deleteComments));

        this.evidenceService.upload(formData).subscribe(
            result => {
                console.log("OK");
                this.messageService.add({ severity: 'success', summary: 'Archivo subido correctamente.' });
                this.dialogRef.close();
            },
            error => {
                console.log("KO: " + error.message);
                this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Se ha producido un error subiendo el archivo.' });
            }
        );
    }

    onCancel(event) {
        this.dialogRef.close();
    }
}