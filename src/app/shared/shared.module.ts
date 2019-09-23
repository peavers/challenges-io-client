import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ScrollToTopComponent } from './component/scroll-to-top/scroll-to-top.component';
import { DeleteConfirmDialogComponent } from './component/delete-confirm-dialog/delete-confirm-dialog.component';
import { FeedbackDialogComponent } from './component/feedback-dialog/feedback-dialog.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MaterialModule, ReactiveFormsModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ScrollToTopComponent],
  declarations: [DeleteConfirmDialogComponent, ScrollToTopComponent, FeedbackDialogComponent],
  entryComponents: [DeleteConfirmDialogComponent, FeedbackDialogComponent],
  providers: [MaterialModule]
})
export class SharedModule {
}
