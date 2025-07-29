'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { Eye, EyeOff, ArrowLeft, Building, User, Mail, Lock } from 'lucide-react'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') // 'empresa' ou 'freelancer'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

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
      
      // Redirecionar baseado no tipo de usuário esperado ou detectado
      if (userType === 'empresa') {
        router.push('/dashboard/empresa')
      } else if (userType === 'freelancer') {
        router.push('/dashboard/freelancer')
      } else {
        // Se não especificado, detectar tipo do usuário
        const response = await fetch('/api/auth/session')
        const session = await response.json()
        
        if (session?.user?.tipo === 'empresa') {
          router.push('/dashboard/empresa')
        } else {
          router.push('/dashboard/freelancer')
        }
      }
    } catch (error) {
      toast.error('Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  const getTitle = () => {
    if (userType === 'empresa') return 'Login - Empresa'
    if (userType === 'freelancer') return 'Login - Freelancer'
    return 'Fazer Login'
  }

  const getSubtitle = () => {
    if (userType === 'empresa') return 'Acesse sua conta empresarial'
    if (userType === 'freelancer') return 'Acesse sua conta de freelancer'
    return 'Entre na sua conta'
  }

  const getRegisterLink = () => {
    if (userType === 'empresa') return '/register/empresa'
    if (userType === 'freelancer') return '/register/freelancer'
    return '/register/empresa' // default
  }

  const getRegisterText = () => {
    if (userType === 'empresa') return 'Cadastrar empresa'
    if (userType === 'freelancer') return 'Cadastrar como freelancer'
    return 'Criar conta'
  }

  const getIcon = () => {
    if (userType === 'empresa') return <Building className="w-8 h-8 text-blue-600" />
    if (userType === 'freelancer') return <User className="w-8 h-8 text-green-600" />
    return <User className="w-8 h-8 text-blue-600" />
  }

  const getColorClasses = () => {
    if (userType === 'empresa') return {
      bg: 'from-blue-50 to-indigo-100',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      link: 'text-blue-600 hover:text-blue-700',
      iconBg: 'bg-blue-100'
    }
    if (userType === 'freelancer') return {
      bg: 'from-green-50 to-emerald-100',
      button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      link: 'text-green-600 hover:text-green-700',
      iconBg: 'bg-green-100'
    }
    return {
      bg: 'from-blue-50 to-indigo-100',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      link: 'text-blue-600 hover:text-blue-700',
      iconBg: 'bg-blue-100'
    }
  }

  const colors = getColorClasses()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex items-center justify-center p-4`}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Link 
              href="/"
              className={`inline-flex items-center ${colors.link} mb-4`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
            
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

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="seu@email.com"
                autoFocus
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-1" />
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
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
              <Link
                href="/forgot-password"
                className={`text-sm ${colors.link}`}
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${colors.button} text-white py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium focus:ring-2 focus:ring-offset-2`}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Ainda não tem uma conta?
            </p>
            <Link
              href={getRegisterLink()}
              className={`block w-full ${colors.button} text-white py-3 px-4 rounded-lg transition-colors font-medium text-center`}
            >
              {getRegisterText()}
            </Link>
          </div>

          {/* Opção para trocar tipo de usuário */}
          {userType && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm mb-2">
                Tipo de conta errado?
              </p>
              <div className="flex space-x-2">
                <Link
                  href="/login?type=empresa"
                  className={`flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center ${
                    userType === 'empresa' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'text-gray-600'
                  }`}
                >
                  <Building className="w-4 h-4 inline mr-1" />
                  Empresa
                </Link>
                <Link
                  href="/login?type=freelancer"
                  className={`flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center ${
                    userType === 'freelancer' ? 'bg-green-50 border-green-300 text-green-700' : 'text-gray-600'
                  }`}
                >
                  <User className="w-4 h-4 inline mr-1" />
                  Freelancer
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}