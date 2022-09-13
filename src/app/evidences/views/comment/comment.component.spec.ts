import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Center } from '../../model/Center';
import { Comment } from "../../model/Comment";
import { Properties } from '../../model/Properties';
import { CommentComponent } from "./comment.component";

describe('CommentComponent', () => {
  let commentComponent: CommentComponent;
  let mockEvidenceService;
  let mockCommentService;
  let mockDynamicDialogRef;
  let mockDynamicDialogConfig;
  let mockSnackbarService;

  let COMMENT = new Comment({
    id:1,
    person:{
      id:1,
      saga:null,
      username:null,
      email:null,
      name:null,
      lastName:null,
      center:null,
      businessCode:null,
      grade:null,
      active:null
    }, 
    comment:"Comment"});

      let COMMENT_EDITED: Comment[];
      let COMMENT_SAVED: Comment[];

  beforeEach(() => {

    mockEvidenceService = jasmine.createSpyObj(["getPersonById"]);
    mockCommentService = jasmine.createSpyObj(["saveComment"]);
    mockDynamicDialogRef = jasmine.createSpyObj(["close", "onClose"]);
    mockDynamicDialogConfig = jasmine.createSpyObj([""]);
    mockSnackbarService = jasmine.createSpyObj(["showMessage", "error"]);

    commentComponent = new CommentComponent(mockEvidenceService, 
      mockCommentService, mockDynamicDialogRef,
      mockDynamicDialogConfig, mockSnackbarService);
  });

  it('editCommentShouldUpdate', () => {
    let editedComment = new Comment({id:1, 
      person:{
        id:1,
        saga:null,
        username:null,
        email:null,
        name:null,
        lastName:null,
        center:null,
        businessCode:null,
        grade:null,
        active:null
      }, 
      comment:"New comment"});

    mockDynamicDialogConfig.data = COMMENT;
    commentComponent.data = COMMENT;
    mockEvidenceService.getPersonById.and.returnValue(of(COMMENT.person));
    mockCommentService.saveComment.and.returnValue(of(true));
    mockDynamicDialogRef.close.and.returnValue(of(true));
    commentComponent.editComment(editedComment);

    expect(commentComponent.editComment(editedComment)).not.toBeNull();
  });
});