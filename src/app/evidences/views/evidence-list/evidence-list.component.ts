import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Evidence } from '../../model/Evidence';
import { DialogService } from 'primeng/dynamicdialog';
import { EvidenceEmailComponent } from '../evidence-email/evidence-email.component';
import { EvidenceUploadComponent } from '../evidence-upload/evidence-upload.component';
import { EvidenceService } from '../../services/evidence.service';
import { Properties } from '../../model/Properties';
import { Comment } from '../../model/Comment';
import { CommentComponent } from '../comment/comment.component'; 
import { Center } from '../../model/Center';
import { PropertiesService } from '../../services/properties.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { EvidenceItemList } from '../../model/EvidenceItemList';
import { Table } from 'primeng/table';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import { MenuItem } from 'primeng/api';
import { EvidenceColorService } from '../../services/evidence-color.service';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx-js-style'; 
import { OverlayPanel } from 'primeng/overlaypanel';
import { EvidenceManagerUploadComponent } from '../evidence-manager-upload/evidence-manager-upload.component';
import { timer } from 'rxjs';
import { RecurrenceService } from '../../services/recurrence.service';
import { EvidenceRecurrenceSaveComponent } from '../evidence-recurrence-save/evidence-recurrence-save.component';

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

  totalPersons: number;

  @ViewChild('el') table: Table;
  contentWindowClass: String = "content-menu-close";

  evidenceList: Evidence[];
  data: EvidenceItemList[];
  isLoading: boolean = false;
  selectedEvidenceItem: EvidenceItemList;

  properties: Properties[];
  loadWeeks: number;
  loadDate: Date;
  loadUser: String;
  weeks = [];

  items: MenuItem[];


  filterColours = [
    {code: 'row-color-none', name: 'Sin color', color: 'context-menu-color-none'},
    {code: 'row-color-1', name: 'Baja compañía', color: 'context-menu-color-1'},
    {code: 'row-color-2', name: 'Baja médica', color: 'context-menu-color-2'},
    {code: 'row-color-3', name: 'Pdte. contactar', color: 'context-menu-color-3'},
    {code: 'row-color-3b', name: 'Avisado', color: 'context-menu-color-3b'},
    {code: 'row-color-4', name: 'Errores GTE', color: 'context-menu-color-4'},
    {code: 'row-color-5', name: 'Sin código proyecto', color: 'context-menu-color-5'},
    {code: 'row-color-6', name: 'Problemas PON', color: 'context-menu-color-6'},
    {code: 'row-color-7', name: 'Corregido', color: 'context-menu-color-7'},
    {code: 'row-color-8', name: 'Bench', color: 'context-menu-color-8'},
  ];
  selectedColours: string[] = ['row-color-none', 'row-color-1', 'row-color-2', 'row-color-3', 'row-color-3b', 'row-color-4', 'row-color-5', 'row-color-6', 'row-color-7', 'row-color-8'];

  centerSelected: String;


  @ViewChild('op') op: OverlayPanel;

  cols = [
    { field: "recurrence", header: "history", class: "w-2_5rem flex-none", filter: true, icon: true}, 
    { field: "saga", header: "Saga", class: "w-7rem flex-none", filter: true},
    { field: "name", header: "Nombre", class: "w-8rem flex-none", filter: true},
    { field: "lastName", header: "Apellidos", class: "w-10rem flex-none", filter: true},
    { field: "email", header: "Email", class: "flex-1", filter: true},
    { field: "manager", header: "Responsables", class: "w-10rem flex-none white-space-nowrap", filter: true},
    { field: "project", header: "Proyectos", class: "w-10rem flex-none white-space-nowrap", filter: true},
    { field: "client", header: "Clientes", class: "w-10rem flex-none white-space-nowrap", filter: true},    
    { field: "geografia", header: "Geografía", class: "w-7rem flex-none", filter: true},
    { field: "evidenceTypeW1", header: "", class: "w-7rem flex-none"},
    { field: "evidenceTypeW2", header: "", class: "w-7rem flex-none"},
    { field: "evidenceTypeW3", header: "", class: "w-7rem flex-none"},
    { field: "evidenceTypeW4", header: "", class: "w-7rem flex-none"},
    { field: "evidenceTypeW5", header: "", class: "w-7rem flex-none"},
    { field: "evidenceTypeW6", header: "", class: "w-7rem flex-none"},
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
    private recurrenceService: RecurrenceService,
  ) { 

    let me = this;

    navigatorService.getNavivagorChangeEmitter().subscribe(menuVisible => { 
      if (menuVisible) me.contentWindowClass = 'content-menu-open';
      else me.contentWindowClass = 'content-menu-close';
    });

    this.items = [
      {label: 'Sin color', icon: 'pi pi-fw pi-times', command: (e) => {this.clickColorMenu(0);}},
      {label: 'Baja compañía', icon: 'pi pi-fw context-menu-color-1', command: (e) => {this.clickColorMenu(1);}},
      {label: 'Baja médica', icon: 'pi pi-fw context-menu-color-2', command: (e) => {this.clickColorMenu(2);}},
      {label: 'Pdte. contactar', icon: 'pi pi-fw context-menu-color-3', command: (e) => {this.clickColorMenu(3);}},
      {label: 'Avisado', icon: 'pi pi-fw context-menu-color-3b', command: (e) => {this.clickColorMenu('3b');}},
      {label: 'Errores GTE', icon: 'pi pi-fw context-menu-color-4', command: (e) => {this.clickColorMenu(4);}},
      {label: 'Sin código proyecto', icon: 'pi pi-fw context-menu-color-5', command: (e) => {this.clickColorMenu(5);}},
      {label: 'Problemas PON', icon: 'pi pi-fw context-menu-color-6', command: (e) => {this.clickColorMenu(6);}},
      {label: 'Corregido', icon: 'pi pi-fw context-menu-color-7', command: (e) => {this.clickColorMenu(7);}},
      {label: 'Bench', icon: 'pi pi-fw context-menu-color-8', command: (e) => {this.clickColorMenu(8);}}
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
    this.getUserCenter();
    
    this.getProperties();
    this.getData();

    const ticker = timer(0, 60000);
    ticker.subscribe(() => {
      this.refreshData();
    });
  }
  
  ngAfterViewInit() {    
    this.table.filter(this.centerSelected, 'geografia', 'contains');
  }

  selectColor(color) : void {
    let filterValues = this.selectedColours.concat([]);

    if (this.selectedColours.indexOf('row-color-none') >= 0) {
      filterValues = filterValues.concat([null]);
    }

    this.table.filter(filterValues,'rowColor', 'in');
  }
  
  getData() {
    this.isLoading = true;    
    this.loadData();        
  }

  changeRowColor(worksheet, rowIndex: number, rowColor: String) : void {
    let color : string = '';
    
    if (rowColor == 'row-color-1') color = '7F7F7F';
    else if (rowColor == 'row-color-2') color = '4472C4';
    else if (rowColor == 'row-color-3') color = 'FFC000';
    else if (rowColor == 'row-color-3b') color = 'FFC099';
    else if (rowColor == 'row-color-4') color = 'FF0000';
    else if (rowColor == 'row-color-5') color = 'FFFF00';
    else if (rowColor == 'row-color-6') color = 'CCCCFF';
    else if (rowColor == 'row-color-7') color = '00B050';
    else if (rowColor == 'row-color-8') color = 'bebebe';
    else return;

    let style = {
      fill: {
        fgColor: {rgb: color},
      },
    };


    worksheet['A'+rowIndex].s = style;
    worksheet['B'+rowIndex].s = style;
    worksheet['C'+rowIndex].s = style;
    worksheet['D'+rowIndex].s = style;
    worksheet['E'+rowIndex].s = style;
    worksheet['F'+rowIndex].s = style;
    worksheet['G'+rowIndex].s = style;
    worksheet['H'+rowIndex].s = style;
    worksheet['I'+rowIndex].s = style;
    worksheet['J'+rowIndex].s = style;
    worksheet['K'+rowIndex].s = style;
    worksheet['L'+rowIndex].s = style;
    worksheet['M'+rowIndex].s = style;
    worksheet['N'+rowIndex].s = style;
    worksheet['O'+rowIndex].s = style;
    worksheet['P'+rowIndex].s = style;

  }

  exportarDatos() : void {
    
    let json = this.table.dataToRender.map(item => ({
        Recurrente: item.recurrence ? 'Si' : '',
        Saga: item.saga,
        Nombre: item.name,
        Apellidos: item.lastName,
        Email: item.email,
        Responsables: item.manager ? item.manager : '',
        Proyectos: item.project ? item.project : '',
        Clientes: item.client ? item.client: '',
        Geografia: item.geografia,
        [this.cols[9].header]: item.evidenceTypeW1,
        [this.cols[10].header]: item.evidenceTypeW2,
        [this.cols[11].header]: item.evidenceTypeW3,
        [this.cols[12].header]: item.evidenceTypeW4,
        [this.cols[13].header]: item.evidenceTypeW5,
        [this.cols[14].header]: item.evidenceTypeW6,
        Comentario: item.comment != null ? item.comment.comment : '',
    }));
    

    let objectMaxLength = []; 
    for (let i = 0; i < json.length; i++) {
      let value = <any>Object.values(json[i]);
      for (let j = 0; j < value.length; j++) {
        if (typeof value[j] == "number") {
          objectMaxLength[j] = 10;
        } else if (value[j] != null) {
          objectMaxLength[j] =
            objectMaxLength[j] >= value[j].length
              ? objectMaxLength[j]
              : value[j].length;
        }
      }
    }
    
    var wscols = [
      { width: 10 },
      { width: objectMaxLength[1] }, 
      { width: objectMaxLength[2] }, 
      { width: objectMaxLength[3] }, 
      { width: objectMaxLength[4] },
      { width: 50 },
      { width: 50 },
      { width: 50 },
      { width: 12 },
      { width: 9 },
      { width: 9 },
      { width: 9 },
      { width: 9 },
      { width: 9 },
      { width: 9 },
      { width: objectMaxLength[13] }
    ];


    const worksheet = XLSX.utils.json_to_sheet(json);
    worksheet["!cols"] = wscols;
    

    for (let i = 0; i < this.table.dataToRender.length; i++) {
      let rowColor = this.table.dataToRender[i].rowColor;
      if (rowColor) this.changeRowColor(worksheet, i+2, rowColor);
    }

    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "evidencias");

  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });

    let time = new Date().toISOString().slice(0,16).replace(':','-').replace('T', '_');
    FileSaver.saveAs(data, fileName + '_export_' + (time) + EXCEL_EXTENSION);
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
        this.totalPersons = this.evidenceList.length;
        this.isLoading = false;
        this.evidenceList.forEach(e => {
          this.data.push({
            saga: e.saga,
            personId: e.person.id,
            name: e.person.name,
            lastName: e.person.lastName,
            email: e.person.email,
            geografia: e.person.center?.name,
            manager: e.manager,
            project: e.project,
            client: e.client,
            recurrence: e.recurrence,
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

        if (this.table && this.table.filter){
          this.table.filter(this.centerSelected, 'geografia', 'contains');
        } 
      }
    });
  }

  onFilter(event) {
    setTimeout(() => {
      this.totalPersons = event.filteredValue.length;
    }, 0);
  }

  refreshData(): void {
    this.evidenceService.getEvidences().subscribe({
      next: (res: Evidence[]) => {
        this.evidenceList = res;            
      },
      error: () => {},
      complete: ()  => {
        this.isLoading = false;
        this.evidenceList.forEach(e => {

          let person = this.data.filter(p => p.personId == e.person.id);

          if(person[0] != null){
            person[0].comment = e.comment;
            person[0].rowColor = e.rowColor;
          }
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
            let indexOfWeek1 = 9;

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
              this.weeks = this.cols.slice(9, this.cols.length);
              this.weeks[weekNumber-1].header = value;
            }
          }
        });
        this.cols = this.cols.slice(0, 9).concat(this.weeks);
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
      height: "410px",
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
   * Inicia componente EvidenceManagerUpload tras pulsar botón de importación de gestores.
   * 
   * Se ajusta título del diálogo y anchura al 50% del espacio disponible.
   */
    importarManagers(): void {
      const dialogRef = this.dialogService.open(EvidenceManagerUploadComponent, { header: "Importar datos de Responsables/Proyectos-GTE", width: "50%", closable: false });
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
    const dialogRef = this.dialogService.open(EvidenceEmailComponent, { 
      header: "Notificar evidencias pendientes", width: "450px", closable: false ,
      data: {"evidenceList": this.data}
    });
    dialogRef.onClose.subscribe(res => {
      if(res) {
        this.getProperties();
        this.loadData();
      }
    });
  }


  cellClick(evidenceItem: EvidenceItemList, colName: string) {
    
    if (colName === 'recurrence') {
      evidenceItem.recurrence = !evidenceItem.recurrence;
      this.recurrenceService.save(evidenceItem.personId, evidenceItem.recurrence).subscribe();
      return;
    }

    if (colName === 'comment') {
      this.showComment(evidenceItem.personId, evidenceItem.name, evidenceItem.lastName, evidenceItem.comment);
      return;
    }

  }

  selectAllRecurrence() : void {

    let allActiveRecurrence = true;

    this.table.dataToRender.forEach(item => allActiveRecurrence = allActiveRecurrence && item.recurrence);

    let activateRecurrence = true;
    if (allActiveRecurrence) activateRecurrence = false;

    let ids = [];
    this.table.dataToRender.forEach(item => {item.recurrence = activateRecurrence; ids.push(item.personId);});

    this.recurrenceService.saveMultiple(ids, activateRecurrence).subscribe();

  }

  guardarBlacklist(): void {

    let filterData = this.data.filter(item => item.recurrence);

    const ref = this.dialogService.open(EvidenceRecurrenceSaveComponent, {
      header: "Guardar información en la Blacklist",
      height: "450px",
      width: "550px",
      data: {persons: filterData, loadDate: this.loadDate},
      closable: false
    });

  }
}
