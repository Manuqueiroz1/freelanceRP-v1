'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, MapPin, DollarSign, Calendar, Building, ArrowLeft } from 'lucide-react'
import { categorias } from '@/lib/validations'

interface Projeto {
  id: string
  titulo: string
  descricao: string
  categoria: string
  orcamento_min: number
  orcamento_max: number
  prazo: string
  modalidade: string
  requisitos: string[]
  created_at: string
  empresas: {
    razao_social: string
    logo_url?: string
    usuarios: {
      nome: string
      cidade: string
    }
  }
}

export default function ProjetosPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    categoria: '',
    orcamento_min: '',
    orcamento_max: '',
    modalidade: '',
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchProjetos()
  }, [filters])

  const fetchProjetos = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })

      const response = await fetch(`/api/projetos?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setProjetos(data.projetos || [])
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      categoria: '',
      orcamento_min: '',
      orcamento_max: '',
      modalidade: '',
    })
  }

  const getModalidadeColor = (modalidade: string) => {
    switch (modalidade) {
      case 'remoto': return 'bg-green-100 text-green-700'
      case 'presencial': return 'bg-blue-100 text-blue-700'
      case 'hibrido': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getModalidadeLabel = (modalidade: string) => {
    switch (modalidade) {
      case 'remoto': return 'Remoto'
      case 'presencial': return 'Presencial'
      case 'hibrido': return 'Híbrido'
      default: return modalidade
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link 
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Projetos Disponíveis</h1>
              <p className="text-gray-600 mt-1">
                Encontre oportunidades incríveis na região de Ribeirão Preto
              </p>
            </div>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Candidatar-se
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Buscar projetos..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={filters.categoria}
                    onChange={(e) => handleFilterChange('categoria', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todas as categorias</option>
                    {categorias.map(categoria => (
                      <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modalidade
                  </label>
                  <select
                    value={filters.modalidade}
                    onChange={(e) => handleFilterChange('modalidade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todas</option>
                    <option value="remoto">Remoto</option>
                    <option value="presencial">Presencial</option>
                    <option value="hibrido">Híbrido</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orçamento Mín. (R$)
                  </label>
                  <input
                    type="number"
                    value={filters.orcamento_min}
                    onChange={(e) => handleFilterChange('orcamento_min', e.target.value)}
                    placeholder="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orçamento Máx. (R$)
                  </label>
                  <input
                    type="number"
                    value={filters.orcamento_max}
                    onChange={(e) => handleFilterChange('orcamento_max', e.target.value)}
                    placeholder="10000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando projetos...</p>
          </div>
        ) : projetos.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
            <p className="text-gray-600">
              Tente ajustar seus filtros ou volte mais tarde para ver novos projetos.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {projetos.map((projeto) => (
              <div key={projeto.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        {projeto.empresas.logo_url ? (
                          <img 
                            src={projeto.empresas.logo_url} 
                            alt={projeto.empresas.razao_social}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Building className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{projeto.titulo}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getModalidadeColor(projeto.modalidade)}`}>
                            {getModalidadeLabel(projeto.modalidade)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{projeto.empresas.razao_social}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{projeto.empresas.usuarios.cidade}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>R$ {projeto.orcamento_min.toLocaleString()} - R$ {projeto.orcamento_max.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Prazo: {new Date(projeto.prazo).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">{projeto.descricao}</p>

                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-sm font-medium text-gray-700">Categoria:</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {projeto.categoria}
                      </span>
                    </div>

                    {projeto.requisitos.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-700 mb-2 block">Requisitos:</span>
                        <div className="flex flex-wrap gap-2">
                          {projeto.requisitos.slice(0, 5).map((requisito, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {requisito}
                            </span>
                          ))}
                          {projeto.requisitos.length > 5 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              +{projeto.requisitos.length - 5} mais
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col space-y-3">
                    <Link
                      href={`/projeto/${projeto.id}`}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                    >
                      Ver Detalhes
                    </Link>
                    <p className="text-xs text-gray-500 text-center">
                      Publicado em {new Date(projeto.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}