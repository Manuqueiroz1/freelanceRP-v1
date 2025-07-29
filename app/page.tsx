'use client'

import React from 'react'
import Link from 'next/link'
import { Building, User, Search, Star, MapPin, TrendingUp, Users, Briefcase, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const stats = [
    { number: '500+', label: 'Freelancers Ativos' },
    { number: '200+', label: 'Empresas Cadastradas' },
    { number: '1000+', label: 'Projetos Concluídos' },
    { number: '4.8', label: 'Avaliação Média' }
  ]

  const categories = [
    { name: 'Desenvolvimento Web', count: '120+ projetos', icon: '💻' },
    { name: 'Design Gráfico', count: '85+ projetos', icon: '🎨' },
    { name: 'Marketing Digital', count: '95+ projetos', icon: '📱' },
    { name: 'Redação', count: '60+ projetos', icon: '✍️' },
    { name: 'Consultoria', count: '40+ projetos', icon: '💼' },
    { name: 'Fotografia', count: '30+ projetos', icon: '📸' }
  ]

  const testimonials = [
    {
      name: 'João Silva',
      role: 'CEO, Tech Solutions RP',
      content: 'Encontrei desenvolvedores incríveis aqui. A qualidade dos profissionais é excepcional.',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Maria Santos',
      role: 'Freelancer Designer',
      content: 'Consegui vários projetos através da plataforma. Recomendo para todos os freelancers!',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Carlos Oliveira',
      role: 'Diretor, StartupRP',
      content: 'Plataforma fácil de usar e com ótimos profissionais. Já contratei 5 freelancers aqui.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">FreelanceRP</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/projetos" className="text-gray-600 hover:text-gray-900">
                Projetos
              </Link>
              <Link href="/como-funciona" className="text-gray-600 hover:text-gray-900">
                Como Funciona
              </Link>
              <Link href="/contato" className="text-gray-600 hover:text-gray-900">
                Contato
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Entrar
              </Link>
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Começar
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Conectando Talentos em
              <span className="text-blue-600 block">Ribeirão Preto</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A plataforma que conecta empresas e freelancers na região de Ribeirão Preto. 
              Encontre os melhores profissionais ou projetos incríveis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/login"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center"
              >
                <Building className="w-5 h-5 mr-2" />
                Sou uma Empresa
              </Link>
              <Link
                href="/login"
                className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg flex items-center justify-center"
              >
                <User className="w-5 h-5 mr-2" />
                Sou um Freelancer
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Cadastro gratuito
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Pagamentos seguros
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Suporte especializado
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Categorias Populares
            </h2>
            <p className="text-xl text-gray-600">
              Explore as áreas com mais oportunidades
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href="/projetos"
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all hover:scale-105 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{category.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600">
              Simples, rápido e seguro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Cadastre-se</h3>
              <p className="text-gray-600">
                Crie sua conta gratuita como empresa ou freelancer
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Encontre</h3>
              <p className="text-gray-600">
                Publique projetos ou candidate-se às oportunidades
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Trabalhe</h3>
              <p className="text-gray-600">
                Colabore, entregue resultados e construa sua reputação
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que dizem nossos usuários
            </h2>
            <p className="text-xl text-gray-600">
              Histórias de sucesso da nossa comunidade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se à maior comunidade de freelancers de Ribeirão Preto
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Contratar Freelancers
            </Link>
            <Link
              href="/login"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors font-semibold text-lg"
            >
              Encontrar Projetos
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FreelanceRP</h3>
              <p className="text-gray-400">
                Conectando talentos e oportunidades em Ribeirão Preto e região.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Para Empresas</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white">Cadastrar Empresa</Link></li>
                <li><Link href="/projetos" className="hover:text-white">Publicar Projeto</Link></li>
                <li><Link href="/como-funciona" className="hover:text-white">Como Funciona</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Para Freelancers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white">Cadastrar-se</Link></li>
                <li><Link href="/projetos" className="hover:text-white">Buscar Projetos</Link></li>
                <li><Link href="/como-funciona" className="hover:text-white">Dicas de Sucesso</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
                <li><Link href="/termos-uso" className="hover:text-white">Termos de Uso</Link></li>
                <li><Link href="/politica-privacidade" className="hover:text-white">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FreelanceRP. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}