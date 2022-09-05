import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Comment } from '../../model/Comment';
import { EvidenceService } from '../../services/evidence.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  data: Comment;
  text: String;

  constructor(private evidenceService: EvidenceService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    ) { }

  ngOnInit(): void {

    if (this.config.data.commentData != null) {
      this.data = Object.assign({commentData: Comment}, this.config.data.commentData);
      this.text = this.data.comment;
    } else {
      this.data = new Comment();
      this.data.person = Object.assign(this.evidenceService.getPersonById(this.config.data.id));
      this.text = "";
    }
  }

  onClose() {
    this.ref.close();
  }
}
