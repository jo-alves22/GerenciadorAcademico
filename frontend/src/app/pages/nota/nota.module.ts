import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaRoutingModule } from './nota-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NotaListComponent } from './nota-list/nota-list.component';
import { NotaFormComponent } from './nota-form/nota-form.component';

@NgModule({
  declarations: [NotaListComponent, NotaFormComponent],
  imports: [CommonModule, NotaRoutingModule, SharedModule]
})
export class NotaModule {}
