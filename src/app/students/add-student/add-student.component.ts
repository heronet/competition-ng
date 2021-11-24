import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  classes = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve"
  ];
  houses = [
    "Chimbuk",
    "Bijoy",
    "Shajek"
  ];
  isLoading = false;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    this.isLoading = true;
    const value: Partial<Student> = form.value;

    const student: Partial<Student> = {
      ncpscId: value.id?.trim(),
      section: value.section?.trim(),
      house: value.house,
      class: value.class,
      name: value.name?.trim(),
      phone: value.phone?.trim(),
      email: value.email?.trim()
    };

    this.apiService.addStudent(student).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/students']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        
      }
    })
  }

}
