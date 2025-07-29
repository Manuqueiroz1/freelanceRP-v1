'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

export default function TermosUsoPage() {
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
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Termos de Uso</h1>
              <p className="text-gray-600">Última atualização: Janeiro de 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="prose max-w-none">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar a plataforma FreelanceRP, você concorda em cumprir e estar vinculado 
              aos seguintes termos e condições de uso. Se você não concordar com qualquer parte 
              destes termos, não deve usar nossos serviços.
            </p>

            <h2>2. Descrição do Serviço</h2>
            <p>
              O FreelanceRP é uma plataforma digital que conecta empresas e freelancers na região 
              de Ribeirão Preto e cidades próximas. Facilitamos a publicação de projetos, 
              candidaturas e comunicação entre as partes.
            </p>

            <h2>3. Cadastro e Conta de Usuário</h2>
            <h3>3.1 Elegibilidade</h3>
            <p>
              Para usar nossos serviços, você deve ter pelo menos 18 anos de idade e capacidade 
              legal para celebrar contratos vinculativos.
            </p>
            
            <h3>3.2 Informações da Conta</h3>
            <p>
              Você é responsável por manter a confidencialidade de sua conta e senha, e por todas 
              as atividades que ocorrem sob sua conta.
            </p>

            <h2>4. Uso da Plataforma</h2>
            <h3>4.1 Para Empresas</h3>
            <ul>
              <li>Publicar projetos de forma clara e detalhada</li>
              <li>Fornecer informações precisas sobre orçamento e prazo</li>
              <li>Tratar freelancers com respeito e profissionalismo</li>
              <li>Cumprir acordos estabelecidos</li>
            </ul>

            <h3>4.2 Para Freelancers</h3>
            <ul>
              <li>Manter perfil atualizado e veraz</li>
              <li>Candidatar-se apenas a projetos compatíveis com suas habilidades</li>
              <li>Cumprir prazos e entregas acordadas</li>
              <li>Manter comunicação profissional</li>
            </ul>

            <h2>5. Condutas Proibidas</h2>
            <p>É expressamente proibido:</p>
            <ul>
              <li>Usar a plataforma para atividades ilegais ou fraudulentas</li>
              <li>Publicar conteúdo ofensivo, discriminatório ou inadequado</li>
              <li>Tentar contornar as medidas de segurança da plataforma</li>
              <li>Criar múltiplas contas para o mesmo usuário</li>
              <li>Solicitar pagamentos fora da plataforma para evitar taxas</li>
            </ul>

            <h2>6. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo da plataforma, incluindo design, textos, gráficos e software, 
              é propriedade do FreelanceRP e está protegido por leis de direitos autorais.
            </p>

            <h2>7. Privacidade</h2>
            <p>
              Sua privacidade é importante para nós. Consulte nossa Política de Privacidade 
              para entender como coletamos, usamos e protegemos suas informações.
            </p>

            <h2>8. Limitação de Responsabilidade</h2>
            <p>
              O FreelanceRP atua apenas como intermediário entre empresas e freelancers. 
              Não somos responsáveis por:
            </p>
            <ul>
              <li>Qualidade dos serviços prestados pelos freelancers</li>
              <li>Cumprimento de contratos entre as partes</li>
              <li>Disputas comerciais entre usuários</li>
              <li>Perdas ou danos decorrentes do uso da plataforma</li>
            </ul>

            <h2>9. Modificações dos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após a publicação na plataforma.
            </p>

            <h2>10. Rescisão</h2>
            <p>
              Podemos suspender ou encerrar sua conta a qualquer momento, por qualquer motivo, 
              incluindo violação destes termos.
            </p>

            <h2>11. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida 
              nos tribunais competentes de Ribeirão Preto, SP.
            </p>

            <h2>12. Contato</h2>
            <p>
              Para dúvidas sobre estes termos, entre em contato conosco:
            </p>
            <ul>
              <li>Email: contato@freelancerp.com</li>
              <li>Telefone: (16) 3333-4444</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ao usar nossa plataforma, você concorda com estes termos
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