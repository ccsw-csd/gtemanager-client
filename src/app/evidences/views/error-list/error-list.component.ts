import { Component, OnInit } from '@angular/core';
import { EvidenceError } from '../../model/EvidenceError';
import { ErrorService } from '../../services/error.service';

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

}
