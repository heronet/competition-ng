import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { AuthData } from './models/authData';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  authStatusSubscription: Subscription | null = null;
  adminStatusSubscription: Subscription | null = null;
  
  isAuthenticated = false;
  isAdmin = false;
  isLoading = false;
  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.authStatusSubscription = this.apiService.isAuthenticated$.subscribe(auth => {
       this.isAuthenticated = auth;
      //  this.router.navigateByUrl("/auth");
    });
    this.adminStatusSubscription = this.apiService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.setupUser();
  }
  setupUser() {
    this.isLoading = true;
    let userData = JSON.parse(localStorage.getItem('authData')!) as AuthData
    if(userData) {
      this.apiService.emitOldAuthData(userData); // For TokenInterceptor and Refresh token.
      this.apiService.refrestToken(userData).pipe(take(1))
      .subscribe((newAuthData) => {
        this.apiService.saveUserLocal(newAuthData); // Save minimal data.
        this.apiService.setUser(newAuthData); // Emit full authData.
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
        this.apiService.setUser(null);
        localStorage.removeItem('authData');
        this.router.navigateByUrl('/auth');
      });
    } else {
      this.isLoading = false;
      this.router.navigateByUrl('/auth') // No feature is available without logging in.
      console.log("No user data");
      
    }
  }
  onLogout() {
    this.apiService.logout();
    this.router.navigateByUrl("/auth");
  }
  ngOnDestroy() {
    this.authStatusSubscription?.unsubscribe();
    this.adminStatusSubscription?.unsubscribe();
  }
}
