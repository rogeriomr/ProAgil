import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  model: any = {};

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.authService.login(this.model).subscribe(() => {
      this.router.navigate(['/dashboard']);
      this.toastr.success('Logado com Sucesso');
    }, error => {
      this.toastr.error('Erro ao Tentar Efetuar o Login');
    });
  }

}
