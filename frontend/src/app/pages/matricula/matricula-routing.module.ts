import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatriculaListComponent } from './matricula-list/matricula-list.component';
import { MatriculaFormComponent } from './matricula-form/matricula-form.component';

const routes: Routes = [
  { path: '', component: MatriculaListComponent },
  { path: 'form', component: MatriculaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculaRoutingModule {}
