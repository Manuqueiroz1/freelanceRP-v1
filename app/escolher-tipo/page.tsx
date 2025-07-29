'use client'

import React from 'react'
import Link from 'next/link'
import { Building, User, ArrowLeft } from 'lucide-react'

export default function EscolherTipoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo ao FreelanceRP
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A plataforma que conecta empresas e freelancers na região de Ribeirão Preto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Option */}
          <Link
            href="/login?type=empresa"
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Building className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Sou uma Empresa
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Encontre os melhores freelancers para seus projetos. Publique vagas, 
                analise candidaturas e gerencie seus projetos de forma eficiente.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mb-8">
                <li>• Publique vagas gratuitamente</li>
                <li>• Acesse perfis qualificados</li>
                <li>• Sistema de avaliações</li>
                <li>• Suporte especializado</li>
              </ul>
              <div className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg group-hover:bg-blue-700 transition-colors">
                Contratar Freelancers
              </div>
            </div>
          </Link>

          {/* Freelancer Option */}
          <Link
            href="/login?type=freelancer"
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <User className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Sou um Freelancer
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Encontre projetos incríveis na sua área de expertise. Candidate-se 
                a vagas, construa seu portfólio e faça networking profissional.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mb-8">
                <li>• Acesso a projetos exclusivos</li>
                <li>• Perfil profissional completo</li>
                <li>• Pagamentos seguros</li>
                <li>• Crescimento da carreira</li>
              </ul>
              <div className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg group-hover:bg-green-700 transition-colors">
                Encontrar Projetos
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            Conectando talentos e oportunidades em Ribeirão Preto e região
          </p>
        </div>
      </div>
    </div>
  )
}