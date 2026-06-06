import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/user/user.module').then((module) => module.UserModule),
  },
  {
    path: 'cursos',
    loadChildren: () => import('./pages/curso/curso.module').then((module) => module.CursoModule),
  },
  {
    path: 'disciplinas',
    loadChildren: () => import('./pages/disciplina/disciplina.module').then((module) => module.DisciplinaModule),
  },
  {
    path: 'alunos',
    loadChildren: () => import('./pages/aluno/aluno.module').then((module) => module.AlunoModule),
  },
  {
    path: 'professores',
    loadChildren: () => import('./pages/professor/professor.module').then((module) => module.ProfessorModule),
  },
  {
    path: 'turmas',
    loadChildren: () => import('./pages/turma/turma.module').then((module) => module.TurmaModule),
  },
  {
    path: 'matriculas',
    loadChildren: () => import('./pages/matricula/matricula.module').then((module) => module.MatriculaModule),
  },
  {
    path: 'notas',
    loadChildren: () => import('./pages/nota/nota.module').then((module) => module.NotaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
