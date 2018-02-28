import {Component, OnInit} from '@angular/core';
import {Survey} from '../model/Survey';
import {SurveyService} from '../services/survey.service';

@Component({
  selector: 'app-surveys-items',
  templateUrl: './list-surveys.component.html',
  styleUrls: ['./list-surveys.component.css']
})
export class ListSurveysComponent implements OnInit {
  surveys: Survey[];
  sortNameDirection = 'asc';
  sortCodeDirection = 'asc';

  constructor(private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.surveyService.getSurveys().subscribe(items => this.surveys = items);
  }

  /**
   * function used to sort name by name of survey
   */
  sortByName() {
    this.sortNameDirection = this.sortNameDirection === 'asc' ? 'desc' : 'asc';
    const direction = this.sortNameDirection === 'desc' ? 1 : -1;
    this.surveys.sort((a, b) => {
      if (a.name < b.name) {
        return -1 * direction;
      } else if (a.name > b.name) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  /**
   * function used to sort name by code of survey
   */
  sortByCode() {
    this.sortCodeDirection = this.sortCodeDirection === 'asc' ? 'desc' : 'asc';
    const direction = this.sortCodeDirection === 'desc' ? 1 : -1;
    this.surveys.sort((a, b) => {
      if (a.code < b.code) {
        return -1 * direction;
      } else if (a.code > b.code) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
