import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/user/login']);
  }

  loggedin() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.success('Deslogado');
    this.router.navigate(['/user/login']);
  }

  showMenu() {
    return this.router.url !== '/user/login';
  }

  userName() {
    return sessionStorage.getItem('username');
  }

}
