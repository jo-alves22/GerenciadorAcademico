import { Component, OnInit } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.scss']
})
export class TurmaListComponent implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;

  turmas: any[] = [];

  constructor(private readonly userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.listTurmas();
  }

  async listTurmas(): Promise<void> {
    this.turmas = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/turmas',
      params: {}
    });
  }

  async delete(id: string): Promise<void> {
    if (confirm('Deseja deletar esta turma?')) {
      await this.userService.delete<any>({
        url: `http://localhost:8080/api/turmas/${id}`,
        params: {}
      });
      await this.listTurmas();
    }
  }
}
