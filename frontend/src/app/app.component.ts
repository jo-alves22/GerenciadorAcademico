import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService, UsuarioLogado } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mostrarLayout = false;

  constructor(public authService: AuthService, private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.mostrarLayout = !e.url.startsWith('/login') && this.authService.isLogado();
      });
  }

  get usuario(): UsuarioLogado | null {
    return this.authService.getUsuario();
  }
}
