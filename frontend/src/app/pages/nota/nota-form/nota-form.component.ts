import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-nota-form',
  templateUrl: './nota-form.component.html',
  styleUrls: ['./nota-form.component.scss']
})
export class NotaFormComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    const matriculas = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/matriculas',
      params: {}
    });

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'matriculaId',
            type: 'select',
            props: {
              label: 'Matrícula',
              required: true,
              options: matriculas.map((m: any) => ({
                value: m.id,
                label: `${m.aluno?.usuario?.nome} — ${m.turma?.disciplina?.nome} (${m.turma?.periodo}/${m.turma?.ano})`,
              })),
            },
          },
          {
            key: 'nota1',
            type: 'input',
            props: {
              label: 'Nota 1',
              type: 'number',
              min: 0,
              max: 10,
              placeholder: '0.0',
            },
          },
          {
            key: 'nota2',
            type: 'input',
            props: {
              label: 'Nota 2',
              type: 'number',
              min: 0,
              max: 10,
              placeholder: '0.0',
            },
          },
          {
            key: 'nota3',
            type: 'input',
            props: {
              label: 'Nota 3',
              type: 'number',
              min: 0,
              max: 10,
              placeholder: '0.0',
            },
          },
          {
            key: 'frequencia',
            type: 'input',
            props: {
              label: 'Frequência (%)',
              type: 'number',
              min: 0,
              max: 100,
              placeholder: '0.0',
            },
          },
        ]
      }
    ];

    this.route.queryParams.subscribe(async (params: any) => {
      if (params.id) {
        const nota = await this.userService.get<any>({
          url: `http://localhost:8080/api/notas/${params.id}`,
          params: {}
        });
        this.model = { ...nota, matriculaId: nota.matricula?.id };
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
        matricula:  { id: this.model.matriculaId },
        nota1:      this.model.nota1,
        nota2:      this.model.nota2,
        nota3:      this.model.nota3,
        frequencia: this.model.frequencia,
      };
      if (this.model?.id) {
        await this.userService.put<any>({
          url: `http://localhost:8080/api/notas/${this.model.id}`,
          params: {}, data: payload
        });
      } else {
        await this.userService.post<any>({
          url: 'http://localhost:8080/api/notas',
          params: {}, data: payload
        });
      }
      await this.router.navigate(['/notas']);
    } catch (error) {
      alert('Erro ao salvar nota. Verifique se o servidor está rodando.');
    }
  }
}
