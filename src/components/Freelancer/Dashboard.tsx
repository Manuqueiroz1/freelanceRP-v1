import React from 'react';
import { TrendingUp, DollarSign, Clock, Star, Eye, MessageSquare } from 'lucide-react';

export const FreelancerDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Projetos Ativos',
      value: '3',
      change: '+1 este mês',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Candidaturas Enviadas',
      value: '12',
      change: '+4 esta semana',
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: 'Faturamento Mensal',
      value: 'R$ 8.400',
      change: '+15% vs mês passado',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Avaliação Média',
      value: '4.9',
      change: '23 avaliações',
      icon: Star,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  const recommendedJobs = [
    {
      title: 'Desenvolvimento de E-commerce',
      company: 'Tech Solutions Ribeirão',
      budget: 'R$ 8.000',
      match: 95,
      location: 'Ribeirão Preto, SP',
      workType: 'Híbrido',
      postedAt: '2 horas atrás'
    },
    {
      title: 'API REST para Mobile App',
      company: 'StartupRP',
      budget: 'R$ 120/hora',
      match: 88,
      location: 'Remoto',
      workType: 'Remoto',
      postedAt: '5 horas atrás'
    },
    {
      title: 'Refatoração de Sistema Legacy',
      company: 'Empresa XYZ',
      budget: 'R$ 6.500',
      match: 82,
      location: 'São Carlos, SP',
      workType: 'Presencial',
      postedAt: '1 dia atrás'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Acompanhe seus projetos e oportunidades</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended Jobs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Projetos Recomendados</h3>
          <p className="text-gray-600 mt-1">Baseado no seu perfil e habilidades</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recommendedJobs.map((job, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="mb-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 flex-1 pr-2 line-clamp-2">{job.title}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full whitespace-nowrap">
                        {job.workType}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                    <p className="text-xs text-gray-500 mb-3">{job.location} • {job.postedAt}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{job.budget}</p>
                      <p className="text-xs text-gray-500">Orçamento</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${job.match}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-green-600">{job.match}%</span>
                      </div>
                      <p className="text-xs text-gray-500">Compatibilidade</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium border border-gray-200">
                      Ver Detalhes
                    </button>
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Candidatar-se
                    </button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{job.title}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {job.workType}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{job.company} • {job.location}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{job.budget}</span>
                      <span>•</span>
                      <span>{job.postedAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-12 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${job.match}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-green-600">{job.match}%</span>
                      </div>
                      <p className="text-xs text-gray-500">Compatibilidade</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Candidatar-se
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Ver todos os projetos recomendados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};