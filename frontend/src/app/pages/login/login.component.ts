import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';
  carregando = false;

  constructor(private authService: AuthService, private router: Router) {}

  async entrar(): Promise<void> {
    this.erro = '';
    this.carregando = true;
    try {
      await this.authService.login(this.email, this.senha);
      this.router.navigate(['/']);
    } catch {
      this.erro = 'E-mail ou senha inválidos.';
    } finally {
      this.carregando = false;
    }
  }
}
