import { Component, OnInit } from '@angular/core';
import { Evidence } from '../../model/Evidence';
import { DialogService } from 'primeng/dynamicdialog';
import { EvidenceEmailComponent } from '../evidence-email/evidence-email.component';
import { EvidenceUploadComponent } from '../evidence-upload/evidence-upload.component';
import { EvidenceService } from '../../services/evidence.service';
import { CenterService } from '../../services/center.service';
import { Properties } from '../../model/Properties';
import { Comment } from '../../model/Comment';
import { CommentComponent } from '../comment/comment.component'; 
import { Center } from '../../model/Center';
import { PropertiesService } from '../../services/properties.service';
import { AuthService } from 'src/app/core/services/auth.service';

/**
 * EvidenceListComponent: componente de lista de evidencias.
 */
@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.scss'],
  providers: [DialogService]
})
export class EvidenceListComponent implements OnInit {

  evidenceList: Evidence[];
  data: any[];
  weeks: any[];
  cols: any[];
  isLoading: boolean = false;

  filterCenter: Center;
  localizaciones: Center[];
  
  properties: Properties[];
  loadWeeks: number;
  loadDate: Date;
  loadUser: String;

  /**
   * Constructor: inicializa servicio DialogService para componente EvidenceUpload.
   * 
   * @param dialogService Servicio DialogService
   */
  constructor(
    private evidenceService: EvidenceService,
    private centerService: CenterService,
    private propertiesService: PropertiesService,
    public dialogService: DialogService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.cols = [
      { field: "name", header: "Nombre", width: "w-14rem flex-none"},
      { field: "lastName", header: "Apellidos", width: "w-20rem flex-none"},
      { field: "email", header: "Email", width: "flex-1"},
      { field: "geografia", field3: "name", header: "Geografía", width: "w-10rem flex-none"}
    ];
    
    this.weeks = [
      { field: "evidenceTypeW1", header: "Semana 1", width: "w-8rem flex-none"},
      { field: "evidenceTypeW2", header: "Semana 2", width: "w-8rem flex-none"},
      { field: "evidenceTypeW3", header: "Semana 3", width: "w-8rem flex-none"},
      { field: "evidenceTypeW4", header: "Semana 4", width: "w-8rem flex-none"},
      { field: "evidenceTypeW5", header: "Semana 5", width: "w-8rem flex-none"},
      { field: "evidenceTypeW6", header: "Semana 6", width: "w-8rem flex-none"},
    ];
    
    this.getProperties();

    this.filterCenter = null;
    this.getCenters();
  }
  
  getCenters() {
    this.centerService.findAll().subscribe( res => {
      this.localizaciones = res
      setTimeout(() => {this.getUserCenter();}, 1);
    });
  }
    
  getUserCenter() {
    let userCenter : String;

    userCenter = this.authService.getUserInfo().officeName;

    if (userCenter.includes("VLC")) {
      this.localizaciones.forEach(e => {
        if (e.name == "Valencia")
          this.filterCenter = e;
      });
    }
    
    this.onSearch();
  }

  onSearch(): void {
    let centerId = this.filterCenter != null ? this.filterCenter.id : null;
    this.isLoading = true;
    this.evidenceService.getEvidences(centerId).subscribe({
      next: (res: Evidence[]) => {
        this.evidenceList = res;
        this.data = [];
      },
      error: () => {},
      complete: ()  => {
        this.isLoading = false;
        this.evidenceList.forEach(e => {
          this.data.push({
            personId: e.person.id,
            name: e.person.name, 
            lastName: e.person.lastName, 
            email: e.person.email,
            geografia: e.person.center.name, 
            evidenceTypeW1: (e.evidenceTypeW1 != null) ? e.evidenceTypeW1.name : "", 
            evidenceTypeW2: (e.evidenceTypeW2 != null) ? e.evidenceTypeW2.name : "",
            evidenceTypeW3: (e.evidenceTypeW3 != null) ? e.evidenceTypeW3.name : "", 
            evidenceTypeW4: (e.evidenceTypeW4 != null) ? e.evidenceTypeW4.name : "", 
            evidenceTypeW5: (e.evidenceTypeW5 != null) ? e.evidenceTypeW5.name : "",
            evidenceTypeW6: (e.evidenceTypeW6 != null) ? e.evidenceTypeW6.name : "",
            comment: e.comment});
        });
      }
    });
  }

  getProperties() {
    this.propertiesService.findAll().subscribe({
      next: (res: Properties[]) => {
        this.properties = res;
      },
      error: () => {},
      complete: () => {
        this.properties.forEach(res => {
          if (res.key == "LOAD_WEEKS") {
            this.loadWeeks = parseInt(res.value);
          }
          if (res.key == "LOAD_USERNAME") {
            this.loadUser = res.value;
          }
          if (res.key == "LOAD_DATE") {
            let auxDate = res.value.split(" ");
            let dd = parseInt(auxDate[0].split("/")[0]);
            let mm = parseInt(auxDate[0].split("/")[1]) - 1;
            let yy = parseInt(auxDate[0].split("/")[2]);
            let h = parseInt(auxDate[1].split(":")[0]);
            let m = parseInt(auxDate[1].split(":")[1]);
            this.loadDate = new Date(yy, mm, dd, h, m);
          }
        });
        this.cols = this.cols.concat(this.weeks.slice(0, this.loadWeeks));
      }
    });
  }

  showComment(personId: number, name: String, lastName: String, comment?: Comment) {
    const ref = this.dialogService.open(CommentComponent, {
      header: "Editar comentario de " + name + " " + lastName,
      height: "30%",
      width: "40%",
      data: {commentData: (comment != null) ? comment : null, id: personId},
      closable: false
    });

    ref.onClose.subscribe( res => {
      this.findAll();
    });
  }

  /**
   * Inicia componente EvidenceUpload tras pulsar botón de importación de datos.
   * 
   * Se ajusta título del diálogo y anchura al 50% del espacio disponible.
   */
  importarDatos(): void {
    const dialogRef = this.dialogService.open(EvidenceUploadComponent, { header: "Importar datos de GTE", width: "50%", closable: false });
    dialogRef.onClose.subscribe( res => {
      this.findAll();
    });
  }

  /**
   * Inicia componente EvidenceEmail tras pulsar botón de envío de recordatorios.
   * 
   * Se ajusta título del diálogo y anchura al 25% del espacio disponible.
   */
  evidenceEmails(): void {
    const dialogRef = this.dialogService.open(EvidenceEmailComponent, { header: "Notificar evidencias pendientes", width: "25%", closable: false });
  }

}
