import {Injectable} from '@angular/core';
import {Survey} from '../model/Survey';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SurveyDetail} from '../model/SurveyDetail';


@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) {
  }


  /**
   * service to get list of survey from file
   * @returns {Observable<Survey[]>}
   */
  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>('./assets/api/list.json');
  }

  /**
   * service to get detail of survey from file
   * @param {string} code
   * @returns {Observable<SurveyDetail[]>}
   */
  getSurveyDetailByCode(code: string): Observable<SurveyDetail[]> {
    return this.http.get<SurveyDetail[]>('./assets/api/' + code + '.json');
  }
}
