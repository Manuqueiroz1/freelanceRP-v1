import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client para operações server-side
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Tipos do banco de dados
export interface Usuario {
  id: string;
  email: string;
  tipo: 'empresa' | 'freelancer';
  nome: string;
  telefone?: string;
  cidade: string;
  bairro?: string;
  ativo: boolean;
  email_verificado: boolean;
  created_at: string;
}

export interface Empresa {
  id: string;
  user_id: string;
  cnpj: string;
  razao_social: string;
  descricao?: string;
  website?: string;
  setor: string;
  logo_url?: string;
  created_at: string;
}

export interface Freelancer {
  id: string;
  user_id: string;
  cpf: string;
  profissao: string;
  experiencia: number;
  portfolio_url?: string;
  habilidades: string[];
  preco_hora: number;
  disponivel: boolean;
  bio?: string;
  avatar_url?: string;
  linkedin_url?: string;
  github_url?: string;
  created_at: string;
}

export interface Projeto {
  id: string;
  empresa_id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  orcamento_min: number;
  orcamento_max: number;
  prazo: string;
  status: 'ativo' | 'em_andamento' | 'concluido' | 'cancelado';
  requisitos: string[];
  modalidade: 'remoto' | 'presencial' | 'hibrido';
  created_at: string;
}

export interface Candidatura {
  id: string;
  projeto_id: string;
  freelancer_id: string;
  proposta: string;
  valor_proposto: number;
  prazo_proposto: number;
  status: 'pendente' | 'aceita' | 'rejeitada';
  created_at: string;
}

export interface Avaliacao {
  id: string;
  avaliador_id: string;
  avaliado_id: string;
  projeto_id: string;
  nota: number;
  comentario?: string;
  created_at: string;
}