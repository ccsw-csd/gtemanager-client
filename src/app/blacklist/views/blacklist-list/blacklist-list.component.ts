import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import { BlacklistService } from '../../services/blacklist.service';
import { Blacklist } from '../../model/Blacklist';
import { BlacklistItemList } from '../../model/BlacklistItemList';
import { Table } from 'primeng/table';
import { CommentBlacklistComponent } from '../comment/comment-blacklist.component';
import { HistoryComponent } from '../history/history.component';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx-js-style'; 
import { ConfirmationService } from 'primeng/api';
import { SnackbarService } from 'src/app/core/services/snackbar.service';


@Component({
  selector: 'app-blacklist-list',
  templateUrl: './blacklist-list.component.html',
  styleUrls: ['./blacklist-list.component.scss']
})
export class BlacklistListComponent implements OnInit {

  @ViewChild('el') table: Table;
  contentWindowClass: String = "content-menu-close";
  isLoading: boolean = false;
  totalPersons: number = 0;
  data: BlacklistItemList[];
  blacklistData: Blacklist[];
  
  centerSelected: string;
  monthSelected: string;


  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  cols = [
    { field: "saga", fieldSort: "saga", header: "Saga", class: "w-6rem flex-none", filter: true},
    { field: "name", fieldSort: "name", header: "Nombre", class: "w-8rem flex-none", filter: true},
    { field: "lastName", fieldSort: "lastName", header: "Apellidos", class: "w-10rem flex-none", filter: true},
    { field: "email", fieldSort: "email", header: "Email", class: "flex-1", filter: true},
    { field: "manager", fieldSort: "manager", header: "Responsables", class: "w-10rem flex-none white-space-nowrap", filter: true},
    { field: "project", fieldSort: "project", header: "Proyectos", class: "w-10rem flex-none white-space-nowrap", filter: true},
    { field: "client", fieldSort: "client", header: "Clientes", class: "w-10rem flex-none white-space-nowrap", filter: true},    
    { field: "geografia", fieldSort: "geografia", header: "Geografía", class: "w-7rem flex-none", filter: true},
    { field: "date", fieldSort: "dateRaw", header: "Month", class: "w-10rem flex-none", filter: true},
  ];


  constructor(
    navigatorService : NavigatorService,
    public dialogService: DialogService,
    public authService: AuthService,
    private blacklistService: BlacklistService,
    private confirmationService: ConfirmationService,
    private snackbarService: SnackbarService,

    ) {

      let me = this;

      navigatorService.getNavivagorChangeEmitter().subscribe(menuVisible => { 
        if (menuVisible) me.contentWindowClass = 'content-menu-open';
        else me.contentWindowClass = 'content-menu-close';
      });


      let date = new Date();

      this.monthSelected = this.months[date.getMonth()] + " " + date.getFullYear();

    }

  ngOnInit(): void {

    this.getUserCenter();
    this.loadData();

  }

  ngAfterViewInit() {    
    this.table.filter(this.centerSelected, 'geografia', 'contains');
    this.table.filter(this.monthSelected, 'date', 'contains');
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

    this.blacklistService.getList().subscribe({
      next: (res: Blacklist[]) => {
        this.blacklistData = res;
        this.data = [];               
      },
      error: () => {},
      complete: ()  => {
        this.isLoading = false;
        this.blacklistData.forEach(e => {

          let date = new Date(e.date);
          let dateString = this.months[date.getMonth()] + " " + date.getFullYear();

          this.data.push({
            id: e.id,
            dateRaw: date,
            personId: e.person.id,
            date: dateString,
            saga: e.person.saga,
            name: e.person.name,
            lastName: e.person.lastName,
            email: e.person.email,
            geografia: e.person.center?.name,
            manager: e.manager,
            project: e.project,
            client: e.client,
            comment: e.comment,
            rowColor: e.rowColor});            
        });

        if (this.table && this.table.filter){
          this.table.filter(this.centerSelected, 'geografia', 'contains');
          this.table.filter(this.monthSelected, 'date', 'contains');
        } 
      }
    });      


  }


  onFilter(event) {
    setTimeout(() => {
      let distinctPersons = [... new Set(event.filteredValue.map(item => item.personId))];
      this.totalPersons = distinctPersons.length;
    }, 0);
  }


  cellClick(item: BlacklistItemList, colName: string) {
    
    if (colName === 'comment') {
      const ref = this.dialogService.open(CommentBlacklistComponent, {
        header: "Comentarios de " + item.name + " " + item.lastName+ " ("+item.date+")",
        height: "410px",
        width: "700px",
        data: item,
        closable: false
      });
  
      ref.onClose.subscribe( res => {
        if (res)
          this.loadData();
      });

      return;
    }

    else if (colName === 'history') {

      let filterData = this.data.filter(itemList => itemList.personId == item.personId);

      const ref = this.dialogService.open(HistoryComponent, {
        header: "Historial de " + item.name + " " + item.lastName,
        width: "90vw",
        height: "90vh",
        data: filterData,
        closable: false
      });
  
      return;
    }
  }


  exportarDatos() : void {
    
    let json = this.table.dataToRender.map(item => ({
        Saga: item.saga,
        Nombre: item.name,
        Apellidos: item.lastName,
        Email: item.email,
        Responsables: item.manager ? item.manager : '',
        Proyectos: item.project ? item.project : '',
        Clientes: item.client ? item.client: '',
        Geografia: item.geografia,
        Mes: item.date,
        Fecha: item.dateRaw,
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
      { width: 12 }, 
      { width: 25 }, 
      { width: 40 }, 
      { width: 50 },
      { width: 75 },
      { width: 75 },
      { width: 75 },
      { width: 12 },
      { width: 20 },
      { width: 15 },
      { width: 75 }
    ];


    const worksheet = XLSX.utils.json_to_sheet(json);
    worksheet["!cols"] = wscols;
    

    for (let i = 0; i < this.table.dataToRender.length; i++) {
      let rowColor = this.table.dataToRender[i].rowColor;
      //if (rowColor) this.changeRowColor(worksheet, i+2, rowColor);
    }

    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "blacklist");

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

  delete(item: BlacklistItemList) : void {

    this.confirmationService.confirm({
      message: 'Estás a punto de borrar de la Blacklist a '+item.name+' '+item.lastName+' para el mes de '+item.date+'. <br/><br/>¿Seguro/a que quieres borrar a esta persona de la Blacklist?',
      rejectButtonStyleClass: 'p-button p-button-secondary p-button-outlined',
      acceptIcon: 'false',
      rejectIcon: 'false',      
      accept: () => {
        this.confirmationService.close();
        
        this.blacklistService.delete(item.id).subscribe({
          next: () => {
            this.snackbarService.showMessage('El registro se ha borrado con éxito');
            this.loadData();
          },
          error: (errorResponse) => {
            this.snackbarService.error(errorResponse['message']);
          },
        });
        
      },
      reject: () => {
        this.confirmationService.close();
      },
    });


  }

}
