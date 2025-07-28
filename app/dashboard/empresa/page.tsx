'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp, Users, Briefcase, DollarSign, Plus, Eye, MessageSquare } from 'lucide-react'

export default function EmpresaDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    projetos_ativos: 0,
    candidaturas_recebidas: 0,
    projetos_concluidos: 0,
    orcamento_total: 0
  })
  const [recentApplications, setRecentApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user.tipo !== 'empresa') {
      router.push('/login')
      return
    }

    fetchDashboardData()
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats and recent applications
      // This would be implemented with actual API calls
      setStats({
        projetos_ativos: 8,
        candidaturas_recebidas: 24,
        projetos_concluidos: 5,
        orcamento_total: 25000
      })
      
      setRecentApplications([
        {
          id: '1',
          freelancer: 'Maria Santos',
          projeto: 'Desenvolvimento de E-commerce',
          valor: 7500,
          compatibilidade: 95,
          tempo: '2 horas atrás'
        },
        {
          id: '2',
          freelancer: 'Carlos Oliveira',
          projeto: 'Design de Interface Mobile',
          valor: 110,
          compatibilidade: 90,
          tempo: '5 horas atrás'
        }
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const statsData = [
    {
      title: 'Projetos Ativos',
      value: stats.projetos_ativos.toString(),
      change: '+2 esta semana',
      icon: Briefcase,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Candidaturas Recebidas',
      value: stats.candidaturas_recebidas.toString(),
      change: '+12 esta semana',
      icon: Users,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Projetos Concluídos',
      value: stats.projetos_concluidos.toString(),
      change: '+1 este mês',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Orçamento Disponível',
      value: `R$ ${stats.orcamento_total.toLocaleString()}`,
      change: 'Para novos projetos',
      icon: DollarSign,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bem-vindo, {session?.user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie seus projetos e encontre os melhores freelancers
              </p>
            </div>
            <Link
              href="/publicar-projeto"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Novo Projeto</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/publicar-projeto"
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all hover:scale-105 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Publicar Projeto</h3>
                <p className="text-gray-600 text-sm">Encontre freelancers para seu projeto</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/empresa/candidaturas"
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all hover:scale-105 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ver Candidaturas</h3>
                <p className="text-gray-600 text-sm">Gerencie candidaturas recebidas</p>
              </div>
            </div>
          </Link>

          <Link
            href="/freelancers"
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all hover:scale-105 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Buscar Freelancers</h3>
                <p className="text-gray-600 text-sm">Explore perfis de freelancers</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Candidaturas Recentes</h3>
                <p className="text-gray-600 mt-1">Novos freelancers interessados em seus projetos</p>
              </div>
              <Link
                href="/dashboard/empresa/candidaturas"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver todas
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            {recentApplications.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhuma candidatura ainda</h4>
                <p className="text-gray-600 mb-4">
                  Publique um projeto para começar a receber candidaturas
                </p>
                <Link
                  href="/publicar-projeto"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publicar Projeto</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentApplications.map((application: any) => (
                  <div key={application.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {application.freelancer.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{application.freelancer}</p>
                          <p className="text-sm text-gray-600">{application.projeto}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">R$ {application.valor.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{application.tempo}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{ width: `${application.compatibilidade}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-green-600">{application.compatibilidade}%</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}