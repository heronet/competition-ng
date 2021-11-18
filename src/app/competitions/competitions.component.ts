import { Component, OnInit } from '@angular/core';
import { Competition } from '../models/competition';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {
  competitions: Competition[] = [];
  isLoading = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCompetitions();
  }
  getCompetitions() {
    this.isLoading = true;
    // this.apiService.getCompetitions().subscribe({
    //   next: (data) => {
    //     this.competitions = data.competitions;
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.isLoading = false;
    //   }
    // });
    this.apiService.getCompetitions().subscribe(data => {
      this.competitions = data.data;
      this.isLoading = false;
    }, err => {
      console.log(err);
      this.isLoading = false;
    })
  }
}
