import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent {
  curso: any = {};
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'nome',
          type: 'input',
          props: {
            label: 'Nome',
            placeholder: 'Nome do Curso',
            required: true,
          },
        },
        {
          key: 'codigo',
          type: 'input',
          props: {
            label: 'Código',
            placeholder: 'Código do Curso',
            required: true,
          },
        },
        {
          key: 'cargaHoraria',
          type: 'input',
          props: {
            label: 'Carga Horária (horas)',
            placeholder: 'Ex: 3600',
            required: true,
            type: 'number',
          },
        },
        {
          key: 'descricao',
          type: 'textarea',
          props: {
            label: 'Descrição',
            placeholder: 'Descrição do curso',
            rows: 3,
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
      if (params.id) {
        this.curso = await this.userService.get<any>({
          url: `http://localhost:8080/api/cursos/${params.id}`,
          params: {}
        });
        this.model = this.curso;
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
      if (this.model?.id) {
        await this.userService.put<any>({
          url: `http://localhost:8080/api/cursos/${this.model.id}`,
          params: {},
          data: this.model
        });
      } else {
        delete this.model?.id;
        await this.userService.post<any>({
          url: 'http://localhost:8080/api/cursos',
          params: {},
          data: this.model
        });
      }
      await this.router.navigate(['/cursos']);
    } catch (error) {
      alert('Erro ao salvar curso. Verifique se o servidor está rodando.');
    }
  }
}
