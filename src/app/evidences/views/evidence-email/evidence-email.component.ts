import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Center } from 'src/app/evidences/models/Center';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { EmailService } from '../../services/email.service';
import { CenterService } from '../../services/center.service';

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

  closingDate: Date;
  center: Center;
  isLoading: boolean;

  /**
   * Constructor: inicializar servicios.
   * 
   * @param emailService 
   * @param centerService 
   * @param dialogRef 
   * @param config 
   * @param snackbarService 
   */
  constructor(
    public emailService: EmailService,
    public centerService: CenterService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private snackbarService: SnackbarService
  ) { }

  /**
   * Obtener listado de centros al inicializar.
   */
  ngOnInit(): void {
    this.isLoading = true;
    this.centerService.getCenters().subscribe({
      next: centers => {
        this.centers = centers;
        this.isLoading = false;
      },
      error: error => {
        this.snackbarService.error("Error obteniendo lista de centros. " + error);
        this.isLoading = false;
        this.close();
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
    this.emailService.sendEmails(this.closingDate, this.center.id).subscribe({
      next: result => {
        if (result)
          this.snackbarService.showMessage("Recordatorios enviados. " + result);
        else
          this.snackbarService.showMessage("Recordatorios enviados.");
        this.isLoading = false;
        this.close();
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
    this.close();
  }

  /**
   * Cerrar diálogo.
   */
  close() {
    this.dialogRef.close();
  }
}
