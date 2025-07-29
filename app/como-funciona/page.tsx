'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Search, Star, Building, CheckCircle, Users, Briefcase } from 'lucide-react'

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Como Funciona</h1>
          <p className="text-gray-600 mt-1">
            Entenda como conectar talentos e oportunidades no FreelanceRP
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simples, Rápido e Seguro
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma foi criada para facilitar a conexão entre empresas e freelancers 
            na região de Ribeirão Preto de forma eficiente e segura.
          </p>
        </div>

        {/* Para Empresas */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Para Empresas</h3>
            <p className="text-lg text-gray-600">
              Encontre os melhores freelancers para seus projetos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Cadastre-se</h4>
              <p className="text-gray-600 text-sm">
                Crie sua conta empresarial gratuitamente
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Publique Projetos</h4>
              <p className="text-gray-600 text-sm">
                Descreva seu projeto e orçamento
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Receba Propostas</h4>
              <p className="text-gray-600 text-sm">
                Analise candidaturas de freelancers qualificados
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Contrate</h4>
              <p className="text-gray-600 text-sm">
                Escolha o melhor freelancer e inicie o projeto
              </p>
            </div>
          </div>
        </div>

        {/* Para Freelancers */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Para Freelancers</h3>
            <p className="text-lg text-gray-600">
              Encontre projetos incríveis e construa sua carreira
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Crie seu Perfil</h4>
              <p className="text-gray-600 text-sm">
                Monte um perfil profissional completo
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Busque Projetos</h4>
              <p className="text-gray-600 text-sm">
                Explore oportunidades na sua área
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Candidate-se</h4>
              <p className="text-gray-600 text-sm">
                Envie propostas personalizadas
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Trabalhe</h4>
              <p className="text-gray-600 text-sm">
                Execute o projeto e construa sua reputação
              </p>
            </div>
          </div>
        </div>

        {/* Benefícios */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher o FreelanceRP?</h3>
            <p className="text-lg text-gray-600">
              Vantagens exclusivas para a comunidade de Ribeirão Preto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Foco Regional</h4>
              <p className="text-gray-600 text-sm">
                Especializado na região de Ribeirão Preto e cidades próximas
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Comunidade Local</h4>
              <p className="text-gray-600 text-sm">
                Conecte-se com profissionais e empresas da sua região
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Qualidade Garantida</h4>
              <p className="text-gray-600 text-sm">
                Sistema de avaliações para garantir a qualidade dos serviços
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Projetos Variados</h4>
              <p className="text-gray-600 text-sm">
                Desde desenvolvimento web até design e marketing digital
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Gratuito</h4>
              <p className="text-gray-600 text-sm">
                Cadastro e uso da plataforma completamente gratuitos
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Busca Inteligente</h4>
              <p className="text-gray-600 text-sm">
                Filtros avançados para encontrar exatamente o que procura
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para começar?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Junte-se à comunidade de freelancers de Ribeirão Preto
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login?type=empresa"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center"
            >
              <Building className="w-5 h-5 mr-2" />
              Sou uma Empresa
            </Link>
            <Link
              href="/login?type=freelancer"
              className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg flex items-center justify-center"
            >
              <User className="w-5 h-5 mr-2" />
              Sou um Freelancer
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}