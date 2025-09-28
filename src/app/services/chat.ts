// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/chat.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // The URL of your Python backend
  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  sendMessage(query: string): Observable<ApiResponse> {
    const requestBody = { query };
    return this.http.post<ApiResponse>(this.backendUrl, requestBody);
  }
}