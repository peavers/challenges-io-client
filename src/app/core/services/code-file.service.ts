import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CodeFile } from '../domain/modules';
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

  findAllByProjectId(projectId: string): Observable<CodeFile[]> {
    this.httpClient.get<CodeFile[]>(`${this.endpoint}/${projectId}`).subscribe(codeFiles => {
      this.codeFileStore = codeFiles;
      this.codeFileSubject.next(this.codeFileStore);
    });

    return this.codeFileSubject.asObservable();
  }

  update(codeFile: CodeFile): void {
    this.httpClient.patch<CodeFile>(`${this.endpoint}/${codeFile.projectId}`, codeFile).subscribe();
  }
}
