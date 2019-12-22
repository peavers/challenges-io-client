import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { LoginComponent } from './layout/login/login.component';
import { MaterialModule } from './shared/material.module';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { SharedModule } from './shared';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import xml from 'highlight.js/lib/languages/xml';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AngularFirestore } from '@angular/fire/firestore';

export function hljsLanguages() {
  return [
    { name: 'xml', func: xml },
    { name: 'java', func: java },
    { name: 'typescript', func: typescript },
    { name: 'javascript', func: javascript }
  ];
}

@NgModule({
  declarations: [AppComponent, ContentLayoutComponent, NavbarComponent, LoginComponent],
  imports: [
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    NgxPageScrollModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatProgressButtonsModule,
    LMarkdownEditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: hljsLanguages
      }
    },
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
