import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.scss']
})
export class TurmaFormComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    const [disciplinas, professores] = await Promise.all([
      this.userService.get<any[]>({ url: 'http://localhost:8080/api/disciplinas', params: {} }),
      this.userService.get<any[]>({ url: 'http://localhost:8080/api/professores', params: {} }),
    ]);

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'disciplinaId',
            type: 'select',
            props: {
              label: 'Disciplina',
              required: true,
              options: disciplinas.map((d: any) => ({ value: d.id, label: `${d.nome} (${d.codigo})` })),
            },
          },
          {
            key: 'professorId',
            type: 'select',
            props: {
              label: 'Professor',
              required: true,
              options: professores.map((p: any) => ({ value: p.id, label: p.usuario?.nome })),
            },
          },
          {
            key: 'periodo',
            type: 'input',
            props: {
              label: 'Período',
              placeholder: 'Ex: 2024.1',
              required: true,
            },
          },
          {
            key: 'ano',
            type: 'input',
            props: {
              label: 'Ano',
              type: 'number',
              placeholder: 'Ex: 2024',
              required: true,
            },
          },
          {
            key: 'vagas',
            type: 'input',
            props: {
              label: 'Vagas',
              type: 'number',
              placeholder: 'Ex: 30',
              required: true,
            },
          },
        ]
      }
    ];

    this.route.queryParams.subscribe(async (params: any) => {
      if (params.id) {
        const turma = await this.userService.get<any>({
          url: `http://localhost:8080/api/turmas/${params.id}`,
          params: {}
        });
        this.model = {
          ...turma,
          disciplinaId: turma.disciplina?.id,
          professorId:  turma.professor?.id,
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
        disciplina: { id: this.model.disciplinaId },
        professor:  { id: this.model.professorId },
        periodo:    this.model.periodo,
        ano:        this.model.ano,
        vagas:      this.model.vagas,
      };
      if (this.model?.id) {
        await this.userService.put<any>({
          url: `http://localhost:8080/api/turmas/${this.model.id}`,
          params: {}, data: payload
        });
      } else {
        await this.userService.post<any>({
          url: 'http://localhost:8080/api/turmas',
          params: {}, data: payload
        });
      }
      await this.router.navigate(['/turmas']);
    } catch (error) {
      alert('Erro ao salvar turma. Verifique se o servidor está rodando.');
    }
  }
}
