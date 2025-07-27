import { Company, Freelancer, Job, Application } from '../types';

// Mock data for messages and notifications
export const mockMessages = [
  {
    id: '1',
    fromId: '1',
    toId: '2',
    fromName: 'Tech Solutions Ribeirão',
    toName: 'Maria Santos',
    content: 'Olá Maria! Gostamos muito do seu perfil e gostaríamos de conversar sobre o projeto de e-commerce.',
    timestamp: new Date('2024-03-10T10:30:00'),
    read: false
  },
  {
    id: '2',
    fromId: '2',
    toId: '1',
    fromName: 'Maria Santos',
    toName: 'Tech Solutions Ribeirão',
    content: 'Olá! Muito obrigada pelo interesse. Estou disponível para conversar sobre o projeto.',
    timestamp: new Date('2024-03-10T11:15:00'),
    read: false
  },
  {
    id: '3',
    fromId: '1',
    toId: '2',
    fromName: 'Tech Solutions Ribeirão',
    toName: 'Maria Santos',
    content: 'Perfeito! Podemos agendar uma reunião para discutir os detalhes do projeto?',
    timestamp: new Date('2024-03-10T14:20:00'),
    read: false
  },
  {
    id: '4',
    fromId: '1',
    toId: '2',
    fromName: 'Tech Solutions Ribeirão',
    toName: 'Maria Santos',
    content: 'Que tal conversarmos amanhã às 14h? Podemos fazer uma videochamada.',
    timestamp: new Date('2024-03-10T15:30:00'),
    read: false
  },
  {
    id: '5',
    fromId: '2',
    toId: '1',
    fromName: 'Maria Santos',
    toName: 'Tech Solutions Ribeirão',
    content: 'Perfeito! Estarei disponível às 14h. Vou preparar algumas perguntas sobre o projeto.',
    timestamp: new Date('2024-03-10T16:00:00'),
    read: false
  }
];

export const mockNotifications = [
  {
    id: '1',
    userId: '2',
    type: 'application' as const,
    title: 'Nova oportunidade',
    message: 'Sua candidatura para "Desenvolvimento de E-commerce" foi visualizada',
    read: false,
    timestamp: new Date('2024-03-10T09:00:00')
  },
  {
    id: '2',
    userId: '1',
    type: 'application' as const,
    title: 'Nova candidatura',
    message: 'Maria Santos se candidatou para sua vaga',
    read: false,
    timestamp: new Date('2024-03-10T08:30:00')
  },
  {
    id: '3',
    userId: '2',
    type: 'message' as const,
    title: 'Nova mensagem',
    message: 'Tech Solutions Ribeirão enviou uma mensagem',
    read: false,
    timestamp: new Date('2024-03-10T14:20:00')
  },
  {
    id: '4',
    userId: '2',
    type: 'job_update' as const,
    title: 'Projeto atualizado',
    message: 'O status do projeto "E-commerce Platform" foi atualizado',
    read: true,
    timestamp: new Date('2024-03-09T10:15:00')
  },
  {
    id: '5',
    userId: '1',
    type: 'message' as const,
    title: 'Nova mensagem',
    message: 'Maria Santos respondeu sua mensagem',
    read: true,
    timestamp: new Date('2024-03-10T11:15:00')
  }
];

export const mockProjects = [
  {
    id: '1',
    jobId: '1',
    freelancerId: '2',
    companyId: '1',
    title: 'Desenvolvimento de E-commerce',
    description: 'Plataforma completa de e-commerce com sistema de pagamentos',
    status: 'active' as const,
    startDate: new Date('2024-03-01'),
    deadline: new Date('2024-05-15'),
    budget: 8000,
    progress: 65,
    milestones: [
      {
        id: '1',
        title: 'Setup inicial do projeto',
        description: 'Configuração do ambiente e estrutura base',
        completed: true,
        dueDate: new Date('2024-03-15')
      },
      {
        id: '2',
        title: 'Desenvolvimento do frontend',
        description: 'Interface do usuário e páginas principais',
        completed: true,
        dueDate: new Date('2024-04-01')
      },
      {
        id: '3',
        title: 'Integração de pagamentos',
        description: 'Sistema de pagamentos e checkout',
        completed: false,
        dueDate: new Date('2024-04-20')
      }
    ]
  }
];

