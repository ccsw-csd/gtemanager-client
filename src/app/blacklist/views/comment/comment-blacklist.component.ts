import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { BlacklistService } from '../../services/blacklist.service';

@Component({
  selector: 'app-comment-blacklist',
  templateUrl: './comment-blacklist.component.html',
  styleUrls: ['./comment-blacklist.component.scss']
})
export class CommentBlacklistComponent implements OnInit {

  comment: string;
  text: String;
  isLoading: boolean;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private snackbarService: SnackbarService,
    private blacklistService: BlacklistService,
  ) { }

  ngOnInit(): void {
    this.comment = this.config.data.comment;
  }

  editComment() {
    

    this.isLoading = true;
    this.blacklistService.saveComment(this.config.data.id, this.comment).subscribe({
      next: () => {
        this.snackbarService.showMessage("El registro se ha guardado con éxito");
        this.isLoading = false;
        this.ref.close(true);
      },
      error: () => {
        this.snackbarService.error("El registro no se ha podido guardar correctamente");
        this.isLoading = false;
      }
    });
  }

  onClose() {
    this.ref.close(false);
  }
}
