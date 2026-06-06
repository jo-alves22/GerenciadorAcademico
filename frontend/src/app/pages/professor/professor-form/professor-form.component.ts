import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.scss']
})
export class ProfessorFormComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    const usuarios = await this.userService.get<any[]>({
      url: 'http://localhost:8080/api/usuarios',
      params: {}
    });

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'usuarioId',
            type: 'select',
            props: {
              label: 'Usuário',
              required: true,
              options: usuarios.map((u: any) => ({ value: u.id, label: `${u.nome} (${u.tipo})` })),
            },
          },
          {
            key: 'registro',
            type: 'input',
            props: {
              label: 'Registro',
              placeholder: 'Ex: P2024001',
              required: true,
            },
          },
          {
            key: 'departamento',
            type: 'input',
            props: {
              label: 'Departamento',
              placeholder: 'Ex: Departamento de Computação',
            },
          },
          {
            key: 'titulacao',
            type: 'select',
            props: {
              label: 'Titulação',
              options: [
                { value: 'GRADUACAO',      label: 'Graduação' },
                { value: 'ESPECIALIZACAO', label: 'Especialização' },
                { value: 'MESTRADO',       label: 'Mestrado' },
                { value: 'DOUTORADO',      label: 'Doutorado' },
              ],
            },
          },
        ]
      }
    ];

    this.route.queryParams.subscribe(async (params: any) => {
      if (params.id) {
        const professor = await this.userService.get<any>({
          url: `http://localhost:8080/api/professores/${params.id}`,
          params: {}
        });
        this.model = { ...professor, usuarioId: professor.usuario?.id };
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
        usuario:     { id: this.model.usuarioId },
        registro:    this.model.registro,
        departamento: this.model.departamento,
        titulacao:   this.model.titulacao,
      };
      if (this.model?.id) {
        await this.userService.put<any>({
          url: `http://localhost:8080/api/professores/${this.model.id}`,
          params: {}, data: payload
        });
      } else {
        await this.userService.post<any>({
          url: 'http://localhost:8080/api/professores',
          params: {}, data: payload
        });
      }
      await this.router.navigate(['/professores']);
    } catch (error) {
      alert('Erro ao salvar professor. Verifique se o servidor está rodando.');
    }
  }
}
