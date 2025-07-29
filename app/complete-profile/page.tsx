'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { Building, User, MapPin, Briefcase, DollarSign } from 'lucide-react'
import { z } from 'zod'
import { cidades, setores, habilidades } from '@/lib/validations'

// Schema para completar perfil de empresa
const completeEmpresaSchema = z.object({
  cnpj: z.string().min(14, 'CNPJ é obrigatório'),
  razao_social: z.string().min(2, 'Razão social é obrigatória'),
  setor: z.string().min(1, 'Setor é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  bairro: z.string().optional(),
  descricao: z.string().optional(),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
})

// Schema para completar perfil de freelancer
const completeFreelancerSchema = z.object({
  cpf: z.string().min(11, 'CPF é obrigatório'),
  profissao: z.string().min(2, 'Profissão é obrigatória'),
  experiencia: z.number().min(0, 'Experiência deve ser positiva'),
  preco_hora: z.number().min(1, 'Preço por hora deve ser maior que zero'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  bairro: z.string().optional(),
  habilidades: z.array(z.string()).min(1, 'Selecione pelo menos uma habilidade'),
  bio: z.string().optional(),
  portfolio_url: z.string().url('URL inválida').optional().or(z.literal('')),
  linkedin_url: z.string().url('URL inválida').optional().or(z.literal('')),
  github_url: z.string().url('URL inválida').optional().or(z.literal('')),
})

type CompleteEmpresaForm = z.infer<typeof completeEmpresaSchema>
type CompleteFreelancerForm = z.infer<typeof completeFreelancerSchema>

export default function CompleteProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const empresaForm = useForm<CompleteEmpresaForm>({
    resolver: zodResolver(completeEmpresaSchema),
  })

  const freelancerForm = useForm<CompleteFreelancerForm>({
    resolver: zodResolver(completeFreelancerSchema),
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login')
      return
    }

    // Verificar se o perfil já está completo
    checkProfileCompletion()
  }, [session, status, router])

  const checkProfileCompletion = async () => {
    try {
      const response = await fetch('/api/profile/check-completion')
      const result = await response.json()
      
      if (result.isComplete) {
        // Perfil já está completo, redirecionar para dashboard
        if (session?.user?.tipo === 'empresa') {
          router.push('/dashboard/empresa')
        } else {
          router.push('/dashboard/freelancer')
        }
      }
    } catch (error) {
      console.error('Error checking profile completion:', error)
    }
  }

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill]
    
    setSelectedSkills(newSkills)
    freelancerForm.setValue('habilidades', newSkills)
  }

  const onSubmitEmpresa = async (data: CompleteEmpresaForm) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/profile/complete-empresa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Perfil completado com sucesso!')
        router.push('/dashboard/empresa')
      } else {
        toast.error(result.error || 'Erro ao completar perfil')
      }
    } catch (error) {
      toast.error('Erro ao completar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitFreelancer = async (data: CompleteFreelancerForm) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/profile/complete-freelancer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          habilidades: selectedSkills,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Perfil completado com sucesso!')
        router.push('/dashboard/freelancer')
      } else {
        toast.error(result.error || 'Erro ao completar perfil')
      }
    } catch (error) {
      toast.error('Erro ao completar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const isEmpresa = session.user.tipo === 'empresa'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 ${isEmpresa ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {isEmpresa ? (
                <Building className="w-8 h-8 text-blue-600" />
              ) : (
                <User className="w-8 h-8 text-green-600" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete seu perfil
            </h1>
            <p className="text-gray-600">
              Olá, {session.user.name}! Vamos completar algumas informações para melhorar sua experiência.
            </p>
          </div>

          {isEmpresa ? (
            <form onSubmit={empresaForm.handleSubmit(onSubmitEmpresa)} className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Dados da Empresa
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNPJ *
                      </label>
                      <input
                        type="text"
                        {...empresaForm.register('cnpj')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="00.000.000/0000-00"
                      />
                      {empresaForm.formState.errors.cnpj && (
                        <p className="text-red-500 text-sm mt-1">{empresaForm.formState.errors.cnpj.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Setor *
                      </label>
                      <select
                        {...empresaForm.register('setor')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecione o setor</option>
                        {setores.map(setor => (
                          <option key={setor} value={setor}>{setor}</option>
                        ))}
                      </select>
                      {empresaForm.formState.errors.setor && (
                        <p className="text-red-500 text-sm mt-1">{empresaForm.formState.errors.setor.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Razão Social *
                    </label>
                    <input
                      type="text"
                      {...empresaForm.register('razao_social')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nome da empresa"
                    />
                    {empresaForm.formState.errors.razao_social && (
                      <p className="text-red-500 text-sm mt-1">{empresaForm.formState.errors.razao_social.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="inline w-4 h-4 mr-1" />
                        Cidade *
                      </label>
                      <select
                        {...empresaForm.register('cidade')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecione a cidade</option>
                        {cidades.map(cidade => (
                          <option key={cidade} value={cidade}>{cidade}</option>
                        ))}
                      </select>
                      {empresaForm.formState.errors.cidade && (
                        <p className="text-red-500 text-sm mt-1">{empresaForm.formState.errors.cidade.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bairro
                      </label>
                      <input
                        type="text"
                        {...empresaForm.register('bairro')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Centro"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      {...empresaForm.register('website')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.empresa.com"
                    />
                    {empresaForm.formState.errors.website && (
                      <p className="text-red-500 text-sm mt-1">{empresaForm.formState.errors.website.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição da Empresa
                    </label>
                    <textarea
                      {...empresaForm.register('descricao')}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Conte um pouco sobre sua empresa..."
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? 'Salvando...' : 'Completar Perfil'}
              </button>
            </form>
          ) : (
            <form onSubmit={freelancerForm.handleSubmit(onSubmitFreelancer)} className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Dados Profissionais
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CPF *
                      </label>
                      <input
                        type="text"
                        {...freelancerForm.register('cpf')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="000.000.000-00"
                      />
                      {freelancerForm.formState.errors.cpf && (
                        <p className="text-red-500 text-sm mt-1">{freelancerForm.formState.errors.cpf.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Briefcase className="inline w-4 h-4 mr-1" />
                        Profissão *
                      </label>
                      <input
                        type="text"
                        {...freelancerForm.register('profissao')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Desenvolvedor Web"
                      />
                      {freelancerForm.formState.errors.profissao && (
                        <p className="text-red-500 text-sm mt-1">{freelancerForm.formState.errors.profissao.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Anos de Experiência *
                      </label>
                      <input
                        type="number"
                        {...freelancerForm.register('experiencia', { valueAsNumber: true })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="3"
                        min="0"
                      />
                      {freelancerForm.formState.errors.experiencia && (
                        <p className="text-red-500 text-sm mt-1">{freelancerForm.formState.errors.experiencia.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="inline w-4 h-4 mr-1" />
                        Preço por Hora (R$) *
                      </label>
                      <input
                        type="number"
                        {...freelancerForm.register('preco_hora', { valueAsNumber: true })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="80"
                        min="1"
                      />
                      {freelancerForm.formState.errors.preco_hora && (
                        <p className="text-red-500 text-sm mt-1">{freelancerForm.formState.errors.preco_hora.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="inline w-4 h-4 mr-1" />
                        Cidade *
                      </label>
                      <select
                        {...freelancerForm.register('cidade')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Selecione a cidade</option>
                        {cidades.map(cidade => (
                          <option key={cidade} value={cidade}>{cidade}</option>
                        ))}
                      </select>
                      {freelancerForm.formState.errors.cidade && (
                        <p className="text-red-500 text-sm mt-1">{freelancerForm.formState.errors.cidade.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bairro
                      </label>
                      <input
                        type="text"
                        {...freelancerForm.register('bairro')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Centro"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Habilidades * (selecione pelo menos uma)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-4">
                      {habilidades.slice(0, 30).map(skill => (
                        <label key={skill} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={selectedSkills.includes(skill)}
                            onChange={() => handleSkillToggle(skill)}
                            className="mr-2 text-green-600 rounded"
                          />
                          {skill}
                        </label>
                      ))}
                    </div>
                    {freelancerForm.formState.errors.habilidades && (
                      <p className="text-red-500 text-sm mt-1">{freelancerForm.formState.errors.habilidades.message}</p>
                    )}
                    {selectedSkills.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Selecionadas:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedSkills.map(skill => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio Profissional
                    </label>
                    <textarea
                      {...freelancerForm.register('bio')}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Conte um pouco sobre sua experiência..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio/Website
                    </label>
                    <input
                      type="url"
                      {...freelancerForm.register('portfolio_url')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://meuportfolio.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        {...freelancerForm.register('linkedin_url')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="https://linkedin.com/in/seuperfil"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub
                      </label>
                      <input
                        type="url"
                        {...freelancerForm.register('github_url')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="https://github.com/seuusuario"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? 'Salvando...' : 'Completar Perfil'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                if (session?.user?.tipo === 'empresa') {
                  router.push('/dashboard/empresa')
                } else {
                  router.push('/dashboard/freelancer')
                }
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Pular por agora (pode completar depois)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}