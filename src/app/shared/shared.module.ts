import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ScrollToTopComponent } from './component/scroll-to-top/scroll-to-top.component';
import { DeleteConfirmDialogComponent } from './component/delete-confirm-dialog/delete-confirm-dialog.component';
import { FeedbackDialogComponent } from './component/feedback-dialog/feedback-dialog.component';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { NgxMdModule } from 'ngx-md';
import { UserPictureComponent } from './component/user-picture/user-picture.component';
import { SelectReviewerDialogComponent } from './component/select-reviewer-dialog/select-reviewer-dialog.component';
import { ReviewGroupDialogComponent } from './component/review-group-dialog/review-group-dialog.component';
import { AddApplicantDialogComponent } from './component/add-applicant-dialog/add-applicant-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    LMarkdownEditorModule,
    NgxMdModule
  ],
  declarations: [
    DeleteConfirmDialogComponent,
    SelectReviewerDialogComponent,
    ScrollToTopComponent,
    ReviewGroupDialogComponent,
    FeedbackDialogComponent,
    UserPictureComponent,
    AddApplicantDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollToTopComponent,
    UserPictureComponent,
    AddApplicantDialogComponent
  ],
  entryComponents: [
    DeleteConfirmDialogComponent,
    FeedbackDialogComponent,
    SelectReviewerDialogComponent,
    ReviewGroupDialogComponent,
    AddApplicantDialogComponent
  ],
  providers: [MaterialModule]
})
export class SharedModule {}