export const mockReviews = [
  {
    id: '1',
    projectId: '1',
    fromId: '1',
    toId: '2',
    fromName: 'Tech Solutions Ribeirão',
    rating: 5,
    comment: 'Excelente profissional! Entregou o projeto no prazo e com qualidade excepcional. Comunicação clara e proativa durante todo o processo.',
    timestamp: new Date('2024-02-15')
  },
  {
    id: '2',
    projectId: '2',
    fromId: '3',
    toId: '2',
    fromName: 'StartupRP',
    rating: 4,
    comment: 'Muito bom trabalho no desenvolvimento da API. Código limpo e bem documentado.',
    timestamp: new Date('2024-01-20')
  }
];

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Tech Solutions Ribeirão',
    email: 'joao@techsolutions.com',
    type: 'company',
    companyName: 'Tech Solutions Ribeirão',
    cnpj: '12.345.678/0001-90',
    description: 'Empresa de tecnologia especializada em desenvolvimento de software',
    location: 'Ribeirão Preto, SP',
    employees: 25,
    website: 'https://techsolutions.com.br',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    brandColor: '#2563EB',
    secondaryColor: '#F59E0B',
    benefits: ['Vale Refeição', 'Plano de Saúde', 'Home Office', 'Horário Flexível'],
    createdAt: new Date('2024-01-15')
  }
];

export const mockFreelancers: Freelancer[] = [
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    type: 'freelancer',
    title: 'Desenvolvedora Full Stack',
    bio: 'Desenvolvedora com 5 anos de experiência em React, Node.js e Python. Especialista em desenvolvimento de aplicações web modernas e APIs RESTful.',
    skills: ['React', 'Node.js', 'Python', 'PostgreSQL', 'TypeScript', 'AWS'],
    hourlyRate: 80,
    experience: 5,
    location: 'Ribeirão Preto, SP',
    availability: 'available',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '(16) 99999-9999',
    linkedin: 'https://linkedin.com/in/mariasantos',
    github: 'https://github.com/mariasantos',
    portfolio: [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'Plataforma completa de e-commerce com React e Node.js',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        projectUrl: 'https://ecommerce-demo.com'
      }
    ],
    createdAt: new Date('2024-02-01')
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos@email.com',
    type: 'freelancer',
    title: 'Designer UI/UX',
    bio: 'Designer especializado em interfaces modernas e experiência do usuário. Trabalho com Figma, Adobe XD e prototipagem interativa.',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping', 'Design Systems'],
    hourlyRate: 65,
    experience: 4,
    location: 'Sertãozinho, SP',
    availability: 'available',
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '(16) 98888-8888',
    linkedin: 'https://linkedin.com/in/carlosoliveira',
    portfolio: [
      {
        id: '2',
        title: 'App Mobile Banking',
        description: 'Design completo de aplicativo bancário mobile',
        technologies: ['Figma', 'Design System', 'Mobile Design']
      }
    ],
    createdAt: new Date('2024-01-20')
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Desenvolvimento de E-commerce',
    description: 'Precisamos desenvolver uma plataforma de e-commerce completa com sistema de pagamentos, gestão de produtos e área administrativa.',
    companyId: '1',
    companyName: 'Tech Solutions Ribeirão',
    location: 'Ribeirão Preto, SP',
    workType: 'hybrid',
    budget: 8000,
    budgetType: 'fixed',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Payment Integration'],
    deadline: new Date('2024-05-15'),
    status: 'open',
    benefits: ['Vale Refeição R$ 600', 'Plano de Saúde', 'Bônus por Performance'],
    applicationsCount: 3,
    createdAt: new Date('2024-03-01')
  },
  {
    id: '2',
    title: 'Design de Interface para App Mobile',
    description: 'Criar design completo para aplicativo mobile de delivery, incluindo wireframes, protótipos e design system.',
    companyId: '1',
    companyName: 'Tech Solutions Ribeirão',
    location: 'Remoto',
    workType: 'remote',
    budget: 120,
    budgetType: 'hourly',
    requiredSkills: ['UI/UX Design', 'Figma', 'Mobile Design', 'Prototyping'],
    deadline: new Date('2024-04-30'),
    status: 'open',
    benefits: ['Horário Flexível', 'Mentoria Técnica'],
    applicationsCount: 5,
    createdAt: new Date('2024-03-05')
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    freelancerId: '2',
    freelancerName: 'Maria Santos',
    message: 'Tenho experiência sólida em desenvolvimento de e-commerce e já trabalhei com integração de pagamentos. Posso entregar o projeto no prazo estabelecido.',
    proposedRate: 7500,
    skillsMatch: 95,
    status: 'pending',
    appliedAt: new Date('2024-03-02')
  },
  {
    id: '2',
    jobId: '2',
    freelancerId: '3',
    freelancerName: 'Carlos Oliveira',
    message: 'Especialista em design de apps mobile com foco em UX. Tenho portfolio com projetos similares de delivery.',
    proposedRate: 110,
    skillsMatch: 90,
    status: 'pending',
    appliedAt: new Date('2024-03-06')
  }
];

