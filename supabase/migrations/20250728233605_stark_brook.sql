/*
  # Schema inicial da plataforma FreelanceRP

  1. Tabelas principais
    - usuarios: dados básicos de autenticação
    - empresas: dados específicos de empresas
    - freelancers: dados específicos de freelancers
    - projetos: projetos publicados pelas empresas
    - candidaturas: candidaturas dos freelancers aos projetos
    - avaliacoes: sistema de avaliações entre usuários

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas de acesso baseadas no tipo de usuário
*/

-- Tabela de usuários base
CREATE TABLE IF NOT EXISTS usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  senha text NOT NULL,
  tipo text NOT NULL CHECK (tipo IN ('empresa', 'freelancer')),
  nome text NOT NULL,
  telefone text,
  cidade text NOT NULL DEFAULT 'Ribeirão Preto, SP',
  bairro text,
  ativo boolean DEFAULT true,
  email_verificado boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Tabela de empresas
CREATE TABLE IF NOT EXISTS empresas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  cnpj text UNIQUE NOT NULL,
  razao_social text NOT NULL,
  descricao text,
  website text,
  setor text,
  logo_url text,
  created_at timestamptz DEFAULT now()
);

-- Tabela de freelancers
CREATE TABLE IF NOT EXISTS freelancers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  cpf text UNIQUE NOT NULL,
  profissao text NOT NULL,
  experiencia integer DEFAULT 0,
  portfolio_url text,
  habilidades text[] DEFAULT '{}',
  preco_hora decimal(10,2),
  disponivel boolean DEFAULT true,
  bio text,
  avatar_url text,
  linkedin_url text,
  github_url text,
  created_at timestamptz DEFAULT now()
);

-- Tabela de projetos
CREATE TABLE IF NOT EXISTS projetos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id uuid REFERENCES empresas(id) ON DELETE CASCADE,
  titulo text NOT NULL,
  descricao text NOT NULL,
  categoria text NOT NULL,
  orcamento_min decimal(10,2),
  orcamento_max decimal(10,2),
  prazo date,
  status text DEFAULT 'ativo' CHECK (status IN ('ativo', 'em_andamento', 'concluido', 'cancelado')),
  requisitos text[] DEFAULT '{}',
  modalidade text DEFAULT 'remoto' CHECK (modalidade IN ('remoto', 'presencial', 'hibrido')),
  created_at timestamptz DEFAULT now()
);

-- Tabela de candidaturas
CREATE TABLE IF NOT EXISTS candidaturas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id uuid REFERENCES projetos(id) ON DELETE CASCADE,
  freelancer_id uuid REFERENCES freelancers(id) ON DELETE CASCADE,
  proposta text NOT NULL,
  valor_proposto decimal(10,2) NOT NULL,
  prazo_proposto integer NOT NULL,
  status text DEFAULT 'pendente' CHECK (status IN ('pendente', 'aceita', 'rejeitada')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(projeto_id, freelancer_id)
);

-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS avaliacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  avaliador_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  avaliado_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  projeto_id uuid REFERENCES projetos(id) ON DELETE CASCADE,
  nota integer NOT NULL CHECK (nota >= 1 AND nota <= 5),
  comentario text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(avaliador_id, avaliado_id, projeto_id)
);

-- Habilitar RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projetos ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacoes ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios
CREATE POLICY "Usuários podem ver próprios dados"
  ON usuarios FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprios dados"
  ON usuarios FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Políticas para empresas
CREATE POLICY "Empresas podem ver próprios dados"
  ON empresas FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Empresas podem atualizar próprios dados"
  ON empresas FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Empresas podem inserir próprios dados"
  ON empresas FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Políticas para freelancers
CREATE POLICY "Freelancers podem ver próprios dados"
  ON freelancers FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Todos podem ver freelancers públicos"
  ON freelancers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Freelancers podem atualizar próprios dados"
  ON freelancers FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Freelancers podem inserir próprios dados"
  ON freelancers FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Políticas para projetos
CREATE POLICY "Todos podem ver projetos ativos"
  ON projetos FOR SELECT
  TO authenticated
  USING (status = 'ativo');

CREATE POLICY "Empresas podem ver próprios projetos"
  ON projetos FOR SELECT
  TO authenticated
  USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));

CREATE POLICY "Empresas podem criar projetos"
  ON projetos FOR INSERT
  TO authenticated
  WITH CHECK (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));

CREATE POLICY "Empresas podem atualizar próprios projetos"
  ON projetos FOR UPDATE
  TO authenticated
  USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));

-- Políticas para candidaturas
CREATE POLICY "Freelancers podem ver próprias candidaturas"
  ON candidaturas FOR SELECT
  TO authenticated
  USING (freelancer_id IN (SELECT id FROM freelancers WHERE user_id = auth.uid()));

CREATE POLICY "Empresas podem ver candidaturas dos próprios projetos"
  ON candidaturas FOR SELECT
  TO authenticated
  USING (projeto_id IN (
    SELECT p.id FROM projetos p 
    JOIN empresas e ON p.empresa_id = e.id 
    WHERE e.user_id = auth.uid()
  ));

CREATE POLICY "Freelancers podem criar candidaturas"
  ON candidaturas FOR INSERT
  TO authenticated
  WITH CHECK (freelancer_id IN (SELECT id FROM freelancers WHERE user_id = auth.uid()));

CREATE POLICY "Empresas podem atualizar candidaturas dos próprios projetos"
  ON candidaturas FOR UPDATE
  TO authenticated
  USING (projeto_id IN (
    SELECT p.id FROM projetos p 
    JOIN empresas e ON p.empresa_id = e.id 
    WHERE e.user_id = auth.uid()
  ));

-- Políticas para avaliações
CREATE POLICY "Todos podem ver avaliações"
  ON avaliacoes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar avaliações"
  ON avaliacoes FOR INSERT
  TO authenticated
  WITH CHECK (avaliador_id = auth.uid());

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_tipo ON usuarios(tipo);
CREATE INDEX IF NOT EXISTS idx_empresas_user_id ON empresas(user_id);
CREATE INDEX IF NOT EXISTS idx_freelancers_user_id ON freelancers(user_id);
CREATE INDEX IF NOT EXISTS idx_freelancers_habilidades ON freelancers USING GIN(habilidades);
CREATE INDEX IF NOT EXISTS idx_projetos_empresa_id ON projetos(empresa_id);
CREATE INDEX IF NOT EXISTS idx_projetos_status ON projetos(status);
CREATE INDEX IF NOT EXISTS idx_projetos_categoria ON projetos(categoria);
CREATE INDEX IF NOT EXISTS idx_candidaturas_projeto_id ON candidaturas(projeto_id);
CREATE INDEX IF NOT EXISTS idx_candidaturas_freelancer_id ON candidaturas(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_avaliacoes_avaliado_id ON avaliacoes(avaliado_id);