import { Component, OnInit } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.scss']
})
export class ProfessorListComponent implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;

  professores: any[] = [];

  constructor(private readonly userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.listProfessores();
  }

  async listProfessores(): Promise<void> {
    this.professores = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/professores',
      params: {}
    });
  }

  async delete(id: string): Promise<void> {
    if (confirm('Deseja deletar este professor?')) {
      await this.userService.delete<any>({
        url: `http://localhost:8080/api/professores/${id}`,
        params: {}
      });
      await this.listProfessores();
    }
  }
}
