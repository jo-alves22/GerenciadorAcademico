import { Component, OnInit } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-matricula-list',
  templateUrl: './matricula-list.component.html',
  styleUrls: ['./matricula-list.component.scss']
})
export class MatriculaListComponent implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;

  matriculas: any[] = [];

  constructor(private readonly userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.listMatriculas();
  }

  async listMatriculas(): Promise<void> {
    this.matriculas = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/matriculas',
      params: {}
    });
  }

  situacaoBadge(situacao: string): string {
    const map: Record<string, string> = {
      CURSANDO:  'bg-primary',
      APROVADO:  'bg-success',
      REPROVADO: 'bg-danger',
      CANCELADO: 'bg-secondary',
    };
    return map[situacao] ?? 'bg-secondary';
  }

  async delete(id: string): Promise<void> {
    if (confirm('Deseja deletar esta matrícula?')) {
      await this.userService.delete<any>({
        url: `http://localhost:8080/api/matriculas/${id}`,
        params: {}
      });
      await this.listMatriculas();
    }
  }
}
