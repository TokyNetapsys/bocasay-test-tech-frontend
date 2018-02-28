import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SurveyService} from '../services/survey.service';
import {Location} from '@angular/common';
import {SurveyDetail} from '../model/SurveyDetail';
import {Survey} from '../model/Survey';

@Component({
  selector: 'app-detail-survey',
  templateUrl: './detail-survey.component.html',
  styleUrls: ['./detail-survey.component.css']
})
export class DetailSurveyComponent implements OnInit {

  surveyDetailList: SurveyDetail[];
  currentSurvey: Survey;
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: any[] = [];
  public doughnutChartType = 'doughnut';
  sortQCMNumberDirection = 'asc';
  sortQCMNameDirection = 'asc';
  sortDateDirection = 'asc';
  sortHoursDirection = 'asc';

  constructor(private route: ActivatedRoute,
              private surveyService: SurveyService,
              private location: Location) {
  }

  ngOnInit() {
    this.getSurvey();
  }

  getSurvey(): void {
    const code = this.route.snapshot.paramMap.get('code');
    // used to get current survey
    this.surveyService.getSurveys().subscribe(surveys => this.currentSurvey = surveys.find(s => s.code === code));
    // use to get detail of survey
    this.surveyService.getSurveyDetailByCode(code).subscribe(surveyDetailList => {
      surveyDetailList.forEach(element => {
        // if survey type is qcm we tranform result to array of key value
        if (element.type === 'qcm') {
          const temp = new Map();
          for (const key in element.result) {
            temp.set(key, element.result[key]);
          }
          element.result = [...temp.entries()].sort();
          for (const [key, value] of element.result) {
            this.doughnutChartData.push(value);
            this.doughnutChartLabels.push(key);
          }
        }
      });
      this.surveyDetailList = surveyDetailList;
    });
  }

  /**
   * function used to sort list of QCM result
   * @param {Array<any>} list
   * @param {string} column
   */
  sortQCM(list: Array<any>, column: string) {
    if (column === 'name') {
      this.sortQCMNameDirection = this.sortQCMNameDirection === 'asc' ? 'desc' : 'asc';
      const direction = this.sortQCMNameDirection === 'desc' ? 1 : -1;
      list.sort((a, b) => {
        if (a[0] < b[0]) {
          return -1 * direction;
        } else if (a[0] > b[0]) {
          return 1 * direction;
        } else {
          return 0;
        }
      });
    } else {
      this.sortQCMNumberDirection = this.sortQCMNumberDirection === 'asc' ? 'desc' : 'asc';
      const direction = this.sortQCMNumberDirection === 'desc' ? 1 : -1;
      list.sort((a, b) => {
        if (a[1] < b[1]) {
          return -1 * direction;
        } else if (a[1] > b[1]) {
          return 1 * direction;
        } else {
          return 0;
        }
      });
    }
  }

  sortDate(list: Array<any>, column: string) {
    if (column === 'date') {
      this.sortDateDirection = this.sortDateDirection === 'asc' ? 'desc' : 'asc';
      const direction = this.sortDateDirection === 'desc' ? 1 : -1;
      list.sort((a, b) => {
        if (new Date(a).getTime() < new Date(b).getTime()) {
          return -1 * direction;
        } else if (new Date(a).getTime() > new Date(b).getTime()) {
          return 1 * direction;
        } else {
          return 0;
        }
      });
    } else {
      this.sortHoursDirection = this.sortHoursDirection === 'asc' ? 'desc' : 'asc';
      const direction = this.sortHoursDirection === 'desc' ? 1 : -1;
      list.sort((a, b) => {
        if (new Date(a).getHours() < new Date(b).getHours()) {
          return -1 * direction;
        } else if (new Date(a).getHours() > new Date(b).getHours()) {
          return 1 * direction;
        } else {
          return 0;
        }
      });
    }
  }
}
