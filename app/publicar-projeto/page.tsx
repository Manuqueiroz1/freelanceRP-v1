'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projetoSchema } from '@/lib/validations'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Plus, X } from 'lucide-react'
import { categorias } from '@/lib/validations'
import Link from 'next/link'

type ProjetoForm = {
  titulo: string
  descricao: string
  categoria: string
  orcamento_min: number
  orcamento_max: number
  prazo: string
  requisitos: string[]
  modalidade: 'remoto' | 'presencial' | 'hibrido'
}

export default function PublicarProjetoPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [requisitos, setRequisitos] = useState<string[]>([])
  const [novoRequisito, setNovoRequisito] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjetoForm>({
    resolver: zodResolver(projetoSchema),
  })

  // Redirect if not authenticated or not a company
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session || session.user.tipo !== 'empresa') {
    router.push('/login')
    return null
  }

  const handleAddRequisito = () => {
    if (novoRequisito.trim() && !requisitos.includes(novoRequisito.trim())) {
      const novosRequisitos = [...requisitos, novoRequisito.trim()]
      setRequisitos(novosRequisitos)
      setValue('requisitos', novosRequisitos)
      setNovoRequisito('')
    }
  }

  const handleRemoveRequisito = (requisito: string) => {
    const novosRequisitos = requisitos.filter(r => r !== requisito)
    setRequisitos(novosRequisitos)
    setValue('requisitos', novosRequisitos)
  }

  const onSubmit = async (data: ProjetoForm) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/projetos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          orcamento_min: Number(data.orcamento_min),
          orcamento_max: Number(data.orcamento_max),
          requisitos,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || 'Erro ao criar projeto')
        return
      }

      toast.success('Projeto publicado com sucesso!')
      router.push('/dashboard/empresa')
    } catch (error) {
      toast.error('Erro ao publicar projeto')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/dashboard/empresa"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Publicar Novo Projeto</h1>
          <p className="text-gray-600 mt-1">
            Encontre o freelancer ideal para seu projeto
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border p-8 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título do Projeto *
            </label>
            <input
              type="text"
              {...register('titulo')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Desenvolvimento de E-commerce"
            />
            {errors.titulo && (
              <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>
            )}
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria *
            </label>
            <select
              {...register('categoria')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione a categoria</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
            {errors.categoria && (
              <p className="text-red-500 text-sm mt-1">{errors.categoria.message}</p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição do Projeto *
            </label>
            <textarea
              {...register('descricao')}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva detalhadamente o que precisa ser desenvolvido..."
            />
            {errors.descricao && (
              <p className="text-red-500 text-sm mt-1">{errors.descricao.message}</p>
            )}
          </div>

          {/* Orçamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orçamento Mínimo (R$) *
              </label>
              <input
                type="number"
                {...register('orcamento_min', { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1000"
                min="1"
              />
              {errors.orcamento_min && (
                <p className="text-red-500 text-sm mt-1">{errors.orcamento_min.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orçamento Máximo (R$) *
              </label>
              <input
                type="number"
                {...register('orcamento_max', { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5000"
                min="1"
              />
              {errors.orcamento_max && (
                <p className="text-red-500 text-sm mt-1">{errors.orcamento_max.message}</p>
              )}
            </div>
          </div>

          {/* Prazo e Modalidade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prazo de Entrega *
              </label>
              <input
                type="date"
                {...register('prazo')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.prazo && (
                <p className="text-red-500 text-sm mt-1">{errors.prazo.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modalidade de Trabalho *
              </label>
              <select
                {...register('modalidade')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione a modalidade</option>
                <option value="remoto">Remoto</option>
                <option value="presencial">Presencial</option>
                <option value="hibrido">Híbrido</option>
              </select>
              {errors.modalidade && (
                <p className="text-red-500 text-sm mt-1">{errors.modalidade.message}</p>
              )}
            </div>
          </div>

          {/* Requisitos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requisitos e Habilidades *
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={novoRequisito}
                onChange={(e) => setNovoRequisito(e.target.value)}
                placeholder="Ex: React, Node.js, PostgreSQL..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRequisito())}
              />
              <button
                type="button"
                onClick={handleAddRequisito}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            {requisitos.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {requisitos.map((requisito, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    <span>{requisito}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRequisito(requisito)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {errors.requisitos && (
              <p className="text-red-500 text-sm mt-1">{errors.requisitos.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Publicando...' : 'Publicar Projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}