import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthToken } from '../../models/login';

@Component({
  selector: 'app-log-in-view',
  imports: [FormsModule],
  templateUrl: './log-in-view.html',
  styleUrl: './log-in-view.css'
})
@Injectable({providedIn: 'root'})
export class LogInView {

  private http = inject(HttpClient)

  username: string = '';
  password: string = '';
  is_authorized: boolean = true;

  constructor(
    private router: Router
  ) {}

  onLogIn() {
    this.http.post<AuthToken>("http://localhost:8080/api/v1/login", {
      username: this.username,
      password: this.password,
    }).pipe(first()).subscribe({
      next: token => {
        localStorage.setItem('authToken', token.token);
        this.router.navigate(['/transactions'])
      },
      error: e => {
        if (e.status == 401) {
          this.is_authorized = false;
          console.log("Incorrect username or password")
        }
      }
    })
  }

}
