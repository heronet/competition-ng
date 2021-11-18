import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit({ value }: NgForm) {
    const data:Login = {
      email: value.email,
      password: value.password
    };
    this.apiService.login(data).subscribe({
      next: () => {
        this.router.navigateByUrl("/");
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }
} 
