import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Calendar, Tag, Filter, Eye, Heart, Gift } from 'lucide-react';
import { cities, skillsOptions } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const FindJobs: React.FC = () => {
  const { jobs, addApplication, currentUser } = useApp();
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    workType: '',
    budgetMin: '',
    budgetMax: '',
    skills: [] as string[]
  });

  const [showFilters, setShowFilters] = useState(false);
  const [skillSearch, setSkillSearch] = useState('');

  const handleSkillToggle = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleApply = (jobId: string) => {
    if (!currentUser || currentUser.type !== 'freelancer') {
      alert('Você precisa estar logado como freelancer para se candidatar');
      return;
    }

    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const message = prompt('Escreva uma mensagem para sua candidatura:');
    if (!message) return;

    const proposedRate = prompt('Qual seu valor proposto? (R$)');
    if (!proposedRate) return;

    const freelancer = currentUser as any;
    const skillsMatch = Math.floor(Math.random() * 20) + 80; // Simulate skills matching

    addApplication({
      jobId: jobId,
      freelancerId: currentUser.id,
      freelancerName: currentUser.name,
      message: message,
      proposedRate: parseFloat(proposedRate),
      skillsMatch: skillsMatch,
      status: 'pending'
    });

    alert('Candidatura enviada com sucesso!');
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

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !filters.search || 
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(filters.search.toLowerCase());

    const matchesLocation = !filters.location || job.location === filters.location;
    const matchesWorkType = !filters.workType || job.workType === filters.workType;
    
    const matchesBudget = (!filters.budgetMin || job.budget >= parseInt(filters.budgetMin)) &&
      (!filters.budgetMax || job.budget <= parseInt(filters.budgetMax));

    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.some(skill => job.requiredSkills.includes(skill));

    return matchesSearch && matchesLocation && matchesWorkType && matchesBudget && matchesSkills && job.status === 'open';
  });

  const filteredSkillsOptions = skillsOptions.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Buscar Projetos</h2>
        <p className="text-gray-600">Encontre oportunidades que combinam com seu perfil</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Buscar projetos..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Buscar
          </button>
        </div>

        {showFilters && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas as localizações</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modalidade</label>
              <select
                value={filters.workType}
                onChange={(e) => setFilters(prev => ({ ...prev, workType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas as modalidades</option>
                <option value="remote">Remoto</option>
                <option value="onsite">Presencial</option>
                <option value="hybrid">Híbrido</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Orçamento (R$)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={filters.budgetMin}
                  onChange={(e) => setFilters(prev => ({ ...prev, budgetMin: e.target.value }))}
                  placeholder="Mín"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={filters.budgetMax}
                  onChange={(e) => setFilters(prev => ({ ...prev, budgetMax: e.target.value }))}
                  placeholder="Máx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            </div>
            
            {/* Skills Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Habilidades</label>
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Buscar habilidades..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
              />
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 max-h-32 overflow-y-auto">
                {filteredSkillsOptions.slice(0, 24).map(skill => (
                  <label key={skill} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="mr-1 text-blue-600 rounded"
                    />
                    {skill}
                  </label>
                ))}
              </div>
              {filters.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {filters.skills.map(skill => (
                    <span
                      key={skill}
                      className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => handleSkillToggle(skill)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2 line-clamp-2">{job.title}</h3>
                    <div className="flex space-x-1">
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">{job.companyName}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkTypeColor(job.workType)}`}>
                      {getWorkTypeLabel(job.workType)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{job.description}</p>

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
                  <p className="text-xs text-gray-500 mb-2">Habilidades necessárias:</p>
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

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center space-x-1 mb-2">
                      <Gift className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">Benefícios</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.benefits.slice(0, 2).map((benefit, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                      {job.benefits.length > 2 && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          +{job.benefits.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Meta Info */}
                <div className="text-xs text-gray-500 border-t pt-3">
                  <span>Publicado {job.createdAt.toLocaleDateString()}</span>
                </div>

                {/* Action */}
                <button
                  onClick={() => handleApply(job.id)}
                  className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Candidatar-se ao Projeto
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
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
                </div>

                <div className="flex items-center space-x-4 mb-4">
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

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{job.companyName}</span>
                  <span>•</span>
                  <span>{job.applicationsCount} candidaturas</span>
                  <span>•</span>
                  <span>Publicado {job.createdAt.toLocaleDateString()}</span>
                </div>

                {job.benefits && job.benefits.length > 0 && (
                  <div className="flex items-start space-x-2 mt-3">
                    <Gift className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Benefícios: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {job.benefits.map((benefit, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end space-y-3 ml-6">
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => handleApply(job.id)}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Candidatar-se
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
          <p className="text-gray-600">
            Tente ajustar seus filtros de busca para encontrar mais oportunidades.
          </p>
        </div>
      )}
    </div>
  );
};