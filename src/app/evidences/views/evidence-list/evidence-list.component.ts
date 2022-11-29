import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
import { EvidenceItemList } from '../../model/EvidenceItemList';
import { Table } from 'primeng/table';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import { MenuItem } from 'primeng/api';
import { EvidenceColorService } from '../../services/evidence-color.service';

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

  @ViewChild('el') table: Table;
  contentWindowClass: String = "content-menu-close";

  evidenceList: Evidence[];
  data: EvidenceItemList[];
  isLoading: boolean = false;
  selectedEvidenceItem: EvidenceItemList;

  localizaciones: Center[];
  
  properties: Properties[];
  loadWeeks: number;
  loadDate: Date;
  loadUser: String;
  weeks = [];

  items: MenuItem[];

  centerSelected: String;

  cols = [
    { field: "name", header: "Nombre", class: "w-9rem flex-none", filter: true},
    { field: "lastName", header: "Apellidos", class: "w-12rem flex-none", filter: true},
    { field: "email", header: "Email", class: "flex-1", filter: true},
    { field: "geografia", field3: "name", header: "Geografía", class: "max-w-7rem flex-none", filter: true},
    { field: "evidenceTypeW1", header: "Semana 1", class: "w-7rem flex-none"},
    { field: "evidenceTypeW2", header: "Semana 2", class: "w-7rem flex-none"},
    { field: "evidenceTypeW3", header: "Semana 3", class: "w-7rem flex-none"},
    { field: "evidenceTypeW4", header: "Semana 4", class: "w-7rem flex-none"},
    { field: "evidenceTypeW5", header: "Semana 5", class: "w-7rem flex-none"},
    { field: "evidenceTypeW6", header: "Semana 6", class: "w-7rem flex-none"},
  ];

  /**
   * Constructor: inicializa servicio DialogService para componente EvidenceUpload.
   * 
   * @param dialogService Servicio DialogService
   */
  constructor(
    private evidenceService: EvidenceService,
    navigatorService : NavigatorService,
    private propertiesService: PropertiesService,
    public dialogService: DialogService,
    public authService: AuthService,
    private evidenceColorService: EvidenceColorService,
  ) { 

    let me = this;

    navigatorService.getNavivagorChangeEmitter().subscribe(menuVisible => { 
      if (menuVisible) me.contentWindowClass = 'content-menu-open';
      else me.contentWindowClass = 'content-menu-close';
    });

    this.items = [
      {label: '', icon: 'pi pi-fw pi-times', command: (e) => {this.clickColorMenu(0);}},
      {label: '', icon: 'pi pi-fw context-menu-color-1', command: (e) => {this.clickColorMenu(1);}},
      {label: '', icon: 'pi pi-fw context-menu-color-2', command: (e) => {this.clickColorMenu(2);}},
      {label: '', icon: 'pi pi-fw context-menu-color-3', command: (e) => {this.clickColorMenu(3);}},
      {label: '', icon: 'pi pi-fw context-menu-color-4', command: (e) => {this.clickColorMenu(4);}},
      {label: '', icon: 'pi pi-fw context-menu-color-5', command: (e) => {this.clickColorMenu(5);}},
      {label: '', icon: 'pi pi-fw context-menu-color-6', command: (e) => {this.clickColorMenu(6);}},
      {label: '', icon: 'pi pi-fw context-menu-color-7', command: (e) => {this.clickColorMenu(7);}}
  ];
  }

  clickColorMenu(e) {    
    let cssRow = 'row-color-'+e;
    if (e == 0) cssRow = 'row-color-none';
    
    this.evidenceColorService.modifyColor(this.selectedEvidenceItem.personId, cssRow).subscribe(()=>{
      this.selectedEvidenceItem.rowColor = cssRow;
    });
  }

  ngOnInit(): void {
    this.getData();
  }
  
  ngAfterViewInit() {    
    this.table.filter(this.centerSelected, 'geografia', 'contains');
  }
  
  getData() {
    this.isLoading = true;
    this.getUserCenter();
    this.getProperties();
    this.loadData();
  }
  
  
  getUserCenter() {
    let userCenter : String;
    
    userCenter = this.authService.getUserInfo().officeName;
    
    this.centerSelected = "";

    if (userCenter.includes("VLC")) {
      this.centerSelected = "Valencia";
    }
    else if (userCenter.includes("BCN")) {
      this.centerSelected = "Barcelona";
    }
    else if (userCenter.includes("MAD")) {
      this.centerSelected = "Madrid";
    }    
  }

  loadData(): void {
    this.isLoading = true;
    this.evidenceService.getEvidences().subscribe({
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
            comment: e.comment,
            emailNotificationSent: e.emailNotificationSent, 
            rowColor: e.rowColor});
            
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
        let actualYear = new Date().getFullYear();

        this.properties.forEach(res => {

          if (res.key == "LOAD_WEEKS") {
            this.loadWeeks = parseInt(res.value);
            let indexOfWeek1 = 4;

            for (let i = this.loadWeeks; i < 6; i++) {
              this.cols[indexOfWeek1+i].class += ' hidden';
            }
          }

          else if (res.key == "LOAD_USERNAME") {
            this.loadUser = res.value;
          }

          else if (res.key == "LOAD_DATE") {
            let auxDate = res.value.split(" ");
            let dd = parseInt(auxDate[0].split("/")[0]);
            let mm = parseInt(auxDate[0].split("/")[1]) - 1;
            let yy = parseInt(auxDate[0].split("/")[2]);
            let h = parseInt(auxDate[1].split(":")[0]);
            let m = parseInt(auxDate[1].split(":")[1]);
            this.loadDate = new Date(yy, mm, dd, h, m);
          }

          else if (res.key.startsWith("WEEK_")) {

            let weekNumber = parseInt(res.key.substring("WEEK_".length));

            let value = res.value;

            if (value != null) {
              value = this.replaceAll(value, "-"+(actualYear), "");
              value = this.replaceAll(value, "-"+(actualYear+1), "");
              value = this.replaceAll(value, "-"+(actualYear-1), "");
             
              value = value.replace(" - ", "  ");
              value = `${moment(value.split(" ")[0], "DD-MMM-YYYY").format('DD')}-${moment(value.split(" ")[2], "DD-MMM-YYYY").format('DD MMM')}`
              this.weeks = this.cols.slice(4, this.cols.length);
              this.weeks[weekNumber-1].header = value;
            }
          }
        });
        this.cols = this.cols.slice(0, 4).concat(this.weeks);
      }
    });
  }

  private escapeRegExp(string: string) : string{
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  private replaceAll(str: string, find: string, replace: string): string {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  showComment(personId: number, name: String, lastName: String, comment?: Comment) {
    const ref = this.dialogService.open(CommentComponent, {
      header: "Editar comentario de " + name + " " + lastName,
      height: "370px",
      width: "40%",
      data: {commentData: (comment != null) ? comment : null, id: personId},
      closable: false
    });

    ref.onClose.subscribe( res => {
      if (res)
        this.getData();
    });
  }

  /**
   * Inicia componente EvidenceUpload tras pulsar botón de importación de datos.
   * 
   * Se ajusta título del diálogo y anchura al 50% del espacio disponible.
   */
  importarDatos(): void {
    const dialogRef = this.dialogService.open(EvidenceUploadComponent, { header: "Importar datos de GTE", width: "50%", closable: false });
    dialogRef.onClose.subscribe(res => {
      if(res){
        this.getProperties();
        this.loadData();
      } 
    });
  }

  /**
   * Inicia componente EvidenceEmail tras pulsar botón de envío de recordatorios.
   * 
   * Se ajusta título del diálogo y anchura al 25% del espacio disponible.
   */
  evidenceEmails(): void {
    const dialogRef = this.dialogService.open(EvidenceEmailComponent, { header: "Notificar evidencias pendientes", width: "25%", closable: false });
    dialogRef.onClose.subscribe(res => {
      if(res) {
        this.getProperties();
        this.loadData();
      }
    });
  }

}
