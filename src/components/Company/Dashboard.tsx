import React from 'react';
import { TrendingUp, Users, Briefcase, DollarSign, Eye, MessageSquare } from 'lucide-react';

export const CompanyDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Vagas Ativas',
      value: '8',
      change: '+2 esta semana',
      icon: Briefcase,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Candidaturas Recebidas',
      value: '24',
      change: '+12 esta semana',
      icon: Users,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Projetos em Andamento',
      value: '5',
      change: '+1 este mês',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Orçamento Disponível',
      value: 'R$ 25.000',
      change: 'Para novos projetos',
      icon: DollarSign,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  const recentApplications = [
    {
      freelancer: 'Maria Santos',
      job: 'Desenvolvimento de E-commerce',
      rate: 'R$ 7.500',
      match: 95,
      appliedAt: '2 horas atrás'
    },
    {
      freelancer: 'Carlos Oliveira',
      job: 'Design de Interface Mobile',
      rate: 'R$ 110/hora',
      match: 90,
      appliedAt: '5 horas atrás'
    },
    {
      freelancer: 'Ana Costa',
      job: 'Desenvolvimento de API',
      rate: 'R$ 4.200',
      match: 85,
      appliedAt: '1 dia atrás'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Visão geral dos seus projetos e atividades</p>
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

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Candidaturas Recentes</h3>
          <p className="text-gray-600 mt-1">Novos freelancers interessados em seus projetos</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentApplications.map((application, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium text-sm">
                        {application.freelancer.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 truncate">{application.freelancer}</h4>
                        <span className="text-sm font-medium text-green-600 ml-2">{application.match}%</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">{application.job}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{application.rate}</span>
                        <span className="text-xs text-gray-500">{application.appliedAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar Mobile */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Compatibilidade</span>
                      <span className="text-xs font-medium text-green-600">{application.match}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-green-500 rounded-full transition-all" 
                        style={{ width: `${application.match}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Action Buttons Mobile */}
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium border border-gray-200">
                      Ver Perfil
                    </button>
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Conversar
                    </button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {application.freelancer.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{application.freelancer}</p>
                    <p className="text-sm text-gray-600">{application.job}</p>
                  </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{application.rate}</p>
                      <p className="text-sm text-gray-600">{application.appliedAt}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-green-500 rounded-full" 
                          style={{ width: `${application.match}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-green-600">{application.match}%</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Ver todas as candidaturas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};