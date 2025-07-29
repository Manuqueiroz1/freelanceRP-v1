'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Política de Privacidade</h1>
              <p className="text-gray-600">Última atualização: Janeiro de 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="prose max-w-none">
            <h2>1. Introdução</h2>
            <p>
              Esta Política de Privacidade descreve como o FreelanceRP coleta, usa, armazena 
              e protege suas informações pessoais quando você usa nossa plataforma.
            </p>

            <h2>2. Informações que Coletamos</h2>
            <h3>2.1 Informações Fornecidas por Você</h3>
            <ul>
              <li>Nome completo e informações de contato</li>
              <li>Dados profissionais (experiência, habilidades, portfólio)</li>
              <li>Informações da empresa (CNPJ, razão social, setor)</li>
              <li>Dados de projetos e propostas</li>
              <li>Comunicações através da plataforma</li>
            </ul>

            <h3>2.2 Informações Coletadas Automaticamente</h3>
            <ul>
              <li>Endereço IP e localização aproximada</li>
              <li>Informações do dispositivo e navegador</li>
              <li>Dados de uso da plataforma</li>
              <li>Cookies e tecnologias similares</li>
            </ul>

            <h2>3. Como Usamos suas Informações</h2>
            <p>Utilizamos suas informações para:</p>
            <ul>
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Facilitar conexões entre empresas e freelancers</li>
              <li>Processar transações e comunicações</li>
              <li>Enviar notificações importantes</li>
              <li>Prevenir fraudes e garantir segurança</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <h2>4. Compartilhamento de Informações</h2>
            <h3>4.1 Com Outros Usuários</h3>
            <p>
              Informações do seu perfil são visíveis para outros usuários da plataforma 
              para facilitar conexões profissionais.
            </p>

            <h3>4.2 Com Terceiros</h3>
            <p>Podemos compartilhar informações com:</p>
            <ul>
              <li>Provedores de serviços (hospedagem, email, analytics)</li>
              <li>Autoridades legais quando exigido por lei</li>
              <li>Parceiros comerciais (com seu consentimento)</li>
            </ul>

            <h2>5. Segurança dos Dados</h2>
            <p>
              Implementamos medidas técnicas e organizacionais apropriadas para proteger 
              suas informações pessoais contra acesso não autorizado, alteração, 
              divulgação ou destruição.
            </p>

            <h3>5.1 Medidas de Segurança</h3>
            <ul>
              <li>Criptografia de dados sensíveis</li>
              <li>Acesso restrito a informações pessoais</li>
              <li>Monitoramento regular de segurança</li>
              <li>Backup seguro de dados</li>
            </ul>

            <h2>6. Seus Direitos</h2>
            <p>Você tem o direito de:</p>
            <ul>
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir dados incorretos ou incompletos</li>
              <li>Solicitar exclusão de sua conta</li>
              <li>Portabilidade de dados</li>
              <li>Retirar consentimento a qualquer momento</li>
              <li>Apresentar reclamações às autoridades competentes</li>
            </ul>

            <h2>7. Retenção de Dados</h2>
            <p>
              Mantemos suas informações pessoais apenas pelo tempo necessário para 
              cumprir os propósitos descritos nesta política, salvo quando a retenção 
              por período mais longo for exigida por lei.
            </p>

            <h2>8. Cookies</h2>
            <p>
              Usamos cookies e tecnologias similares para melhorar sua experiência, 
              analisar o uso da plataforma e personalizar conteúdo. Você pode 
              gerenciar preferências de cookies nas configurações do seu navegador.
            </p>

            <h2>9. Transferências Internacionais</h2>
            <p>
              Seus dados podem ser transferidos e processados em países diferentes 
              do seu país de residência. Garantimos proteção adequada através de 
              salvaguardas apropriadas.
            </p>

            <h2>10. Menores de Idade</h2>
            <p>
              Nossa plataforma não é destinada a menores de 18 anos. Não coletamos 
              intencionalmente informações pessoais de menores.
            </p>

            <h2>11. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Notificaremos sobre 
              mudanças significativas através da plataforma ou por email.
            </p>

            <h2>12. Contato</h2>
            <p>
              Para questões sobre privacidade ou exercer seus direitos, entre em contato:
            </p>
            <ul>
              <li>Email: privacidade@freelancerp.com</li>
              <li>Telefone: (16) 3333-4444</li>
              <li>Endereço: Ribeirão Preto, SP</li>
            </ul>

            <h2>13. Lei Geral de Proteção de Dados (LGPD)</h2>
            <p>
              Esta política está em conformidade com a Lei Geral de Proteção de Dados 
              (Lei nº 13.709/2018) e regulamentações aplicáveis de proteção de dados.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Sua privacidade é nossa prioridade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login?type=empresa"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Cadastrar Empresa
            </Link>
            <Link
              href="/login?type=freelancer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Cadastrar Freelancer
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}