import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required],
      }, { validators: this.compararSenhas })
    });
  }

  compararSenhas(fb: FormGroup) {
    const confirmaSenhaCtrl = fb.get('confirmPassword');

    if (confirmaSenhaCtrl.errors == null || 'mismatch' in confirmaSenhaCtrl.errors) {
      if (fb.get('password').value !== confirmaSenhaCtrl.value) {
        confirmaSenhaCtrl.setErrors({ mismatch: true });
      } else {
        confirmaSenhaCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign({password: this.registerForm.get('passwords.password').value}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.toastr.success('Cadastro Realizado Com Sucesso');
        }, error => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.warning('Já Existe um Usuário Com Esse User Cadastrado');
                break;  
              default:
                this.toastr.error(`Erro no Cadastro! CODE: ${element.code}`);
                break;
            }
          });
        }
      );
    }
  }

}
