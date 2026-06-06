-- =============================================================
-- SEED - GerenciadorAcademico
-- Ordem respeitando dependências de FK
-- =============================================================

USE academicdb;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE notas;
TRUNCATE TABLE matriculas;
TRUNCATE TABLE turmas;
TRUNCATE TABLE alunos;
TRUNCATE TABLE disciplinas;
TRUNCATE TABLE professores;
TRUNCATE TABLE cursos;
TRUNCATE TABLE usuarios;
SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- 1. USUARIOS
-- =============================================================

SET @admin_id        = UUID();
SET @prof_carlos_id  = UUID();
SET @prof_ana_id     = UUID();
SET @aluno_joao_id   = UUID();
SET @aluno_maria_id  = UUID();
SET @aluno_pedro_id  = UUID();

INSERT INTO usuarios (id, nome, email, senha_hash, tipo) VALUES
  (@admin_id,       'Administrador',  'admin@academico.com',        'admin123',    'ADMIN'),
  (@prof_carlos_id, 'Carlos Silva',   'carlos.silva@academico.com', 'prof123',     'PROFESSOR'),
  (@prof_ana_id,    'Ana Souza',      'ana.souza@academico.com',    'prof123',     'PROFESSOR'),
  (@aluno_joao_id,  'João Santos',    'joao.santos@academico.com',  'aluno123',    'ALUNO'),
  (@aluno_maria_id, 'Maria Costa',    'maria.costa@academico.com',  'aluno123',    'ALUNO'),
  (@aluno_pedro_id, 'Pedro Lima',     'pedro.lima@academico.com',   'aluno123',    'ALUNO');

-- =============================================================
-- 2. CURSOS
-- =============================================================

SET @curso_cc_id = UUID();
SET @curso_si_id = UUID();

INSERT INTO cursos (id, nome, codigo, descricao, carga_horaria, ativo) VALUES
  (@curso_cc_id, 'Ciência da Computação',  'CC001', 'Bacharelado em Ciência da Computação com foco em fundamentos teóricos e práticos.',  3600, true),
  (@curso_si_id, 'Sistemas de Informação', 'SI001', 'Bacharelado em Sistemas de Informação com foco em gestão e tecnologia.', 3200, true);

-- =============================================================
-- 3. PROFESSORES
-- =============================================================

SET @professor_carlos_id = UUID();
SET @professor_ana_id    = UUID();

INSERT INTO professores (id, usuario_id, registro, departamento, titulacao) VALUES
  (@professor_carlos_id, @prof_carlos_id, 'P2024001', 'Departamento de Computação',  'DOUTORADO'),
  (@professor_ana_id,    @prof_ana_id,    'P2024002', 'Departamento de Matemática',   'MESTRADO');

-- =============================================================
-- 4. DISCIPLINAS
-- =============================================================

SET @disc_poo_id  = UUID();
SET @disc_bd_id   = UUID();
SET @disc_cal_id  = UUID();

INSERT INTO disciplinas (id, curso_id, nome, codigo, creditos, carga_horaria) VALUES
  (@disc_poo_id,  @curso_cc_id, 'Programação Orientada a Objetos', 'POO001', 4, 60),
  (@disc_bd_id,   @curso_cc_id, 'Banco de Dados',                  'BD001',  4, 60),
  (@disc_cal_id,  @curso_si_id, 'Cálculo I',                       'CAL001', 6, 90);

-- =============================================================
-- 5. ALUNOS
-- =============================================================

SET @aluno_joao_reg_id  = UUID();
SET @aluno_maria_reg_id = UUID();
SET @aluno_pedro_reg_id = UUID();

INSERT INTO alunos (id, usuario_id, curso_id, matricula, data_ingresso, status) VALUES
  (@aluno_joao_reg_id,  @aluno_joao_id,  @curso_cc_id, '2024001', '2024-02-01', 'ATIVO'),
  (@aluno_maria_reg_id, @aluno_maria_id, @curso_cc_id, '2024002', '2024-02-01', 'ATIVO'),
  (@aluno_pedro_reg_id, @aluno_pedro_id, @curso_si_id, '2024003', '2024-02-01', 'ATIVO');

-- =============================================================
-- 6. TURMAS
-- =============================================================

SET @turma_poo_id = UUID();
SET @turma_bd_id  = UUID();
SET @turma_cal_id = UUID();

INSERT INTO turmas (id, disciplina_id, professor_id, periodo, ano, vagas) VALUES
  (@turma_poo_id, @disc_poo_id, @professor_carlos_id, '2024.1', 2024, 30),
  (@turma_bd_id,  @disc_bd_id,  @professor_ana_id,    '2024.1', 2024, 25),
  (@turma_cal_id, @disc_cal_id, @professor_ana_id,    '2024.1', 2024, 35);

-- =============================================================
-- 7. MATRICULAS
-- =============================================================

SET @mat_joao_poo_id  = UUID();
SET @mat_joao_bd_id   = UUID();
SET @mat_maria_poo_id = UUID();
SET @mat_pedro_cal_id = UUID();

INSERT INTO matriculas (id, aluno_id, turma_id, data_matricula, situacao) VALUES
  (@mat_joao_poo_id,  @aluno_joao_reg_id,  @turma_poo_id, '2024-02-05', 'CURSANDO'),
  (@mat_joao_bd_id,   @aluno_joao_reg_id,  @turma_bd_id,  '2024-02-05', 'CURSANDO'),
  (@mat_maria_poo_id, @aluno_maria_reg_id, @turma_poo_id, '2024-02-05', 'APROVADO'),
  (@mat_pedro_cal_id, @aluno_pedro_reg_id, @turma_cal_id, '2024-02-05', 'CURSANDO');

-- =============================================================
-- 8. NOTAS
-- =============================================================

INSERT INTO notas (id, matricula_id, nota_1, nota_2, nota_3, media_final, frequencia) VALUES
  (UUID(), @mat_joao_poo_id,  8.00, 7.50, 9.00, 8.17, 90.00),
  (UUID(), @mat_joao_bd_id,   6.50, 7.00, 8.50, 7.33, 85.00),
  (UUID(), @mat_maria_poo_id, 9.50, 8.00, 9.00, 8.83, 95.00),
  (UUID(), @mat_pedro_cal_id, 5.00, 6.00, 7.00, 6.00, 78.00);

-- =============================================================
SELECT 'Seed concluído com sucesso!' AS status;
