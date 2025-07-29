'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { Eye, EyeOff, ArrowLeft, User, Building, Mail, Phone, Lock } from 'lucide-react'
import { z } from 'zod'

// Schema para verificação de email
const emailCheckSchema = z.object({
  email: z.string().email('Email inválido'),
})

// Schema para login existente
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

// Schema para cadastro rápido
const quickRegisterSchema = z.object({
  email: z.string().email('Email inválido'),
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  telefone: z.string().min(10, 'Telefone inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  tipo: z.enum(['empresa', 'freelancer'], { required_error: 'Selecione o tipo de usuário' }),
})

type EmailCheckForm = z.infer<typeof emailCheckSchema>
type LoginForm = z.infer<typeof loginSchema>
type QuickRegisterForm = z.infer<typeof quickRegisterSchema>

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'login' | 'register'>('email')
  const [userEmail, setUserEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Form para verificação de email
  const emailForm = useForm<EmailCheckForm>({
    resolver: zodResolver(emailCheckSchema),
  })

  // Form para login
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  // Form para cadastro rápido
  const registerForm = useForm<QuickRegisterForm>({
    resolver: zodResolver(quickRegisterSchema),
  })

  // Verificar se email existe
  const checkEmail = async (data: EmailCheckForm) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      })

      const result = await response.json()

      if (response.ok) {
        setUserEmail(data.email)
        if (result.exists) {
          // Usuário existe, ir para tela de login
          loginForm.setValue('email', data.email)
          setStep('login')
        } else {
          // Usuário não existe, ir para cadastro rápido
          registerForm.setValue('email', data.email)
          setStep('register')
        }
      } else {
        toast.error(result.error || 'Erro ao verificar email')
      }
    } catch (error) {
      toast.error('Erro ao verificar email')
    } finally {
      setIsLoading(false)
    }
  }

  // Login de usuário existente
  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true)
    
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Email ou senha incorretos')
        return
      }

      toast.success('Login realizado com sucesso!')
      
      // Redirecionar baseado no tipo de usuário
      // Vamos buscar o tipo do usuário após o login
      const response = await fetch('/api/auth/user-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      })
      
      const userType = await response.json()
      
      if (userType.tipo === 'empresa') {
        router.push('/dashboard/empresa')
      } else {
        router.push('/dashboard/freelancer')
      }
    } catch (error) {
      toast.error('Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  // Cadastro rápido
  const handleQuickRegister = async (data: QuickRegisterForm) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/quick-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || 'Erro ao criar conta')
        return
      }

      toast.success('Conta criada com sucesso!')
      
      // Fazer login automático
      const loginResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (loginResult?.error) {
        toast.error('Conta criada, mas erro no login. Tente fazer login manualmente.')
        setStep('login')
        return
      }

      // Redirecionar para dashboard apropriado
      if (data.tipo === 'empresa') {
        router.push('/dashboard/empresa')
      } else {
        router.push('/dashboard/freelancer')
      }
    } catch (error) {
      toast.error('Erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    if (step === 'login' || step === 'register') {
      setStep('email')
      setUserEmail('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
            
            {step === 'email' && (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Acesse sua conta
                </h1>
                <p className="text-gray-600">
                  Digite seu email para continuar
                </p>
              </>
            )}
            
            {step === 'login' && (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Bem-vindo de volta!
                </h1>
                <p className="text-gray-600">
                  Digite sua senha para {userEmail}
                </p>
              </>
            )}
            
            {step === 'register' && (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Criar nova conta
                </h1>
                <p className="text-gray-600">
                  Complete seus dados para {userEmail}
                </p>
              </>
            )}
          </div>

          {/* Etapa 1: Verificação de Email */}
          {step === 'email' && (
            <form onSubmit={emailForm.handleSubmit(checkEmail)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  {...emailForm.register('email')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="seu@email.com"
                  autoFocus
                />
                {emailForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{emailForm.formState.errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? 'Verificando...' : 'Continuar'}
              </button>
            </form>
          )}

          {/* Etapa 2: Login para usuário existente */}
          {step === 'login' && (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...loginForm.register('email')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="inline w-4 h-4 mr-1" />
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...loginForm.register('password')}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Sua senha"
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
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  ← Voltar
                </button>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          )}

          {/* Etapa 3: Cadastro rápido para novo usuário */}
          {step === 'register' && (
            <form onSubmit={registerForm.handleSubmit(handleQuickRegister)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...registerForm.register('email')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  {...registerForm.register('nome')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Seu nome completo"
                  autoFocus
                />
                {registerForm.formState.errors.nome && (
                  <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.nome.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Telefone *
                </label>
                <input
                  type="tel"
                  {...registerForm.register('telefone')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="(16) 99999-9999"
                />
                {registerForm.formState.errors.telefone && (
                  <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.telefone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="inline w-4 h-4 mr-1" />
                  Criar Senha *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...registerForm.register('password')}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de Usuário *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="relative">
                    <input
                      type="radio"
                      {...registerForm.register('tipo')}
                      value="empresa"
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-50">
                      <Building className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">Empresa</div>
                        <div className="text-xs text-gray-500">Contratar freelancers</div>
                      </div>
                    </div>
                  </label>
                  
                  <label className="relative">
                    <input
                      type="radio"
                      {...registerForm.register('tipo')}
                      value="freelancer"
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors peer-checked:border-green-500 peer-checked:bg-green-50">
                      <User className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">Freelancer</div>
                        <div className="text-xs text-gray-500">Encontrar projetos</div>
                      </div>
                    </div>
                  </label>
                </div>
                {registerForm.formState.errors.tipo && (
                  <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.tipo.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  ← Voltar
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? 'Criando conta...' : 'Criar Conta e Entrar'}
              </button>
            </form>
          )}

          {/* Informação adicional */}
          {step === 'register' && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Cadastro rápido:</strong> Você pode completar seu perfil após entrar na plataforma.
              </p>
            </div>
          )}

          {/* Link para cadastro completo */}
          {step === 'email' && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Prefere fazer um cadastro completo?</p>
              <div className="space-y-3">
                <Link
                  href="/register/empresa"
                  className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Cadastro Completo - Empresa
                </Link>
                <Link
                  href="/register/freelancer"
                  className="block w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Cadastro Completo - Freelancer
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}