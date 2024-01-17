import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { BlacklistService } from 'src/app/blacklist/services/blacklist.service';

@Component({
  selector: 'app-evidence-recurrence-save',
  templateUrl: './evidence-recurrence-save.component.html',
  styleUrls: ['./evidence-recurrence-save.component.scss']
})
export class EvidenceRecurrenceSaveComponent implements OnInit {

  MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  numPersonas: number = 0;
  month: string = "";
  isLoading: boolean = false;

  constructor(
      private blacklistService: BlacklistService,
      public dialogRef: DynamicDialogRef,
      public config: DynamicDialogConfig,
      private snackbarService: SnackbarService
  ) {

    this.numPersonas = config.data.persons.length;

    this.month = this.MONTHS[config.data.loadDate.getMonth()];

   }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {

    this.isLoading = true;
    let personId = this.config.data.persons.map(item => item.personId);
    let date = this.config.data.loadDate;

    this.blacklistService.save(date, personId).subscribe({
      next: () => {
        this.snackbarService.showMessage("Los registros se han guardado con éxito");
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackbarService.error("Los registros no se han podido guardar correctamente");
        this.isLoading = false;
      }
    });


  }
}
