import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit, OnDestroy {
  isLoading = false;
  isAdmin = false;
  adminStatusSubscription: Subscription | null = null;

  competitionId: string = "";
  participants: Student[] = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.competitionId = params.get("id") ?? "";
      this.getParticipants(this.competitionId);
    });
    this.adminStatusSubscription = this.apiService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }
  getParticipants(id: string) {
    this.isLoading = true;
    this.apiService.getParticipants(id).subscribe(data => {
      this.participants = data.data;
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

  ngOnDestroy(): void {
    this.adminStatusSubscription?.unsubscribe();
  }
}
