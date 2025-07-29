import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'
import { validateCPF } from '@/lib/validations'

const completeFreelancerSchema = z.object({
  cpf: z.string().refine(validateCPF, 'CPF inválido'),
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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.tipo !== 'freelancer') {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = completeFreelancerSchema.parse(body)

    // Atualizar dados do usuário
    const { error: userError } = await supabase
      .from('usuarios')
      .update({
        cidade: validatedData.cidade,
        bairro: validatedData.bairro,
      })
      .eq('id', session.user.id)

    if (userError) {
      console.error('User update error:', userError)
      return NextResponse.json(
        { error: 'Erro ao atualizar dados do usuário' },
        { status: 500 }
      )
    }

    // Atualizar dados do freelancer
    const { error: freelancerError } = await supabase
      .from('freelancers')
      .update({
        cpf: validatedData.cpf,
        profissao: validatedData.profissao,
        experiencia: validatedData.experiencia,
        preco_hora: validatedData.preco_hora,
        habilidades: validatedData.habilidades,
        bio: validatedData.bio,
        portfolio_url: validatedData.portfolio_url,
        linkedin_url: validatedData.linkedin_url,
        github_url: validatedData.github_url,
      })
      .eq('user_id', session.user.id)

    if (freelancerError) {
      console.error('Freelancer update error:', freelancerError)
      return NextResponse.json(
        { error: 'Erro ao atualizar dados do freelancer' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Perfil completado com sucesso'
    })
  } catch (error) {
    console.error('Complete freelancer profile error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}