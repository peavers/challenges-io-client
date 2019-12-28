import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Challenge } from '../domain/modules';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private readonly endpoint: string;

  private challengeSubject: BehaviorSubject<Challenge[]> = new BehaviorSubject<Challenge[]>([]);

  private challengeStore: Challenge[] = [];

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.postServer}/v1/projects`;
  }

  findAll(): Observable<Challenge[]> {
    this.httpClient.get<Challenge[]>(this.endpoint).subscribe(challenges => {
      this.challengeStore = challenges;

      this.challengeSubject.next(this.challengeStore);
    });

    return this.challengeSubject.asObservable();
  }

  findById(id: string): Observable<Challenge> {
    return this.httpClient.get<Challenge>(`${this.endpoint}/${id}`);
  }

  create(challenge: Challenge): Observable<Challenge> {
    return this.httpClient.post<Challenge>(`${this.endpoint}`, challenge);
  }

  update(challenge: Challenge): Observable<Challenge> {
    return this.httpClient.patch<Challenge>(`${this.endpoint}`, challenge);
  }

  delete(challenge: Challenge): Observable<Challenge> {
    return this.httpClient.delete<Challenge>(`${this.endpoint}/${challenge.id}`);
  }
}
