import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  isLoading = false;
  competitionId: string = "";
  participants: Student[] = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.competitionId = params.get("id") ?? "";
      this.getParticipants(this.competitionId);
    })
  }
  getParticipants(id: string) {
    this.isLoading = true;
    this.apiService.getParticipants(id).subscribe(data => {
      this.participants = data.data;
      console.log(this.participants);
      
      this.isLoading = false;
    }, err => {
      console.log(err);
      this.isLoading = false;
    });
  }
  markParticipant(studentId: string, score: number) {
    console.log(score);
    
    const data: {studentId: string, score: number} = {
      studentId,
      score
    }
    this.apiService.markParticipant(this.competitionId, data).subscribe(() => {
      console.log("Done");
      
    })
  }

}
