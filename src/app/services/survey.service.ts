import { Injectable } from '@angular/core';
import {Survey} from '../model/Survey';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) { }


  getItems(): Observable<Survey[]> {
    return this.http.get<Survey[]>('./assets/api/list.json');
  }
}
