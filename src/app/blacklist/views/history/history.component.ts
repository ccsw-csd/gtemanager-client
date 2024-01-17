import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { BlacklistItemList } from '../../model/BlacklistItemList';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  data: BlacklistItemList[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { 


    this.data = config.data;


    console.log(this.data);

  }

  ngOnInit(): void {
  }


  onClose(): void {
    this.ref.close();
  }

}
