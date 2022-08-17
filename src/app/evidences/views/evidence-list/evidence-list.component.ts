import { Component, OnInit } from '@angular/core';
import { Evidence } from '../../model/Evidence';

@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.scss']
})
export class EvidenceListComponent implements OnInit {

  evidenceList: Evidence[];
  isLoading: boolean;

  constructor() { }

  ngOnInit(): void {

  }

}
