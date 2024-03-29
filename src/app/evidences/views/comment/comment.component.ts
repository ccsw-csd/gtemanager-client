import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Comment } from '../../model/Comment';
import { Person } from '../../model/Person';
import { CommentService } from '../../services/comment.service';
import { EvidenceService } from '../../services/evidence.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  data: Comment;
  text: String;
  isLoading: boolean;

  constructor(private evidenceService: EvidenceService,
    private commentService: CommentService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    if (this.config.data.commentData != null) {
      this.data = Object.assign({ commentData: Comment }, this.config.data.commentData);
    } else {
      this.isLoading = true;
      this.data = new Comment();
      this.evidenceService.getPersonById(this.config.data.id).subscribe(res => {
        this.data.person = res;
        this.isLoading = false;
      });
      this.data.comment = "";
    }
  }

  editComment(item: Comment) {
    if (this.data.comment) {
      this.isLoading = true;
      this.commentService.saveComment(item).subscribe({
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
    else if (this.data.id) {
      this.isLoading = true;
      this.commentService.deleteComment(this.data.id).subscribe({
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
  }

  onClose() {
    this.ref.close(false);
  }
}
