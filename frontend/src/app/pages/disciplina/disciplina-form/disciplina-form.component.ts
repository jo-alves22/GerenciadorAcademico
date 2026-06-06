import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-disciplina-form',
  templateUrl: './disciplina-form.component.html',
  styleUrls: ['./disciplina-form.component.scss']
})
export class DisciplinaFormComponent {
  disciplina: any = {};
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.initForm();
  }

  async initForm(): Promise<void> {
    const cursos = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/cursos',
      params: {}
    });

    const cursoOptions = cursos.map((c: any) => ({ label: c.nome, value: c.id }));

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'nome',
            type: 'input',
            props: {
              label: 'Nome',
              placeholder: 'Nome da Disciplina',
              required: true,
            },
          },
          {
            key: 'codigo',
            type: 'input',
            props: {
              label: 'Código',
              placeholder: 'Código da Disciplina',
              required: true,
            },
          },
          {
            key: 'cargaHoraria',
            type: 'input',
            props: {
              label: 'Carga Horária (horas)',
              placeholder: 'Ex: 60',
              type: 'number',
              required: true,
            },
          },
          {
            key: 'cursoId',
            type: 'select',
            props: {
              label: 'Curso',
              placeholder: 'Selecione o Curso',
              required: true,
              options: cursoOptions,
            },
          },
        ]
      }
    ];

    this.route.queryParams.subscribe(async (params: any) => {
      if (params.id) {
        this.disciplina = await this.userService.get<any>({
          url: `http://localhost:8080/api/disciplinas/${params.id}`,
          params: {}
        });
        this.model = {
          ...this.disciplina,
          cursoId: this.disciplina.curso?.id
        };
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
      const payload = {
        nome: this.model.nome,
        codigo: this.model.codigo,
        cargaHoraria: this.model.cargaHoraria,
        curso: { id: this.model.cursoId }
      };

      if (this.model?.id) {
        await this.userService.put<any>({
          url: `http://localhost:8080/api/disciplinas/${this.model.id}`,
          params: {},
          data: payload
        });
      } else {
        await this.userService.post<any>({
          url: 'http://localhost:8080/api/disciplinas',
          params: {},
          data: payload
        });
      }
      await this.router.navigate(['/disciplinas']);
    } catch (error) {
      alert('Erro ao salvar disciplina. Verifique se o servidor está rodando.');
    }
  }
}
