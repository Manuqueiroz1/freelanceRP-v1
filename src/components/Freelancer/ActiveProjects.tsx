import React from 'react';
import { Calendar, DollarSign, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ActiveProjects: React.FC = () => {
  const { projects, currentUser, jobs, companies } = useApp();

  if (!currentUser || currentUser.type !== 'freelancer') {
    return <div>Acesso negado</div>;
  }

  const freelancerProjects = projects.filter(project => project.freelancerId === currentUser.id);

  const getJobDetails = (jobId: string) => {
    return jobs.find(job => job.id === jobId);
  };

  const getCompanyDetails = (companyId: string) => {
    return companies.find(company => company.id === companyId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'paused': return 'Pausado';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'paused': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Projetos Ativos</h2>
        <p className="text-gray-600">Acompanhe o progresso dos seus projetos em andamento</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projetos Ativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {freelancerProjects.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Concluídos</p>
              <p className="text-2xl font-bold text-gray-900">
                {freelancerProjects.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Faturamento Total</p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {freelancerProjects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Progresso Médio</p>
              <p className="text-2xl font-bold text-gray-900">
                {freelancerProjects.length > 0 
                  ? Math.round(freelancerProjects.reduce((sum, p) => sum + p.progress, 0) / freelancerProjects.length)
                  : 0}%
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Seus Projetos</h3>
        </div>

        {freelancerProjects.length === 0 ? (
          <div className="p-12 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto ativo</h3>
            <p className="text-gray-600 mb-4">
              Quando você for contratado para projetos, eles aparecerão aqui.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Buscar Projetos
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {freelancerProjects.map((project) => {
              const job = getJobDetails(project.jobId);
              const company = getCompanyDetails(project.companyId);

              return (
                <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <div className="space-y-4">
                      {/* Header */}
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 flex-1 pr-2 line-clamp-2">{project.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(project.status)}`}>
                            {getStatusIcon(project.status)}
                            <span>{getStatusLabel(project.status)}</span>
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-700">{company?.name || 'Empresa'}</p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{project.description}</p>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 font-medium">R$ {project.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 text-xs">{project.deadline.toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progresso do Projeto</span>
                          <span className="text-sm font-medium text-blue-600">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Milestones */}
                      {project.milestones && project.milestones.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Próximos Marcos</p>
                          <div className="space-y-2">
                            {project.milestones.slice(0, 2).map((milestone) => (
                              <div key={milestone.id} className="flex items-center space-x-2 text-sm">
                                <div className={`w-3 h-3 rounded-full ${
                                  milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                                }`}></div>
                                <span className={`flex-1 ${
                                  milestone.completed ? 'text-gray-500 line-through' : 'text-gray-700'
                                }`}>
                                  {milestone.title}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {milestone.dueDate.toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="space-y-2">
                        <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                          Ver Detalhes do Projeto
                        </button>
                        {project.status === 'active' && (
                          <button className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                            Atualizar Progresso
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{project.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(project.status)}`}>
                          {getStatusIcon(project.status)}
                          <span>{getStatusLabel(project.status)}</span>
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{project.description}</p>

                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{company?.name || 'Empresa'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>R$ {project.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Prazo: {project.deadline.toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progresso</span>
                          <span className="text-sm text-gray-600">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Milestones */}
                      {project.milestones && project.milestones.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Marcos do Projeto</h5>
                          <div className="space-y-2">
                            {project.milestones.slice(0, 3).map((milestone) => (
                              <div key={milestone.id} className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                  milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                                }`}>
                                  {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
                                </div>
                                <span className={`text-sm ${
                                  milestone.completed ? 'text-gray-900 line-through' : 'text-gray-700'
                                }`}>
                                  {milestone.title}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {milestone.dueDate.toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end space-y-2 ml-6">
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Ver Detalhes
                      </button>
                      {project.status === 'active' && (
                        <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                          Atualizar Progresso
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};