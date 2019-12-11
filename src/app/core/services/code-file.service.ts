import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodeFile, Comment } from '../domain/modules';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeFileService {
  private readonly endpoint: string;

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.postServer}/v1/files`;
  }

  getFileUniqueReviewers(projectId: string, fileId: string) {
    return this.httpClient.get<Comment[]>(`${this.endpoint}/${projectId}/${fileId}/reviewers`);
  }

  getTableOfContent(projectId: string): Observable<CodeFile[]> {
    return this.httpClient.get<CodeFile[]>(`${this.endpoint}/${projectId}/toc`);
  }

  findById(projectId: string, fileId: string, reviewerId: string): Observable<CodeFile> {
    return this.httpClient.get<CodeFile>(`${this.endpoint}/${projectId}/${fileId}/${reviewerId}`);
  }

  update(codeFile: CodeFile): void {
    this.httpClient.patch<CodeFile>(`${this.endpoint}/${codeFile.projectId}`, codeFile).subscribe();
  }
}
