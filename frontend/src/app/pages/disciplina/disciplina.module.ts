import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplinaRoutingModule } from './disciplina-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DisciplinaListComponent } from './disciplina-list/disciplina-list.component';
import { DisciplinaFormComponent } from './disciplina-form/disciplina-form.component';

@NgModule({
  declarations: [DisciplinaListComponent, DisciplinaFormComponent],
  imports: [CommonModule, DisciplinaRoutingModule, SharedModule]
})
export class DisciplinaModule {}
