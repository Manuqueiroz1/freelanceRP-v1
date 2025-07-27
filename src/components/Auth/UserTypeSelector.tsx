import React from 'react';
import { Building, User } from 'lucide-react';
import { UserType } from '../../types';

interface UserTypeSelectorProps {
  onSelectUserType: (type: UserType) => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ onSelectUserType }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 md:p-6">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo ao FreelanceRP
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            A plataforma que conecta empresas e freelancers na região de Ribeirão Preto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Company Option */}
          <div
            onClick={() => onSelectUserType('company')}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-blue-200 transition-colors">
                <Building className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                Sou uma Empresa
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                Encontre os melhores freelancers para seus projetos. Publique vagas, 
                analise candidaturas e gerencie seus projetos de forma eficiente.
              </p>
              <ul className="text-xs md:text-sm text-gray-500 space-y-1 md:space-y-2 mb-6 md:mb-8">
                <li>• Publique vagas gratuitamente</li>
                <li>• Acesse perfis qualificados</li>
                <li>• Sistema de avaliações</li>
                <li>• Suporte especializado</li>
              </ul>
              <div className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white text-sm md:text-base font-medium rounded-lg group-hover:bg-blue-700 transition-colors">
                Contratar Freelancers
              </div>
            </div>
          </div>

          {/* Freelancer Option */}
          <div
            onClick={() => onSelectUserType('freelancer')}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-green-200 transition-colors">
                <User className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                Sou um Freelancer
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                Encontre projetos incríveis na sua área de expertise. Candidate-se 
                a vagas, construa seu portfólio e faça networking profissional.
              </p>
              <ul className="text-xs md:text-sm text-gray-500 space-y-1 md:space-y-2 mb-6 md:mb-8">
                <li>• Acesso a projetos exclusivos</li>
                <li>• Perfil profissional completo</li>
                <li>• Pagamentos seguros</li>
                <li>• Crescimento da carreira</li>
              </ul>
              <div className="px-4 md:px-6 py-2 md:py-3 bg-green-600 text-white text-sm md:text-base font-medium rounded-lg group-hover:bg-green-700 transition-colors">
                Encontrar Projetos
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12 text-sm md:text-base text-gray-500 px-4">
          <p>Conectando talentos e oportunidades em Ribeirão Preto e região</p>
        </div>
      </div>
    </div>
  );
};