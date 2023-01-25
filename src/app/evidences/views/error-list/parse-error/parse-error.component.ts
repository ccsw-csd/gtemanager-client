import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EvidenceError } from 'src/app/evidences/model/EvidenceError';
import { Person } from 'src/app/evidences/model/Person';
import { EvidenceService } from 'src/app/evidences/services/evidence.service';

@Component({
  selector: 'app-parse-error',
  templateUrl: './parse-error.component.html',
  styleUrls: ['./parse-error.component.scss']
})
export class ParseErrorComponent implements OnInit {

  data: EvidenceError;
  selectedPerson: Person;
  filterPerson : string;
  groupPerson: any[] = [];
  message = 'No se han encontrado resultados';

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private evidenceService: EvidenceService,
    ) { 

    this.data = Object.assign({}, this.config.data.evidenceError);

  }

  ngOnInit(): void {
  }


  searchPerson($event) {
    this.groupPerson = [];

    if ($event.query != null) {
      this.evidenceService.searchPerson($event.query).subscribe({
        next: (res: Person[]) => {
          this.groupPerson = res.map((person) => this.mappingPerson(person));
        },
        error: () => {},
        complete: () => {},
      });
    }
  }

  mappingPerson(person: Person): any {
    return {
      field: person.lastName + ', ' + person.name,
      value: person,
    };
  }

  onClose() : void {
    this.ref.close(false);
  }

  onSave(): void {

    this.evidenceService.mapPerson(this.selectedPerson.id, this.data.email).subscribe({
      next:() => {this.ref.close(true);}
    });
  }


}
