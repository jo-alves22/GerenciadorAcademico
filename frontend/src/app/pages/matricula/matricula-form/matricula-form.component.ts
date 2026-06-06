import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-matricula-form',
  templateUrl: './matricula-form.component.html',
  styleUrls: ['./matricula-form.component.scss']
})
export class MatriculaFormComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    const [alunos, turmas] = await Promise.all([
      this.userService.get<any[]>({ url: 'http://localhost:8080/api/alunos', params: {} }),
      this.userService.get<any[]>({ url: 'http://localhost:8080/api/turmas', params: {} }),
    ]);

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'alunoId',
            type: 'select',
            props: {
              label: 'Aluno',
              required: true,
              options: alunos.map((a: any) => ({
                value: a.id,
                label: `${a.matricula} - ${a.usuario?.nome}`,
              })),
            },
          },
          {
            key: 'turmaId',
            type: 'select',
            props: {
              label: 'Turma',
              required: true,
              options: turmas.map((t: any) => ({
                value: t.id,
                label: `${t.disciplina?.nome} - ${t.periodo}/${t.ano}`,
              })),
            },
          },
          {
            key: 'dataMatricula',
            type: 'input',
            props: {
              label: 'Data da Matrícula',
              type: 'date',
              required: true,
            },
          },
          {
            key: 'situacao',
            type: 'select',
            props: {
              label: 'Situação',
              required: true,
              options: [
                { value: 'CURSANDO',  label: 'Cursando' },
                { value: 'APROVADO',  label: 'Aprovado' },
                { value: 'REPROVADO', label: 'Reprovado' },
                { value: 'CANCELADO', label: 'Cancelado' },
              ],
            },
          },
        ]
      }
    ];

    this.route.queryParams.subscribe(async (params: any) => {
      if (params.id) {
        const matricula = await this.userService.get<any>({
          url: `http://localhost:8080/api/matriculas/${params.id}`,
          params: {}
        });
        this.model = {
          ...matricula,
          alunoId: matricula.aluno?.id,
          turmaId: matricula.turma?.id,
        };
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
        aluno:         { id: this.model.alunoId },
        turma:         { id: this.model.turmaId },
        dataMatricula: this.model.dataMatricula,
        situacao:      this.model.situacao,
      };
      if (this.model?.id) {
        await this.userService.put<any>({
          url: `http://localhost:8080/api/matriculas/${this.model.id}`,
          params: {}, data: payload
        });
      } else {
        await this.userService.post<any>({
          url: 'http://localhost:8080/api/matriculas',
          params: {}, data: payload
        });
      }
      await this.router.navigate(['/matriculas']);
    } catch (error) {
      alert('Erro ao salvar matrícula. Verifique se o servidor está rodando.');
    }
  }
}
