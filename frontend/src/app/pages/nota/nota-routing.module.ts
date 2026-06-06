import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotaListComponent } from './nota-list/nota-list.component';
import { NotaFormComponent } from './nota-form/nota-form.component';

const routes: Routes = [
  { path: '', component: NotaListComponent },
  { path: 'form', component: NotaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotaRoutingModule {}
