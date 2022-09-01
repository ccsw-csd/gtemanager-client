import { Component, OnInit } from '@angular/core';
import { Evidence } from '../../model/Evidence';
import { DialogService } from 'primeng/dynamicdialog';
import { EvidenceUploadComponent } from '../evidence-upload/evidence-upload.component';
import { EvidenceService } from '../../services/evidence.service';
import { Properties } from 'src/app/properties/model/Properties';

@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.scss'],
  providers: [DialogService]
})
export class EvidenceListComponent implements OnInit {

  evidenceList: Evidence[];
  prueba: any[];
  properties: Properties;
  isLoading: boolean = false;
  weeks: any[];
  cols: any[];

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
    this.cols = [
      { field: "name", sort: "person.name", header: "Nombre", width: "flex-1" },
      { field: "lastName", header: "Apellidos", width: "flex-1" },
      { field: "email", header: "Email", width: "flex-1" },
      { field: "geografia", field3: "name", header: "Geografía", width: "flex-1" }
    ];

    this.weeks = [
      { field: "evidenceTypeW1", header: "Semana 1", width: "w-6rem" },
      { field: "evidenceTypeW2", header: "Semana 2", width: "w-6rem" },
      { field: "evidenceTypeW3", header: "Semana 3", width: "w-6rem" },
      { field: "evidenceTypeW4", header: "Semana 4", width: "w-6rem" },
      { field: "evidenceTypeW5", header: "Semana 5", width: "w-6rem" },
      { field: "evidenceTypeW6", header: "Semana 6", width: "w-6rem" },
    ];

    this.cols = this.cols.concat(this.weeks.slice(0, 6));
    console.log(this.cols);
    this.findEvidences();
  }

  findEvidences() {
    this.isLoading = true;
    this.evidenceService.findEvidenceByGeography().subscribe({
      next: (res: Evidence[]) => {
        this.evidenceList = res;
        this.prueba = [];
        
      },
      error: () => {},
      complete: ()  => {
        this.isLoading = false;
        this.evidenceList.forEach(e => {
          this.prueba.push({
            name: e.person.name, 
            lastName: e.person.lastName, 
            email: e.person.email,
            geografia: e.person.center.name, 
            evidenceTypeW1: (e.evidenceTypeW1 != null) ? e.evidenceTypeW1.name : "-", 
            evidenceTypeW2: (e.evidenceTypeW2 != null) ? e.evidenceTypeW2.name : "-",
            evidenceTypeW3: (e.evidenceTypeW3 != null) ? e.evidenceTypeW3.name : "-", 
            evidenceTypeW4: (e.evidenceTypeW4 != null) ? e.evidenceTypeW4.name : "-", 
            evidenceTypeW5: (e.evidenceTypeW5 != null) ? e.evidenceTypeW5.name : "-",
            evidenceTypeW6: (e.evidenceTypeW6 != null) ? e.evidenceTypeW6.name : "-",
            comment: e.comment});
        });
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
