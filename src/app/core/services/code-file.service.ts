import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CodeFile, Comment } from '../domain/modules';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeFileService {
  private readonly endpoint: string;

  private codeFileSubject: BehaviorSubject<CodeFile[]> = new BehaviorSubject<CodeFile[]>([]);

  private codeFileStore: CodeFile[] = [];

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.postServer}/v1/files`;
  }

  getFileUniqueReviewers(projectId: string, fileId: string) {
    return this.httpClient.get<Comment[]>(`${this.endpoint}/${projectId}/${fileId}/reviewers`);
  }

  getTableOfContent(projectId: string): Observable<CodeFile[]> {
    return this.httpClient.get<CodeFile[]>(`${this.endpoint}/${projectId}/toc`);
  }

  findById(projectId: string, fileId: string): Observable<CodeFile> {
    return this.httpClient.get<CodeFile>(`${this.endpoint}/${projectId}/${fileId}`);
  }

  update(codeFile: CodeFile): void {
    this.httpClient.patch<CodeFile>(`${this.endpoint}/${codeFile.projectId}`, codeFile).subscribe();
  }
}