export const cities = [
  'Ribeirão Preto, SP',
  'Sertãozinho, SP',
  'Araraquara, SP',
  'São Carlos, SP',
  'Franca, SP',
  'Barretos, SP',
  'Jaboticabal, SP',
  'Batatais, SP',
  'Remoto'
];

export const skillsOptions = [
  // Desenvolvimento Web
  'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'Vue.js', 'Angular', 'Next.js', 'Express.js', 'Django',
  'Flask', 'Laravel', 'PHP', 'Ruby on Rails', 'ASP.NET',
  
  // Design e UX/UI
  'UI/UX Design', 'Figma', 'Adobe XD', 'Sketch', 'Adobe Photoshop',
  'Adobe Illustrator', 'Adobe After Effects', 'Canva', 'InVision',
  'Design Systems', 'Prototyping', 'Mobile Design', 'Web Design',
  
  // Banco de Dados
  'PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis',
  'Firebase', 'Supabase', 'Oracle', 'SQL Server',
  
  // Cloud e DevOps
  'AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes',
  'Jenkins', 'GitLab CI/CD', 'Terraform', 'Vercel', 'Netlify',
  
  // Mobile
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic',
  'Xamarin', 'Android Development', 'iOS Development',
  
  // Inteligência Artificial e Machine Learning
  'ChatGPT', 'Claude AI', 'Midjourney', 'Stable Diffusion',
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI API',
  'Machine Learning', 'Deep Learning', 'Computer Vision',
  'Natural Language Processing', 'Data Science', 'Pandas',
  
  // Ferramentas de Escritório e Produtividade
  'Microsoft Office', 'Excel Avançado', 'PowerPoint', 'Word',
  'Google Workspace', 'Google Sheets', 'Google Docs', 'Notion',
  'Trello', 'Asana', 'Monday.com', 'Slack', 'Microsoft Teams',
  
  // Marketing Digital e SEO
  'Google Analytics', 'Google Ads', 'Facebook Ads', 'Instagram Ads',
  'SEO', 'SEM', 'Content Marketing', 'Email Marketing',
  'Social Media Management', 'Copywriting', 'WordPress',
  
  // E-commerce e Pagamentos
  'Shopify', 'WooCommerce', 'Magento', 'PrestaShop',
  'Payment Integration', 'Stripe', 'PayPal', 'PagSeguro',
  'Mercado Pago', 'E-commerce', 'Dropshipping',
  
  // Outras Tecnologias
  'GraphQL', 'REST API', 'API Development', 'Microservices',
  'Blockchain', 'Web3', 'Solidity', 'Git', 'GitHub',
  'Testing', 'Jest', 'Cypress', 'Selenium', 'Quality Assurance',
  
  // Habilidades de Negócio
  'Project Management', 'Scrum', 'Agile', 'Business Analysis',
  'Data Analysis', 'Financial Modeling', 'CRM', 'ERP',
  'Customer Service', 'Sales', 'Lead Generation'
];