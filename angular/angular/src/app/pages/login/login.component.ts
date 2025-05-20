import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http
      .post<any>('http://localhost:3001/api/auth/login', loginData)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token); 
          this.router.navigate(['/task']); 
        },
        error: (err) => {
          this.error = err.error?.error || 'Login failed';
        },
      });
  }
}
