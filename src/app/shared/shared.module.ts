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
import { LoadingScreenComponent } from './component/loading-screen/loading-screen.component';
import { UserPictureComponent } from './component/user-picture/user-picture.component';

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
    ScrollToTopComponent,
    FeedbackDialogComponent,
    LoadingScreenComponent,
    UserPictureComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollToTopComponent,
    LoadingScreenComponent,
    UserPictureComponent
  ],
  entryComponents: [DeleteConfirmDialogComponent, FeedbackDialogComponent],
  providers: [MaterialModule]
})
export class SharedModule {
}
