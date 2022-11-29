import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EvidenceError } from '../../model/EvidenceError';
import { ErrorService } from '../../services/error.service';
import { ParseErrorComponent } from './parse-error/parse-error.component';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss']
})
export class ErrorListComponent implements OnInit {

  errors: EvidenceError[];
  
  isLoading: boolean = false;
  
  constructor(
    private errorService: ErrorService,
    public dialogService: DialogService,
  ) { }
  
  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoading = true;
    this.errorService.findAll().subscribe({
      next: (res: EvidenceError[]) => {
        this.errors = res;
      },
      error: () => {},
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  validateError(error: EvidenceError): void {

    const ref = this.dialogService.open(ParseErrorComponent, {
      header: "Mapeo de datos de Excel",
      height: "425px",
      width: "800px",
      data: {evidenceError: error},
      closable: true
    });

    ref.onClose.subscribe( res => {
      if (res)
       this.findAll();
    });

  }


  

}
