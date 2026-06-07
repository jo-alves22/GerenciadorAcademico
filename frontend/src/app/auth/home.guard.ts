import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class HomeGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isLogado()) {
      return this.router.createUrlTree(['/login']);
    }
    if (this.authService.isAdmin()) {
      return true;
    }
    if (this.authService.isProfessor()) {
      return this.router.createUrlTree(['/turmas']);
    }
    return this.router.createUrlTree(['/matriculas']);
  }
}
