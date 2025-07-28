import { z } from 'zod';

// Validação de CPF
export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
};

// Validação de CNPJ
export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  let digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

// Schema de validação para login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

// Schema de validação para registro de empresa
export const empresaSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  telefone: z.string().min(10, 'Telefone inválido'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  bairro: z.string().optional(),
  cnpj: z.string().refine(validateCNPJ, 'CNPJ inválido'),
  razao_social: z.string().min(2, 'Razão social é obrigatória'),
  descricao: z.string().optional(),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
  setor: z.string().min(2, 'Setor é obrigatório'),
});

// Schema de validação para registro de freelancer
export const freelancerSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  telefone: z.string().min(10, 'Telefone inválido'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  bairro: z.string().optional(),
  cpf: z.string().refine(validateCPF, 'CPF inválido'),
  profissao: z.string().min(2, 'Profissão é obrigatória'),
  experiencia: z.number().min(0, 'Experiência deve ser positiva'),
  portfolio_url: z.string().url('URL inválida').optional().or(z.literal('')),
  habilidades: z.array(z.string()).min(1, 'Selecione pelo menos uma habilidade'),
  preco_hora: z.number().min(1, 'Preço por hora deve ser maior que zero'),
  bio: z.string().optional(),
  linkedin_url: z.string().url('URL inválida').optional().or(z.literal('')),
  github_url: z.string().url('URL inválida').optional().or(z.literal('')),
});

// Schema de validação para projetos
export const projetoSchema = z.object({
  titulo: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
  descricao: z.string().min(20, 'Descrição deve ter pelo menos 20 caracteres'),
  categoria: z.string().min(2, 'Categoria é obrigatória'),
  orcamento_min: z.number().min(1, 'Orçamento mínimo deve ser maior que zero'),
  orcamento_max: z.number().min(1, 'Orçamento máximo deve ser maior que zero'),
  prazo: z.string().min(1, 'Prazo é obrigatório'),
  requisitos: z.array(z.string()).min(1, 'Adicione pelo menos um requisito'),
  modalidade: z.enum(['remoto', 'presencial', 'hibrido']),
});

// Schema de validação para candidaturas
export const candidaturaSchema = z.object({
  proposta: z.string().min(20, 'Proposta deve ter pelo menos 20 caracteres'),
  valor_proposto: z.number().min(1, 'Valor proposto deve ser maior que zero'),
  prazo_proposto: z.number().min(1, 'Prazo proposto deve ser maior que zero'),
});

// Schema de validação para avaliações
export const avaliacaoSchema = z.object({
  nota: z.number().min(1, 'Nota mínima é 1').max(5, 'Nota máxima é 5'),
  comentario: z.string().min(10, 'Comentário deve ter pelo menos 10 caracteres'),
});

// Schema de validação para recuperação de senha
export const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

// Categorias de projetos
export const categorias = [
  'Desenvolvimento Web',
  'Desenvolvimento Mobile',
  'Design Gráfico',
  'UI/UX Design',
  'Marketing Digital',
  'Redação e Copywriting',
  'Tradução',
  'Consultoria',
  'Fotografia',
  'Vídeo e Animação',
  'Outros'
];

// Habilidades disponíveis
export const habilidades = [
  'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'Vue.js', 'Angular', 'Next.js', 'PHP', 'Laravel',
  'UI/UX Design', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator',
  'Marketing Digital', 'SEO', 'Google Ads', 'Facebook Ads',
  'Copywriting', 'Redação', 'Tradução', 'WordPress',
  'E-commerce', 'Consultoria', 'Fotografia', 'Vídeo',
  'Excel', 'PowerBI', 'Análise de Dados'
];

// Cidades da região de Ribeirão Preto
export const cidades = [
  'Ribeirão Preto, SP',
  'Sertãozinho, SP',
  'Araraquara, SP',
  'São Carlos, SP',
  'Franca, SP',
  'Barretos, SP',
  'Jaboticabal, SP',
  'Batatais, SP',
  'Cravinhos, SP',
  'Serrana, SP'
];

// Setores empresariais
export const setores = [
  'Tecnologia',
  'Saúde',
  'Educação',
  'Varejo',
  'Indústria',
  'Agronegócio',
  'Serviços',
  'Construção',
  'Alimentício',
  'Financeiro',
  'Outros'
];