import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplinaListComponent } from './disciplina-list/disciplina-list.component';
import { DisciplinaFormComponent } from './disciplina-form/disciplina-form.component';

const routes: Routes = [
  { path: '', component: DisciplinaListComponent },
  { path: 'form', component: DisciplinaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplinaRoutingModule {}
