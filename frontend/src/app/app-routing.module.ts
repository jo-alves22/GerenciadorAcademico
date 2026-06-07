import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'cursos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/curso/curso.module').then((m) => m.CursoModule),
  },
  {
    path: 'disciplinas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/disciplina/disciplina.module').then((m) => m.DisciplinaModule),
  },
  {
    path: 'alunos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/aluno/aluno.module').then((m) => m.AlunoModule),
  },
  {
    path: 'professores',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/professor/professor.module').then((m) => m.ProfessorModule),
  },
  {
    path: 'turmas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/turma/turma.module').then((m) => m.TurmaModule),
  },
  {
    path: 'matriculas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/matricula/matricula.module').then((m) => m.MatriculaModule),
  },
  {
    path: 'notas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/nota/nota.module').then((m) => m.NotaModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
