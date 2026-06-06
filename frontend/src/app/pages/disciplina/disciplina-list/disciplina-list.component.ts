import { Component, OnInit } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-disciplina-list',
  templateUrl: './disciplina-list.component.html',
  styleUrls: ['./disciplina-list.component.scss']
})
export class DisciplinaListComponent implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;

  disciplinas: any[] = [];

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.listDisciplinas();
  }

  async listDisciplinas(): Promise<void> {
    this.disciplinas = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/disciplinas',
      params: {}
    });
  }

  async delete(id: number): Promise<void> {
    if (confirm('Deseja deletar esta disciplina?')) {
      await this.userService.delete<any>({
        url: `http://localhost:8080/api/disciplinas/${id}`,
        params: {}
      });
      await this.listDisciplinas();
    }
  }
}
