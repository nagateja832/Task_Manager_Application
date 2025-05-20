import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  role = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSignup() {
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    };
    console.log('Signup', this.name, this.email, this.password);
    // this.router.navigate(['/login']);
    this.http.post('http://localhost:3001/api/auth/signup', payload).subscribe({
      next: (res) => {
        console.log('Signup success:', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup failed:', err);
        alert(err?.error?.error || 'Signup failed');
      },
    });
  }
}
