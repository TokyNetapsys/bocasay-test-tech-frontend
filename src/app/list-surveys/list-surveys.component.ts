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
  selectedSurvey: Survey;

  constructor(private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.getItems();
    console.log(this.surveys);
  }

  getItems(): void {
    this.surveyService.getSurveys().subscribe(items => this.surveys = items);
  }

  onItemClick(survey: Survey) {
    this.selectedSurvey = survey;
  }
}
