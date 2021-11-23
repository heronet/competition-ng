import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  isLoading = false;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getStudents();
  }
  getStudents() {
    this.apiService.getStudents().subscribe(data => {
      this.students = data.data;
    }, err => {
      console.log(err);
      
    });
  }
}
