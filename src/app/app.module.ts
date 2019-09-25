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
import { SidebarComponent } from './layout/sidebar/sidebar.component';

import md from 'highlight.js/lib/languages/markdown';
import yaml from 'highlight.js/lib/languages/yaml';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';

export function hljsLanguages() {
  return [
    { name: 'java', func: java },
    { name: 'typescript', func: typescript },
    { name: 'javascript', func: javascript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml },
    { name: 'yml', func: yaml },
    { name: 'md', func: md }
  ];
}

@NgModule({
  declarations: [AppComponent, ContentLayoutComponent, SidebarComponent, NavbarComponent, LoginComponent],
  imports: [
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
