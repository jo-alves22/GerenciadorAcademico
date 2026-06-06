import { Component, OnInit } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.scss']
})
export class CursoListComponent implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;

  cursos: any[] = [];

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.listCursos();
  }

  async listCursos(): Promise<void> {
    this.cursos = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/cursos',
      params: {}
    });
  }

  async delete(id: number): Promise<void> {
    if (confirm('Deseja deletar este curso?')) {
      await this.userService.delete<any>({
        url: `http://localhost:8080/api/cursos/${id}`,
        params: {}
      });
      await this.listCursos();
    }
  }
}
