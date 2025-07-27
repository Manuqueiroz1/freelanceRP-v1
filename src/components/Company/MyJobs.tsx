import React, { useState } from 'react';
import { Eye, Edit, Trash2, Users, MapPin, DollarSign, Calendar, Tag, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MyJobs: React.FC = () => {
  const { jobs, applications, currentUser, deleteJob, updateJob } = useApp();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  if (!currentUser || currentUser.type !== 'company') {
    return <div>Acesso negado</div>;
  }

  const companyJobs = jobs.filter(job => job.companyId === currentUser.id);
  const jobApplications = (jobId: string) => 
    applications.filter(app => app.jobId === jobId);

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta vaga?')) {
      deleteJob(jobId);
    }
  };

  const handleToggleStatus = (jobId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';
    updateJob(jobId, { status: newStatus as any });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-red-100 text-red-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Aberta';
      case 'closed': return 'Fechada';
      case 'in_progress': return 'Em Andamento';
      case 'completed': return 'Concluída';
      default: return status;
    }
  };

  const getWorkTypeColor = (workType: string) => {
    switch (workType) {
      case 'remote': return 'bg-green-100 text-green-700';
      case 'onsite': return 'bg-blue-100 text-blue-700';
      case 'hybrid': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getWorkTypeLabel = (workType: string) => {
    switch (workType) {
      case 'remote': return 'Remoto';
      case 'onsite': return 'Presencial';
      case 'hybrid': return 'Híbrido';
      default: return workType;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Minhas Vagas</h2>
          <p className="text-gray-600">Gerencie suas vagas publicadas</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nova Vaga</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Vagas</p>
              <p className="text-2xl font-bold text-gray-900">{companyJobs.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vagas Abertas</p>
              <p className="text-2xl font-bold text-gray-900">
                {companyJobs.filter(job => job.status === 'open').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Candidaturas</p>
              <p className="text-2xl font-bold text-gray-900">
                {companyJobs.reduce((sum, job) => sum + job.applicationsCount, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Andamento</p>
              <p className="text-2xl font-bold text-gray-900">
                {companyJobs.filter(job => job.status === 'in_progress').length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Suas Vagas Publicadas</h3>
        </div>

        {companyJobs.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma vaga publicada</h3>
            <p className="text-gray-600 mb-4">
              Comece publicando sua primeira vaga para encontrar freelancers talentosos.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Publicar Primeira Vaga
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {companyJobs.map((job) => (
              <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 flex-1 pr-2 line-clamp-2">{job.title}</h4>
                        <div className="flex space-x-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                            {getStatusLabel(job.status)}
                          </span>
                        </div>
                      </div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getWorkTypeColor(job.workType)}`}>
                        {getWorkTypeLabel(job.workType)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 font-medium">R$ {job.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-xs">{job.deadline.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{job.applicationsCount} candidaturas</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Habilidades:</p>
                      <div className="flex flex-wrap gap-1">
                        {job.requiredSkills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.requiredSkills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{job.requiredSkills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                          className="flex-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium border border-gray-200"
                        >
                          <Eye className="w-4 h-4 inline mr-1" />
                          Ver Candidaturas
                        </button>
                        <button className="px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-gray-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleToggleStatus(job.id, job.status)}
                        className={`w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          job.status === 'open'
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {job.status === 'open' ? 'Fechar Vaga' : 'Reabrir Vaga'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                        {getStatusLabel(job.status)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWorkTypeColor(job.workType)}`}>
                        {getWorkTypeLabel(job.workType)}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>R$ {job.budget.toLocaleString()}</span>
                        <span className="text-gray-400">
                          ({job.budgetType === 'hourly' ? 'por hora' : 'valor fixo'})
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Prazo: {job.deadline.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{job.applicationsCount} candidaturas</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Habilidades:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.requiredSkills.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{job.requiredSkills.length - 4} mais
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2 ml-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver candidaturas"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Editar vaga"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir vaga"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleToggleStatus(job.id, job.status)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        job.status === 'open'
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {job.status === 'open' ? 'Fechar Vaga' : 'Reabrir Vaga'}
                    </button>
                  </div>
                </div>

                {/* Applications for this job */}
                {selectedJob === job.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-4">
                      Candidaturas ({jobApplications(job.id).length})
                    </h5>
                    {jobApplications(job.id).length === 0 ? (
                      <p className="text-gray-500 text-sm">Nenhuma candidatura ainda.</p>
                    ) : (
                      <div className="space-y-3">
                        {jobApplications(job.id).map((application) => (
                          <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{application.freelancerName}</p>
                              <p className="text-sm text-gray-600">R$ {application.proposedRate.toLocaleString()}</p>
                              <p className="text-xs text-gray-500">{application.appliedAt.toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-12 h-2 bg-gray-200 rounded-full">
                                  <div 
                                    className="h-2 bg-green-500 rounded-full" 
                                    style={{ width: `${application.skillsMatch}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-green-600">{application.skillsMatch}%</span>
                              </div>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                application.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                application.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {application.status === 'pending' ? 'Pendente' :
                                 application.status === 'accepted' ? 'Aceita' : 'Rejeitada'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};