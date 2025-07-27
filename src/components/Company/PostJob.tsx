import React, { useState } from 'react';
import { MapPin, DollarSign, Calendar, Users, Tag } from 'lucide-react';
import { cities, skillsOptions } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const PostJob: React.FC = () => {
  const { addJob, currentUser } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    workType: 'remote' as 'remote' | 'onsite' | 'hybrid',
    budget: '',
    budgetType: 'fixed' as 'fixed' | 'hourly',
    deadline: '',
    requiredSkills: [] as string[],
    benefits: [] as string[]
  });

  const [newBenefit, setNewBenefit] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [skillSearch, setSkillSearch] = useState('');

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter(s => s !== skill)
        : [...prev.requiredSkills, skill]
    }));
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !formData.requiredSkills.includes(customSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, customSkill.trim()]
      }));
      setCustomSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skill)
    }));
  };
  const handleAddBenefit = () => {
    if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (benefit: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(b => b !== benefit)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || currentUser.type !== 'company') {
      alert('Você precisa estar logado como empresa para publicar vagas');
      return;
    }

    const company = currentUser as any; // Type assertion for company
    
    addJob({
      title: formData.title,
      description: formData.description,
      companyId: currentUser.id,
      companyName: company.companyName || currentUser.name,
      location: formData.location,
      workType: formData.workType,
      budget: parseFloat(formData.budget),
      budgetType: formData.budgetType,
      requiredSkills: formData.requiredSkills,
      deadline: new Date(formData.deadline),
      status: 'open',
      benefits: formData.benefits
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      location: '',
      workType: 'remote',
      budget: '',
      budgetType: 'fixed',
      deadline: '',
      requiredSkills: [],
      benefits: []
    });
    setNewBenefit('');
    
    alert('Vaga publicada com sucesso!');
  };

  const filteredSkills = skillsOptions.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Publicar Nova Vaga</h2>
        <p className="text-gray-600">Encontre o freelancer ideal para seu projeto</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título do Projeto *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Ex: Desenvolvimento de E-commerce"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição do Projeto *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descreva detalhadamente o que precisa ser desenvolvido..."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        {/* Location and Work Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Localização
            </label>
            <select
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            >
              <option value="">Selecione a localização</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-1" />
              Modalidade de Trabalho
            </label>
            <div className="flex space-x-4">
              {[
                { value: 'remote', label: 'Remoto' },
                { value: 'onsite', label: 'Presencial' },
                { value: 'hybrid', label: 'Híbrido' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="workType"
                    value={option.value}
                    checked={formData.workType === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, workType: e.target.value as any }))}
                    className="mr-2 text-blue-600"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Budget and Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="inline w-4 h-4 mr-1" />
              Tipo de Orçamento
            </label>
            <div className="space-y-2">
              {[
                { value: 'fixed', label: 'Valor Fixo' },
                { value: 'hourly', label: 'Por Hora' }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="budgetType"
                    value={option.value}
                    checked={formData.budgetType === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, budgetType: e.target.value as any }))}
                    className="mr-2 text-blue-600"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Orçamento (R$) *
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              placeholder={formData.budgetType === 'hourly' ? '80' : '5000'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.budgetType === 'hourly' ? 'Valor por hora' : 'Valor total do projeto'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Prazo de Entrega *
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>
        </div>

        {/* Required Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="inline w-4 h-4 mr-1" />
            Habilidades Necessárias *
          </label>
          
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
          
          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filteredSkills.slice(0, 20).map(skill => (
              <label key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.requiredSkills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                  className="mr-2 text-blue-600 rounded"
                />
                <span className="text-sm">{skill}</span>
              </label>
            ))}
          </div>
          
          {filteredSkills.length > 20 && (
            <p className="text-sm text-gray-500 mt-2">
              Mostrando 20 de {filteredSkills.length} habilidades. Use a busca para encontrar mais.
            </p>
          )}
          
          {/* Add Custom Skill */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Adicionar Habilidade Personalizada</h4>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="Ex: Salesforce, SAP, AutoCAD..."
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
          {formData.requiredSkills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.requiredSkills.map(skill => (
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
          )}
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Benefícios Oferecidos
          </label>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
            <input
              type="text"
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              placeholder="Ex: Vale Refeição R$ 600"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBenefit())}
            />
            <button
              type="button"
              onClick={handleAddBenefit}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
            >
              Adicionar
            </button>
          </div>
          {formData.benefits.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  <span>{benefit}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(benefit)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Publicar Vaga
          </button>
        </div>
      </form>
    </div>
  );
};