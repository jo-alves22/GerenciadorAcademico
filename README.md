# Gerenciador Acadêmico

Sistema web para gestão acadêmica com controle de alunos, professores, turmas, matrículas e notas. Possui controle de acesso por perfil de usuário (Admin, Professor, Aluno).

---

## Tecnologias

### Backend
- Java 17
- Spring Boot 3.0.1
- Spring Data JPA / Hibernate
- MySQL 8
- Lombok
- Maven

### Frontend
- Angular 15
- Bootstrap 5
- NGX Formly
- Angular FontAwesome
- Axios
- ng-bootstrap

---

## Estrutura do Projeto

```
GerenciadorAcademico/
├── backend/               # API REST — Spring Boot
│   └── src/main/java/br/com/gerenciadoracademico/
│       ├── controller/    # Endpoints REST
│       ├── entity/        # Entidades JPA
│       ├── repository/    # Repositórios Spring Data
│       ├── service/       # Regras de negócio
│       └── enums/         # TipoUsuario, StatusAluno, SituacaoMatricula, Titulacao
├── frontend/              # SPA — Angular 15
│   └── src/app/
│       ├── auth/          # AuthService, AuthGuard, HomeGuard
│       └── pages/         # aluno, nota, matricula, turma, curso, disciplina, professor, user, login
├── docker-compose.yml     # Orquestração completa (MySQL + backend + frontend)
└── seed.sql               # Dados iniciais de exemplo
```

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|-----------|---------------|
| Docker + Docker Compose | 20+ |
| Java JDK *(dev local)* | 17 |
| Node.js *(dev local)* | 18+ |
| Angular CLI *(dev local)* | 15 |

---

## Como Executar

### Opção 1 — Docker Compose (recomendado)

Sobe o banco de dados, o backend e o frontend de uma vez:

```bash
docker compose up --build
```

| Serviço  | URL                       |
|----------|---------------------------|
| Frontend | http://localhost:4200     |
| Backend  | http://localhost:8080     |
| MySQL    | localhost:3306            |

Para parar:

```bash
docker compose down
```

Para parar e remover os dados do banco:

```bash
docker compose down -v
```

---

### Opção 2 — Desenvolvimento local

#### 1. Banco de dados

Suba apenas o MySQL via Docker:

```bash
docker compose up mysql -d
```

Ou aponte para uma instância MySQL já existente ajustando o `application.properties`.

#### 2. Backend

```bash
cd backend
./mvnw spring-boot:run
```

A API ficará disponível em `http://localhost:8080`.

#### 3. Frontend

```bash
cd frontend
npm install
npm start
```

O app ficará disponível em `http://localhost:4200`.

---

## Dados Iniciais (Seed)

Para popular o banco com dados de exemplo, execute o script `seed.sql` contra o banco `academicdb`:

```bash
mysql -h 127.0.0.1 -u root -p1q2w3e4r5t academicdb < seed.sql
```

### Usuários de exemplo

| Perfil    | E-mail                          | Senha    |
|-----------|---------------------------------|----------|
| Admin     | admin@academico.com             | admin123 |
| Professor | carlos.silva@academico.com      | prof123  |
| Professor | ana.souza@academico.com         | prof123  |
| Aluno     | joao.santos@academico.com       | aluno123 |
| Aluno     | maria.costa@academico.com       | aluno123 |
| Aluno     | pedro.lima@academico.com        | aluno123 |

---

## Perfis de Acesso

| Funcionalidade       | Admin | Professor | Aluno |
|----------------------|:-----:|:---------:|:-----:|
| Gestão de usuários   | ✓     |           |       |
| Gestão de cursos     | ✓     |           |       |
| Gestão de disciplinas| ✓     |           |       |
| Gestão de professores| ✓     |           |       |
| Gestão de alunos     | ✓     |           |       |
| Turmas               | ✓     | ✓         |       |
| Matrículas           | ✓     |           | ✓ (próprias) |
| Notas                | ✓     | ✓         | ✓ (próprias) |

- **Admin** acessa todos os módulos e é redirecionado para Gestão de Usuários ao logar.
- **Professor** é redirecionado para Turmas ao logar.
- **Aluno** é redirecionado para suas Matrículas ao logar e visualiza apenas seus próprios dados.

---

## API — Endpoints Principais

Base URL: `http://localhost:8080`

### Autenticação
| Método | Rota             | Descrição          |
|--------|------------------|--------------------|
| POST   | /api/auth/login  | Login do usuário   |

**Body:**
```json
{ "email": "admin@academico.com", "senha": "admin123" }
```

**Resposta:**
```json
{ "id": "...", "nome": "Administrador", "email": "...", "tipo": "ADMIN", "alunoId": null }
```

---

### Alunos — `/api/alunos`
| Método | Rota                  | Descrição              |
|--------|-----------------------|------------------------|
| GET    | /api/alunos           | Listar todos           |
| GET    | /api/alunos/{id}      | Buscar por ID          |
| POST   | /api/alunos           | Criar aluno            |
| PUT    | /api/alunos/{id}      | Atualizar aluno        |
| DELETE | /api/alunos/{id}      | Remover aluno          |

### Matrículas — `/api/matriculas`
| Método | Rota                              | Descrição                     |
|--------|-----------------------------------|-------------------------------|
| GET    | /api/matriculas                   | Listar todas                  |
| GET    | /api/matriculas/{id}              | Buscar por ID                 |
| GET    | /api/matriculas/aluno/{alunoId}   | Listar por aluno              |
| GET    | /api/matriculas/turma/{turmaId}   | Listar por turma              |
| POST   | /api/matriculas                   | Criar matrícula               |
| PUT    | /api/matriculas/{id}              | Atualizar situação            |
| DELETE | /api/matriculas/{id}              | Remover matrícula             |

### Notas — `/api/notas`
| Método | Rota                          | Descrição                   |
|--------|-------------------------------|-----------------------------|
| GET    | /api/notas                    | Listar todas                |
| GET    | /api/notas/{id}               | Buscar por ID               |
| GET    | /api/notas/aluno/{alunoId}    | Listar notas de um aluno    |
| GET    | /api/notas/matricula/{id}     | Buscar por matrícula        |
| POST   | /api/notas                    | Lançar nota                 |
| PUT    | /api/notas/{id}               | Atualizar nota              |
| DELETE | /api/notas/{id}               | Remover nota                |

> A média final é calculada automaticamente pelo backend: `(nota1 + nota2 + nota3) / 3`.

### Outros recursos
- `GET|POST|PUT|DELETE /api/usuarios`
- `GET|POST|PUT|DELETE /api/cursos`
- `GET|POST|PUT|DELETE /api/disciplinas`
- `GET|POST|PUT|DELETE /api/professores`
- `GET|POST|PUT|DELETE /api/turmas`

---

## Configuração do Banco de Dados

O arquivo `backend/src/main/resources/application.properties` possui três perfis comentados:

```properties
# Docker Compose (padrão)
spring.datasource.url=jdbc:mysql://host.docker.internal:3306/academicdb?autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true

# Localhost direto
# spring.datasource.url=jdbc:mysql://0.0.0.0:3306/academicdb

# AWS RDS
# spring.datasource.url=jdbc:mysql://<host>.rds.amazonaws.com:3306/academicdb
```

O schema é gerado automaticamente pelo Hibernate (`ddl-auto=update`).
