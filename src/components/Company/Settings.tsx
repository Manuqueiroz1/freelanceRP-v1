import React, { useState } from 'react';
import { Building, Upload, Palette, Save, User, Mail, Phone, Globe, Users } from 'lucide-react';

export const CompanySettings: React.FC = () => {
  const [companyData, setCompanyData] = useState({
    companyName: 'Tech Solutions Ribeirão',
    cnpj: '12.345.678/0001-90',
    email: 'joao@techsolutions.com',
    phone: '(16) 3333-4444',
    website: 'https://techsolutions.com.br',
    description: 'Empresa de tecnologia especializada em desenvolvimento de software',
    location: 'Ribeirão Preto, SP',
    employees: 25,
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    brandColor: '#2563EB',
    secondaryColor: '#F59E0B'
  });

  const [benefits, setBenefits] = useState([
    'Vale Refeição R$ 600',
    'Plano de Saúde',
    'Home Office',
    'Horário Flexível'
  ]);

  const [newBenefit, setNewBenefit] = useState('');

  const handleAddBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (benefit: string) => {
    setBenefits(benefits.filter(b => b !== benefit));
  };

  const handleSave = () => {
    console.log('Saving company settings:', { ...companyData, benefits });
  };

  const colorOptions = [
    { name: 'Azul Corporativo', value: '#2563EB' },
    { name: 'Verde Sucesso', value: '#10B981' },
    { name: 'Roxo Criativo', value: '#8B5CF6' },
    { name: 'Laranja Energia', value: '#F59E0B' },
    { name: 'Vermelho Paixão', value: '#EF4444' },
    { name: 'Cinza Elegante', value: '#6B7280' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Configurações da Empresa</h2>
        <p className="text-gray-600">Personalize o perfil da sua empresa na plataforma</p>
      </div>

      {/* Company Profile Preview */}
      <div 
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        style={{ 
          background: `linear-gradient(135deg, ${companyData.brandColor}15 0%, ${companyData.secondaryColor}15 100%)`,
          borderColor: companyData.brandColor + '30'
        }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-sm">
            <img 
              src={companyData.logo} 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{companyData.companyName}</h3>
            <p className="text-gray-600">{companyData.location}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{companyData.description}</p>
        <div className="flex flex-wrap gap-2">
          {benefits.slice(0, 3).map((benefit, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: companyData.brandColor + '20',
                color: companyData.brandColor
              }}
            >
              {benefit}
            </span>
          ))}
          {benefits.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              +{benefits.length - 3} mais
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Informações da Empresa
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Empresa *
              </label>
              <input
                type="text"
                value={companyData.companyName}
                onChange={(e) => setCompanyData(prev => ({ ...prev, companyName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CNPJ *
              </label>
              <input
                type="text"
                value={companyData.cnpj}
                onChange={(e) => setCompanyData(prev => ({ ...prev, cnpj: e.target.value }))}
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
                value={companyData.email}
                onChange={(e) => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
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
                value={companyData.phone}
                onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="inline w-4 h-4 mr-1" />
                Website
              </label>
              <input
                type="url"
                value={companyData.website}
                onChange={(e) => setCompanyData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Número de Funcionários
              </label>
              <select
                value={companyData.employees}
                onChange={(e) => setCompanyData(prev => ({ ...prev, employees: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>1-10 funcionários</option>
                <option value={25}>11-50 funcionários</option>
                <option value={75}>51-100 funcionários</option>
                <option value={200}>101-500 funcionários</option>
                <option value={1000}>500+ funcionários</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição da Empresa
              </label>
              <textarea
                value={companyData.description}
                onChange={(e) => setCompanyData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Visual Customization */}
        <div className="space-y-6">
          {/* Logo Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Logo da Empresa
            </h3>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                <img 
                  src={companyData.logo} 
                  alt="Logo atual" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Alterar Logo
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Recomendado: 200x200px, PNG ou JPG
              </p>
            </div>
          </div>

          {/* Brand Colors */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Cores da Marca
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor Principal
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setCompanyData(prev => ({ ...prev, brandColor: color.value }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        companyData.brandColor === color.value 
                          ? 'border-gray-900 scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                    >
                      <div className="w-full h-4 rounded"></div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor Secundária
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setCompanyData(prev => ({ ...prev, secondaryColor: color.value }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        companyData.secondaryColor === color.value 
                          ? 'border-gray-900 scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                    >
                      <div className="w-full h-4 rounded"></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Benefícios Padrão
            </h3>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Ex: Vale Refeição R$ 600"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBenefit())}
                />
                <button
                  onClick={handleAddBenefit}
                  className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                >
                  Adicionar
                </button>
              </div>

              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{benefit}</span>
                    <button
                      onClick={() => handleRemoveBenefit(benefit)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Save className="w-5 h-5" />
          <span>Salvar Configurações</span>
        </button>
      </div>
    </div>
  );
};