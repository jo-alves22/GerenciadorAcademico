import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

export type TipoUsuario = 'ADMIN' | 'PROFESSOR' | 'ALUNO';

export interface UsuarioLogado {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  alunoId?: string;
}

const STORAGE_KEY = 'usuario_logado';
const API_URL = 'http://localhost:8080/api/auth/login';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly router: Router) {}

  async login(email: string, senha: string): Promise<void> {
    const response = await axios.post<UsuarioLogado>(API_URL, { email, senha });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  getUsuario(): UsuarioLogado | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  isLogado(): boolean {
    return this.getUsuario() !== null;
  }

  getTipo(): TipoUsuario | null {
    return this.getUsuario()?.tipo ?? null;
  }

  isAdmin(): boolean {
    return this.getTipo() === 'ADMIN';
  }

  isProfessor(): boolean {
    return this.getTipo() === 'PROFESSOR';
  }

  isAluno(): boolean {
    return this.getTipo() === 'ALUNO';
  }
}
