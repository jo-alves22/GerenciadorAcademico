import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoRoutingModule } from './aluno-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';

@NgModule({
  declarations: [AlunoListComponent, AlunoFormComponent],
  imports: [CommonModule, AlunoRoutingModule, SharedModule]
})
export class AlunoModule {}
