import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../user.service";

export const GENDERS = [
  { label: 'Homem', value: 'male' },
  { label: 'Mulher', value: 'feme' },
  { label: 'Outro', value: 'other' }
];
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  user: any = {};
  model: any = {};
  form = new FormGroup({});
  url: string = '';

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      className: 'd-flex align-content-center justify-content-center',
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'first_name',
          type: 'input',
          props: {
            label: 'Nome',
            placeholder: 'Primeiro Nome',
            required: true,
          },
        },
        {
          key: 'last_name',
          type: 'input',
          props: {
            label: 'Sobrenome',
            placeholder: 'Nome da Família',
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
          },
        },
        {
          key: 'gender',
          type: 'select',
          props: {
            label: 'Genero',
            placeholder: 'Genero',
            required: true,
            options: GENDERS,
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
          url: `http://localhost:3000/user/${params.id}`,
          params: {}
        });
        this.model = this.user;
      } else {
        this.model = {};
      }
    });
  }

  // image preview/download not implemented on backend yet

  onSelectNewFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      try {
        if (this.model?.id !== undefined && this.model?.id !== null) {
          this.user = await this.userService.put<any>({
            url: `http://localhost:3000/updateUser/${this.model?.id}`,
            params: {},
            data: this.model
          });
          console.log('Usuário atualizado com sucesso:', this.user);
        } else {
          delete this.model?.id;
          const result = await this.userService.post<any>({
            url: `http://localhost:3000/addUser`,
            params: {},
            data: this.model
          });
          console.log('Usuário criado com sucesso:', result);
        }
        await this.router.navigate(['/users']);
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        alert('Erro ao salvar o usuário. Verifique o console para mais detalhes.');
      }
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
