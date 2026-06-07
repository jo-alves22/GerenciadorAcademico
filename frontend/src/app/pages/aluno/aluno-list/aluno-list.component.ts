import { Component, OnInit } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../auth/auth.service';
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

  constructor(
    private readonly userService: UserService,
    readonly authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.listAlunos();
  }

  async listAlunos(): Promise<void> {
    const alunoId = this.authService.getUsuario()?.alunoId;
    if (alunoId) {
      const aluno = await this.userService.get<any>({
        url: `http://localhost:8080/api/alunos/${alunoId}`,
        params: {}
      });
      this.alunos = [aluno];
    } else {
      this.alunos = await this.userService.get<any[]>({
        url: 'http://localhost:8080/api/alunos',
        params: {}
      });
    }
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
