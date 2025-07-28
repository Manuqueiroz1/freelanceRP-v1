'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp, DollarSign, Clock, Star, Eye, Heart, MapPin, Calendar } from 'lucide-react'

export default function FreelancerDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    projetos_ativos: 0,
    candidaturas_enviadas: 0,
    faturamento_mensal: 0,
    avaliacao_media: 0
  })
  const [recommendedJobs, setRecommendedJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user.tipo !== 'freelancer') {
      router.push('/login')
      return
    }

    fetchDashboardData()
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats and recommended jobs
      setStats({
        projetos_ativos: 3,
        candidaturas_enviadas: 12,
        faturamento_mensal: 8400,
        avaliacao_media: 4.9
      })
      
      setRecommendedJobs([
        {
          id: '1',
          titulo: 'Desenvolvimento de E-commerce',
          empresa: 'Tech Solutions Ribeirão',
          orcamento_min: 7000,
          orcamento_max: 9000,
          compatibilidade: 95,
          cidade: 'Ribeirão Preto, SP',
          modalidade: 'Híbrido',
          tempo: '2 horas atrás'
        },
        {
          id: '2',
          titulo: 'API REST para Mobile App',
          empresa: 'StartupRP',
          orcamento_min: 100,
          orcamento_max: 150,
          compatibilidade: 88,
          cidade: 'Remoto',
          modalidade: 'Remoto',
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  const statsData = [
    {
      title: 'Projetos Ativos',
      value: stats.projetos_ativos.toString(),
      change: '+1 este mês',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Candidaturas Enviadas',
      value: stats.candidaturas_enviadas.toString(),
      change: '+4 esta semana',
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: 'Faturamento Mensal',
      value: `R$ ${stats.faturamento_mensal.toLocaleString()}`,
      change: '+15% vs mês passado',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Avaliação Média',
      value: stats.avaliacao_media.toString(),
      change: '23 avaliações',
      icon: Star,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
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
                Acompanhe seus projetos e encontre novas oportunidades
              </p>
            </div>
            <Link
              href="/projetos"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Buscar Projetos
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
            href="/projetos"
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all hover:scale-105 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Buscar Projetos</h3>
                <p className="text-gray-600 text-sm">Encontre oportunidades incríveis</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/freelancer/candidaturas"
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all hover:scale-105 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Minhas Candidaturas</h3>
                <p className="text-gray-600 text-sm">Acompanhe suas candidaturas</p>
              </div>
            </div>
          </Link>

          <Link
            href="/meu-perfil"
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all hover:scale-105 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Meu Perfil</h3>
                <p className="text-gray-600 text-sm">Edite seu perfil profissional</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Projetos Recomendados</h3>
                <p className="text-gray-600 mt-1">Baseado no seu perfil e habilidades</p>
              </div>
              <Link
                href="/projetos"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Ver todos
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            {recommendedJobs.length === 0 ? (
              <div className="text-center py-8">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto recomendado</h4>
                <p className="text-gray-600 mb-4">
                  Complete seu perfil para receber recomendações personalizadas
                </p>
                <Link
                  href="/meu-perfil"
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Star className="w-4 h-4" />
                  <span>Completar Perfil</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recommendedJobs.map((job: any) => (
                  <div key={job.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{job.titulo}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {job.modalidade}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{job.empresa}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.cidade}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>R$ {job.orcamento_min.toLocaleString()} - R$ {job.orcamento_max.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{job.tempo}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-12 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-green-500 rounded-full" 
                                style={{ width: `${job.compatibilidade}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-green-600">{job.compatibilidade}%</span>
                          </div>
                          <p className="text-xs text-gray-500">Compatibilidade</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/projeto/${job.id}`}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Ver Projeto
                          </Link>
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