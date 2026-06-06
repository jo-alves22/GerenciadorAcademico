import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorRoutingModule } from './professor-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { ProfessorFormComponent } from './professor-form/professor-form.component';

@NgModule({
  declarations: [ProfessorListComponent, ProfessorFormComponent],
  imports: [CommonModule, ProfessorRoutingModule, SharedModule]
})
export class ProfessorModule {}
