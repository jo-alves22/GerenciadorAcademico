import { Component, OnInit } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-nota-list',
  templateUrl: './nota-list.component.html',
  styleUrls: ['./nota-list.component.scss']
})
export class NotaListComponent implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;

  notas: any[] = [];

  constructor(private readonly userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.listNotas();
  }

  async listNotas(): Promise<void> {
    this.notas = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/notas',
      params: {}
    });
  }

  situacaoMedia(media: number): string {
    if (media == null) return 'bg-secondary';
    if (media >= 7) return 'bg-success';
    if (media >= 5) return 'bg-warning text-dark';
    return 'bg-danger';
  }

  async delete(id: string): Promise<void> {
    if (confirm('Deseja deletar esta nota?')) {
      await this.userService.delete<any>({
        url: `http://localhost:8080/api/notas/${id}`,
        params: {}
      });
      await this.listNotas();
    }
  }
}
