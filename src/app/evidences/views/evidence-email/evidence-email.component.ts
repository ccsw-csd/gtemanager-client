import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Center } from 'src/app/evidences/models/Center';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { EmailService } from '../../services/email.service';
import { CenterService } from '../../services/center.service';
import { Reminder } from '../../models/Reminder';
import { Clipboard } from '@angular/cdk/clipboard';

/**
 * Componente EvidenceEmail: diálogo de selección de geografía y fecha de cierre para envío de correos electrónicos recordatorios desde la aplicación.
 */
@Component({
  selector: 'app-evidence-email',
  templateUrl: './evidence-email.component.html',
  styleUrls: ['./evidence-email.component.scss']
})
export class EvidenceEmailComponent implements OnInit {

  centers: Center[];
  filterCenter: Center[];

  closingDate: Date = new Date();
  center: Center;
  isLoading: boolean;

  /**
   * Constructor: inicializar servicios.
   * 
   * @param emailService Servicio EmailService para envío de datos a backend
   * @param centerService Servicio Center service para obtención de centros desde backend
   * @param dialogRef DynamicDialogRef, referencia al diálogo de la ventana Email
   * @param config DynamicDialogCongig, configuración del diálogo de la ventana Email
   * @param snackbarService Servicio SnackbarService para muestra de notificaciones o avisos en pantalla
   */
  constructor(
    public emailService: EmailService,
    public centerService: CenterService,
    private clipboard: Clipboard,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private snackbarService: SnackbarService
  ) { }

  /**
   * Obtener listado de centros al inicializar.
   */
  ngOnInit(): void {
    this.isLoading = true;
    this.centerService.findAll().subscribe({
      next: centers => {
        this.centers = centers;
        this.isLoading = false;
      },
      error: error => {
        this.snackbarService.error("Error obteniendo lista de centros. " + error);
        this.isLoading = false;
        this.close(false);
      }
    }
    );
  }

  /**
   * En caso de pulsar botón enviar, realizar petición a backend para enviar recordatorios a través de EmailService.
   * 
   * Se habilita la animación de carga hasta recibir una respuesta de backend.
   * Se muestra un mensaje en pantalla en caso de producirse un fallo durante el envío de mensajes.
   * Este método no se ejecutará si no se ha seleccionado un centro y fecha de cierre.
   */
  onSend() {
    this.isLoading = true;

    let reminder = new Reminder();
    reminder.closingDate = new Date(Date.UTC(this.closingDate.getFullYear(), this.closingDate.getMonth(), this.closingDate.getDate()));
    reminder.centerId = this.filterCenter.map(item => item.id).toString() 
    
    let geografias = [];
    this.filterCenter.forEach(item => {
      geografias.push(item.name);
    });

    let evidenceList = this.config.data.evidenceList;

    evidenceList = evidenceList.filter(item => geografias.indexOf(item.geografia) >= 0);

    let list = '';
    evidenceList.forEach(item => {      
      list += item.email + ";";
    });

    this.clipboard.copy(list.slice(0,-1));
    this.snackbarService.showMessage('Se ha copiado la lista de correos al clipboard');

    this.isLoading = false;
    this.close(true);
    

    /*
    this.emailService.sendEmails(reminder).subscribe({
      next: result => {
        if (result)
          this.snackbarService.showMessage("Recordatorios enviados. " + result);
        else
          this.snackbarService.showMessage("Recordatorios enviados.");
        this.isLoading = false;
        this.close(true);
      },
      error: error => {
        this.snackbarService.error(error);
        this.isLoading = false;
      }
    });
    */
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
  close(isSendNotification: boolean) {
    this.dialogRef.close(isSendNotification);
  }
}
