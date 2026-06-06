import { Component, OnInit } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.scss']
})
export class AlunoListComponent implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;

  alunos: any[] = [];

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.listAlunos();
  }

  async listAlunos(): Promise<void> {
    this.alunos = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/alunos',
      params: {}
    });
  }

  async delete(id: number): Promise<void> {
    if (confirm('Deseja deletar este aluno?')) {
      await this.userService.delete<any>({
        url: `http://localhost:8080/api/alunos/${id}`,
        params: {}
      });
      await this.listAlunos();
    }
  }
}
