import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-toppers',
  templateUrl: './toppers.component.html',
  styleUrls: ['./toppers.component.scss']
})
export class ToppersComponent implements OnInit {
  competitionId: string = "";
  students: Student[] = [];
  isLoading = false;
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.competitionId = params.get("id") ?? "";
      this.getToppers(this.competitionId);
    });
  }
  getToppers(id: string) {
    this.apiService.getToppers(id).subscribe(data => {
      this.students = data.data;
      console.log(data);
      
    }, err => {
      console.log(err);
      
    });
  }

}
