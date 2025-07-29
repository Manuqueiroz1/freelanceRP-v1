'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft, Building, User, Mail, Lock, Phone, UserPlus } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'login' | 'register'>('email')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    userType: 'freelancer' as 'empresa' | 'freelancer'
  })
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') as 'empresa' | 'freelancer' || 'freelancer'

  // Atualizar tipo de usuário baseado na URL
  useState(() => {
    setFormData(prev => ({ ...prev, userType }))
  })

  const checkEmailExists = async (email: string) => {
    try {
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      return data.exists
    } catch (error) {
      console.error('Error checking email:', error)
      return false
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email) return

    setIsLoading(true)
    try {
      const emailExists = await checkEmailExists(formData.email)
      setStep(emailExists ? 'login' : 'register')
    } catch (error) {
      toast.error('Erro ao verificar email')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simular login por enquanto
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Login realizado com sucesso!')
      
      if (formData.userType === 'empresa') {
        router.push('/dashboard/empresa')
      } else {
        router.push('/dashboard/freelancer')
      }
    } catch (error) {
      toast.error('Email ou senha incorretos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/quick-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Conta criada com sucesso!')
        router.push('/complete-profile')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Erro ao criar conta')
      }
    } catch (error) {
      toast.error('Erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  const getTitle = () => {
    if (step === 'email') return 'Bem-vindo ao FreelanceRP'
    if (step === 'login') return userType === 'empresa' ? 'Login - Empresa' : 'Login - Freelancer'
    return userType === 'empresa' ? 'Cadastro - Empresa' : 'Cadastro - Freelancer'
  }

  const getSubtitle = () => {
    if (step === 'email') return 'Digite seu email para continuar'
    if (step === 'login') return 'Digite sua senha para acessar'
    return 'Complete seus dados para criar sua conta'
  }

  const getIcon = () => {
    if (step === 'email') return <Mail className="w-8 h-8 text-blue-600" />
    if (userType === 'empresa') return <Building className="w-8 h-8 text-blue-600" />
    return <User className="w-8 h-8 text-green-600" />
  }

  const getColorClasses = () => {
    if (userType === 'empresa') return {
      bg: 'from-blue-50 to-indigo-100',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      link: 'text-blue-600 hover:text-blue-700',
      iconBg: 'bg-blue-100'
    }
    return {
      bg: 'from-green-50 to-emerald-100',
      button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      link: 'text-green-600 hover:text-green-700',
      iconBg: 'bg-green-100'
    }
  }

  const colors = getColorClasses()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex items-center justify-center p-4`}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <a 
              href="/"
              className={`inline-flex items-center ${colors.link} mb-4`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </a>
            
            <div className={`w-16 h-16 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {getIcon()}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getTitle()}
            </h1>
            <p className="text-gray-600">
              {getSubtitle()}
            </p>
          </div>

          {/* Etapa 1: Verificação de Email */}
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="seu@email.com"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de usuário
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: 'empresa' }))}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      formData.userType === 'empresa'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Building className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Empresa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: 'freelancer' }))}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      formData.userType === 'freelancer'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <User className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Freelancer</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.email}
                className={`w-full ${colors.button} text-white py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium`}
              >
                {isLoading ? 'Verificando...' : 'Continuar'}
              </button>
            </form>
          )}

          {/* Etapa 2: Login */}
          {step === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-sm text-blue-600 hover:text-blue-700 mt-1"
                >
                  Alterar email
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="inline w-4 h-4 mr-1" />
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Sua senha"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Lembrar de mim
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className={`text-sm ${colors.link}`}
                >
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.password}
                className={`w-full ${colors.button} text-white py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium`}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          )}

          {/* Etapa 3: Cadastro Rápido */}
          {step === 'register' && (
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-sm text-blue-600 hover:text-blue-700 mt-1"
                >
                  Alterar email
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Seu nome completo"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="(16) 99999-9999"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="inline w-4 h-4 mr-1" />
                  Criar Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 ${formData.userType === 'empresa' ? 'bg-blue-100' : 'bg-green-100'} rounded-lg`}>
                    {formData.userType === 'empresa' ? (
                      <Building className={`w-5 h-5 ${formData.userType === 'empresa' ? 'text-blue-600' : 'text-green-600'}`} />
                    ) : (
                      <User className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {formData.userType === 'empresa' ? 'Conta Empresarial' : 'Conta Freelancer'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formData.userType === 'empresa' 
                        ? 'Para contratar freelancers' 
                        : 'Para encontrar projetos'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.name || !formData.phone || !formData.password}
                className={`w-full ${colors.button} text-white py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center`}
              >
                {isLoading ? (
                  'Criando conta...'
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Criar Conta
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Ao criar sua conta, você concorda com nossos{' '}
                <a href="/termos-uso" className="text-blue-600 hover:text-blue-700">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="/politica-privacidade" className="text-blue-600 hover:text-blue-700">
                  Política de Privacidade
                </a>
              </p>
            </form>
          )}

          {/* Opção para trocar tipo de usuário */}
          {step !== 'email' && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm mb-2">
                Tipo de conta errado?
              </p>
              <div className="flex space-x-2">
                <a
                  href="/login?type=empresa"
                  className={`flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center ${
                    userType === 'empresa' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'text-gray-600'
                  }`}
                >
                  <Building className="w-4 h-4 inline mr-1" />
                  Empresa
                </a>
                <a
                  href="/login?type=freelancer"
                  className={`flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center ${
                    userType === 'freelancer' ? 'bg-green-50 border-green-300 text-green-700' : 'text-gray-600'
                  }`}
                >
                  <User className="w-4 h-4 inline mr-1" />
                  Freelancer
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}