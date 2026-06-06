import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoRoutingModule } from './curso-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CursoListComponent } from './curso-list/curso-list.component';
import { CursoFormComponent } from './curso-form/curso-form.component';

@NgModule({
  declarations: [CursoListComponent, CursoFormComponent],
  imports: [CommonModule, CursoRoutingModule, SharedModule]
})
export class CursoModule {}
