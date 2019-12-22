import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CircleRoutingModule } from './project.routing';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '../../shared/material.module';
import { DefaultComponent } from './pages/default/default.component';
import { ReviewComponent } from './pages/review/review.component';
import { HighlightModule } from 'ngx-highlightjs';
import { CodeLineComponent } from './components/code-line/code-line.component';
import { CodeFileComponent } from './components/code-file/code-file.component';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { CodeCommentComponent } from './components/code-comment/code-comment.component';
import { WysiwygEditorComponent } from './components/wysiwyg-editor/wysiwyg-editor.component';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { NgxMdModule } from 'ngx-md';
import { NgPipesModule } from 'angular-pipes';
import { ChallengeMetaComponent } from './components/challenge-meta/challenge-meta-component';
import { DangerZoneSectionComponent } from './components/tabs/danger-zone-section/danger-zone-section-component';
import { AdminComponent } from './pages/admin/admin.component';
import { FeedbackSectionComponent } from './components/tabs/feedback-section/feedback-section-component';
import { MetaSectionComponent } from './components/tabs/reviewer-section/meta-section-component';
import { ChallengeSectionComponent } from './components/tabs/challenge-section/challenge-section-component';

@NgModule({
  declarations: [
    DefaultComponent,
    ReviewComponent,
    AdminComponent,
    CodeFileComponent,
    CodeLineComponent,
    CodeCommentComponent,
    WysiwygEditorComponent,
    ChallengeMetaComponent,
    DangerZoneSectionComponent,
    FeedbackSectionComponent,
    MetaSectionComponent,
    ChallengeSectionComponent
  ],
  imports: [
    NgxMdModule.forRoot(),
    SharedModule,
    CircleRoutingModule,
    MomentModule,
    MaterialModule,
    HighlightModule,
    MatProgressButtonsModule,
    NgxPageScrollModule,
    LMarkdownEditorModule,
    NgPipesModule
  ],
  exports: [CodeCommentComponent],
  entryComponents: []
})
export class ProjectModule {}
