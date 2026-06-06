import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatriculaRoutingModule } from './matricula-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatriculaListComponent } from './matricula-list/matricula-list.component';
import { MatriculaFormComponent } from './matricula-form/matricula-form.component';

@NgModule({
  declarations: [MatriculaListComponent, MatriculaFormComponent],
  imports: [CommonModule, MatriculaRoutingModule, SharedModule]
})
export class MatriculaModule {}
