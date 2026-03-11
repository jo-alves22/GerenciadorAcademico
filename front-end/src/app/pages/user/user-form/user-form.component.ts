import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../user.service";
import { HttpClient} from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

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
  fileInput: File | null = null;
  fileSelected?: Blob;
  url: SafeResourceUrl | undefined;

  user: any = {};
  model: any = {};
  form = new FormGroup({});

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
    private userService: UserService,
    private http: HttpClient,
    private domSanitizer: DomSanitizer
  ) {
    this.route.queryParams.subscribe(async (params: any) => {
      if (params.id !== undefined && params.id !== null) {
        this.user = await this.userService.get<any>({
          url: `http://localhost:3000/user/${params.id}`,
          params: {}
        });
        this.model = this.user;
        this.getImage('http://localhost:3000/userImage/' + this.model.id).subscribe(x => this.url = x)
      } else {
        this.model = {};
      }
    });
  }

  getImage(url : string): Observable<SafeResourceUrl> {
    return this.http.get(
      url, { responseType: 'blob' }
    ).pipe(
      map(
        x => {
          const urlToBlob = window.URL.createObjectURL(x);
          return this.domSanitizer.bypassSecurityTrustResourceUrl(urlToBlob);
        }
      )
    );
  }

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

  async onSubmit(fileInput: FileList | null): Promise<void> {
    if (!fileInput || fileInput.length === 0) {
      // Handle no file selected
      return;
    }

    let file = fileInput[0];
    let formData = new FormData();
    formData.append('first_name', this.model.first_name);
    formData.append('last_name', this.model.last_name);
    formData.append('email', this.model.email);
    formData.append('gender', this.model.gender);
    formData.append('file', file);

    if (this.form.valid) {
      try {
        if (this.model?.id !== undefined && this.model?.id !== null) {
          this.user = await this.userService.put<any>({
            url: `http://localhost:3000/updateUser/${this.model?.id}`,
            params: {},
            data: formData
          });
          console.log('Usuário atualizado com sucesso:', this.user);
        } else {
          delete this.model?.id;
          const result = await this.userService.post<any>({
            url: `http://localhost:3000/addUser`,
            params: {},
            data: formData
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
