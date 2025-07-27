import React, { useState } from 'react';
import { User, Upload, Save, Mail, Phone, MapPin, Globe, Github, Linkedin, Star, DollarSign } from 'lucide-react';
import { cities, skillsOptions } from '../../data/mockData';

export const FreelancerSettings: React.FC = () => {
  const [profileData, setProfileData] = useState({
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(16) 99999-9999',
    location: 'Ribeirão Preto, SP',
    title: 'Desenvolvedora Full Stack',
    bio: 'Desenvolvedora com 5 anos de experiência em React, Node.js e Python. Especialista em desenvolvimento de aplicações web modernas e APIs RESTful.',
    hourlyRate: 80,
    experience: 5,
    availability: 'available' as 'available' | 'busy' | 'unavailable',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    linkedin: 'https://linkedin.com/in/mariasantos',
    github: 'https://github.com/mariasantos',
    website: ''
  });

  const [skills, setSkills] = useState([
    'React', 'Node.js', 'Python', 'PostgreSQL', 'TypeScript', 'AWS', 'Microsoft Office', 'ChatGPT'
  ]);

  const [portfolio, setPortfolio] = useState([
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Plataforma completa de e-commerce com React e Node.js',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      projectUrl: 'https://ecommerce-demo.com',
      imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [] as string[],
    projectUrl: '',
    imageUrl: ''
  });

  const [customSkill, setCustomSkill] = useState('');
  const [skillSearch, setSkillSearch] = useState('');
  const handleSkillToggle = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !skills.includes(customSkill.trim())) {
      setSkills(prev => [...prev, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };
  const handleTechToggle = (tech: string) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const project = {
        ...newProject,
        id: Date.now().toString()
      };
      setPortfolio([...portfolio, project]);
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        projectUrl: '',
        imageUrl: ''
      });
    }
  };

  const handleRemoveProject = (id: string) => {
    setPortfolio(portfolio.filter(p => p.id !== id));
  };

  const handleSave = () => {
    console.log('Saving freelancer settings:', { ...profileData, skills, portfolio });
  };

  const availabilityOptions = [
    { value: 'available', label: 'Disponível', color: 'text-green-600 bg-green-100' },
    { value: 'busy', label: 'Ocupado', color: 'text-yellow-600 bg-yellow-100' },
    { value: 'unavailable', label: 'Indisponível', color: 'text-red-600 bg-red-100' }
  ];

  const filteredSkills = skillsOptions.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Editar Perfil</h2>
            <p className="text-gray-600">Mantenha seu perfil atualizado para atrair melhores oportunidades</p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span>Voltar ao Perfil</span>
          </button>
        </div>
      </div>

      {/* Mobile Back Button */}
      <div className="sm:hidden">
        <button
          onClick={() => window.history.back()}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span>← Voltar ao Perfil</span>
        </button>
      </div>

      <div>
        <p className="text-gray-600">Mantenha seu perfil atualizado para atrair melhores oportunidades</p>
      </div>

      {/* Profile Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            <img 
              src={profileData.profileImage} 
              alt="Foto de perfil" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">{profileData.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                availabilityOptions.find(opt => opt.value === profileData.availability)?.color
              }`}>
                {availabilityOptions.find(opt => opt.value === profileData.availability)?.label}
              </span>
            </div>
            <p className="text-lg text-gray-700 mb-2">{profileData.title}</p>
            <p className="text-gray-600 mb-3">{profileData.location}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>R$ {profileData.hourlyRate}/hora</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>{profileData.experience} anos de experiência</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 6).map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 6 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  +{skills.length - 6} mais
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Informações Pessoais
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                E-mail *
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-1" />
                Telefone
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Localização *
              </label>
              <select
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título Profissional *
              </label>
              <input
                type="text"
                value={profileData.title}
                onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Desenvolvedor Full Stack"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biografia Profissional
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Valor/Hora (R$)
                </label>
                <input
                  type="number"
                  value={profileData.hourlyRate}
                  onChange={(e) => setProfileData(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anos de Experiência
                </label>
                <input
                  type="number"
                  value={profileData.experience}
                  onChange={(e) => setProfileData(prev => ({ ...prev, experience: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status de Disponibilidade
              </label>
              <div className="space-y-2">
                {availabilityOptions.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value={option.value}
                      checked={profileData.availability === option.value}
                      onChange={(e) => setProfileData(prev => ({ ...prev, availability: e.target.value as any }))}
                      className="mr-3 text-blue-600"
                    />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${option.color}`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image and Links */}
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Foto de Perfil
            </h3>
            
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                <img 
                  src={profileData.profileImage} 
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Alterar Foto
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Recomendado: 400x400px, PNG ou JPG
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Links Profissionais
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Linkedin className="inline w-4 h-4 mr-1" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={profileData.linkedin}
                  onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/in/seuperfil"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Github className="inline w-4 h-4 mr-1" />
                  GitHub
                </label>
                <input
                  type="url"
                  value={profileData.github}
                  onChange={(e) => setProfileData(prev => ({ ...prev, github: e.target.value }))}
                  placeholder="https://github.com/seuusuario"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="inline w-4 h-4 mr-1" />
                  Website/Portfólio
                </label>
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://seusite.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Habilidades Técnicas
        </h3>
        
        {/* Search Skills */}
        <div className="mb-4">
          <input
            type="text"
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            placeholder="Buscar habilidades..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* Skills Categories */}
        <div className="space-y-6 mb-6">
          {/* Popular Skills */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Habilidades Populares</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['React', 'Node.js', 'Python', 'JavaScript', 'UI/UX Design', 'Microsoft Office', 'ChatGPT', 'Google Analytics'].map(skill => (
                <label key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="mr-2 text-blue-600 rounded"
                  />
                  <span className="text-sm">{skill}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* All Skills */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Todas as Habilidades</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
              {filteredSkills.map(skill => (
                <label key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="mr-2 text-blue-600 rounded"
                  />
                  <span className="text-sm">{skill}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        {/* Add Custom Skill */}
        <div className="p-4 bg-gray-50 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Adicionar Habilidade Personalizada</h4>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Ex: Salesforce, SAP, AutoCAD, Revit..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomSkill())}
            />
            <button
              type="button"
              onClick={handleAddCustomSkill}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Selected Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span
              key={skill}
              className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Portfólio
        </h3>
        
        {/* Add New Project */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Adicionar Novo Projeto</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Título do projeto"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              value={newProject.projectUrl}
              onChange={(e) => setNewProject(prev => ({ ...prev, projectUrl: e.target.value }))}
              placeholder="URL do projeto (opcional)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descrição do projeto"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Tecnologias utilizadas:</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {skillsOptions.slice(0, 12).map(tech => (
                <label key={tech} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={newProject.technologies.includes(tech)}
                    onChange={() => handleTechToggle(tech)}
                    className="mr-1 text-blue-600 rounded"
                  />
                  {tech}
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddProject}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Adicionar Projeto
          </button>
        </div>

        {/* Portfolio Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolio.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              {project.imageUrl && (
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}
              <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
              <p className="text-gray-600 text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Ver Projeto
                  </a>
                )}
                <button
                  onClick={() => handleRemoveProject(project.id)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save className="w-5 h-5" />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </div>
    </div>
  );
};