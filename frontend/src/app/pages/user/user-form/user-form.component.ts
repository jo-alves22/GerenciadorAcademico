import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  user: any = {};
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      className: 'd-flex align-content-center justify-content-center',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'nome',
          type: 'input',
          props: {
            label: 'Nome',
            placeholder: 'Nome completo',
            required: true,
          },
        },
        {
          key: 'email',
          type: 'input',
          props: {
            label: 'Email',
            placeholder: 'Email',
            required: true,
            type: 'email',
          },
        },
        {
          key: 'senhaHash',
          type: 'input',
          props: {
            label: 'Senha',
            placeholder: 'Senha',
            required: true,
            type: 'password',
          },
        },
        {
          key: 'tipo',
          type: 'select',
          props: {
            label: 'Tipo',
            placeholder: 'Tipo de usuário',
            required: true,
            options: [
              { label: 'Admin', value: 'ADMIN' },
              { label: 'Professor', value: 'PROFESSOR' },
              { label: 'Aluno', value: 'ALUNO' },
            ],
          },
        },
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.route.queryParams.subscribe(async (params: any) => {
      if (params.id !== undefined && params.id !== null) {
        this.user = await this.userService.get<any>({
          url: `http://localhost:8080/api/usuarios/${params.id}`,
          params: {}
        });
        this.model = this.user;
      } else {
        this.model = {};
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      if (this.model?.id !== undefined && this.model?.id !== null) {
        await this.userService.put<any>({
          url: `http://localhost:8080/api/usuarios/${this.model.id}`,
          params: {},
          data: this.model
        });
      } else {
        delete this.model?.id;
        await this.userService.post<any>({
          url: 'http://localhost:8080/api/usuarios',
          params: {},
          data: this.model
        });
      }
      await this.router.navigate(['/']);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      alert('Erro ao salvar usuário. Verifique se o servidor está rodando.');
    }
  }
}
