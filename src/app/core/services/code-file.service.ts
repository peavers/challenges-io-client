import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodeFile } from '../domain/modules';
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
