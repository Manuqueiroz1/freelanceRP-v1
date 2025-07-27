import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Star, Filter, MessageSquare, Heart, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cities, skillsOptions } from '../../data/mockData';

export const FindFreelancers: React.FC = () => {
  const { freelancers } = useApp();
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    skills: [] as string[],
    minRate: '',
    maxRate: '',
    availability: '',
    minExperience: ''
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

  const handleContact = (freelancerId: string) => {
    console.log('Contact freelancer:', freelancerId);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'busy': return 'bg-yellow-100 text-yellow-700';
      case 'unavailable': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'available': return 'Disponível';
      case 'busy': return 'Ocupado';
      case 'unavailable': return 'Indisponível';
      default: return availability;
    }
  };

  const filteredSkillsOptions = skillsOptions.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = !filters.search || 
      freelancer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      freelancer.bio.toLowerCase().includes(filters.search.toLowerCase());

    const matchesLocation = !filters.location || freelancer.location === filters.location;

    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.some(skill => freelancer.skills.includes(skill));

    const matchesRate = (!filters.minRate || freelancer.hourlyRate >= parseInt(filters.minRate)) &&
      (!filters.maxRate || freelancer.hourlyRate <= parseInt(filters.maxRate));

    const matchesAvailability = !filters.availability || freelancer.availability === filters.availability;

    const matchesExperience = !filters.minExperience || freelancer.experience >= parseInt(filters.minExperience);

    return matchesSearch && matchesLocation && matchesSkills && matchesRate && matchesAvailability && matchesExperience;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Buscar Freelancers</h2>
        <p className="text-gray-600">Encontre profissionais qualificados para seus projetos</p>
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
              placeholder="Buscar freelancers por nome, título ou habilidades..."
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilidade</label>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas</option>
                  <option value="available">Disponível</option>
                  <option value="busy">Ocupado</option>
                  <option value="unavailable">Indisponível</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valor/Hora (R$)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={filters.minRate}
                    onChange={(e) => setFilters(prev => ({ ...prev, minRate: e.target.value }))}
                    placeholder="Mín"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    value={filters.maxRate}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxRate: e.target.value }))}
                    placeholder="Máx"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experiência Mínima</label>
                <select
                  value={filters.minExperience}
                  onChange={(e) => setFilters(prev => ({ ...prev, minExperience: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Qualquer</option>
                  <option value="1">1+ anos</option>
                  <option value="2">2+ anos</option>
                  <option value="3">3+ anos</option>
                  <option value="5">5+ anos</option>
                  <option value="10">10+ anos</option>
                </select>
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

      {/* Results */}
      <div className="space-y-4">
        {filteredFreelancers.map((freelancer) => (
          <div key={freelancer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {freelancer.profileImage ? (
                      <img 
                        src={freelancer.profileImage} 
                        alt={freelancer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{freelancer.name}</h3>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-2">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-base text-gray-700 mb-1">{freelancer.title}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(freelancer.availability)}`}>
                      {getAvailabilityLabel(freelancer.availability)}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{freelancer.bio}</p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 truncate">{freelancer.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 font-medium">R$ {freelancer.hourlyRate}/h</span>
                  </div>
                  <div className="flex items-center space-x-1 col-span-2">
                    <Star className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{freelancer.experience} anos de experiência</span>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Principais habilidades:</p>
                  <div className="flex flex-wrap gap-1">
                    {freelancer.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {freelancer.skills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{freelancer.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={() => handleContact(freelancer.id)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contatar Freelancer</span>
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                  {freelancer.profileImage ? (
                    <img 
                      src={freelancer.profileImage} 
                      alt={freelancer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{freelancer.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(freelancer.availability)}`}>
                      {getAvailabilityLabel(freelancer.availability)}
                    </span>
                  </div>

                  <p className="text-lg text-gray-700 mb-2">{freelancer.title}</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{freelancer.bio}</p>

                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{freelancer.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>R$ {freelancer.hourlyRate}/hora</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{freelancer.experience} anos de experiência</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.slice(0, 6).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {freelancer.skills.length > 6 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        +{freelancer.skills.length - 6} mais
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-3 ml-6">
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => handleContact(freelancer.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contatar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFreelancers.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum freelancer encontrado</h3>
          <p className="text-gray-600">
            Tente ajustar seus filtros de busca para encontrar mais profissionais.
          </p>
        </div>
      )}
    </div>
  );
};