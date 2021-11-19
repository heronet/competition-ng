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
  participants: Student[] = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if(id) this.getParticipants(id);
    })
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

}
