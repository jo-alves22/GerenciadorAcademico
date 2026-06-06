import { Component, OnInit } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;

  users: any[] = [];

  constructor(private readonly userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.listUsers();
  }

  async listUsers(): Promise<void> {
    this.users = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/usuarios',
      params: {}
    });
  }

  async delete(id: string): Promise<void> {
    if (confirm('Deseja deletar este usuário?')) {
      await this.userService.delete<any>({
        url: `http://localhost:8080/api/usuarios/${id}`,
        params: {}
      });
      await this.listUsers();
    }
  }
}
