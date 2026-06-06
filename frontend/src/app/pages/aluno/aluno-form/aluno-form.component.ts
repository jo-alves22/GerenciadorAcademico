import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    const cursos = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/cursos',
      params: {}
    });

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'nome',
            type: 'input',
            props: {
              label: 'Nome',
              placeholder: 'Nome completo do aluno',
              required: true,
            },
          },
          {
            key: 'matricula',
            type: 'input',
            props: {
              label: 'Matrícula',
              placeholder: 'Número de matrícula',
              required: true,
            },
          },
          {
            key: 'cpf',
            type: 'input',
            props: {
              label: 'CPF',
              placeholder: '000.000.000-00',
              required: true,
            },
          },
          {
            key: 'email',
            type: 'input',
            props: {
              label: 'Email',
              placeholder: 'email@exemplo.com',
              required: true,
            },
          },
          {
            key: 'curso',
            type: 'select',
            props: {
              label: 'Curso',
              required: true,
              options: cursos.map((c: any) => ({ value: c, label: c.nome })),
              compareWith: (a: any, b: any) => a?.id === b?.id,
            },
          },
        ]
      }
    ];

    this.route.queryParams.subscribe(async (params: any) => {
      if (params.id) {
        const aluno = await this.userService.get<any>({
          url: `http://localhost:8080/api/alunos/${params.id}`,
          params: {}
        });
        this.model = { ...aluno };
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
          url: `http://localhost:8080/api/alunos/${this.model.id}`,
          params: {},
          data: this.model
        });
      } else {
        delete this.model?.id;
        await this.userService.post<any>({
          url: 'http://localhost:8080/api/alunos',
          params: {},
          data: this.model
        });
      }
      await this.router.navigate(['/alunos']);
    } catch (error) {
      alert('Erro ao salvar aluno. Verifique se o servidor está rodando.');
    }
  }
}
