import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const quickRegisterSchema = z.object({
  email: z.string().email('Email inválido'),
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  telefone: z.string().min(10, 'Telefone inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  tipo: z.enum(['empresa', 'freelancer'], { required_error: 'Tipo de usuário é obrigatório' }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = quickRegisterSchema.parse(body)

    // Verificar se o usuário já existe
    const { data: existingUser } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', validatedData.email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Criar usuário
    const { data: user, error: userError } = await supabase
      .from('usuarios')
      .insert({
        email: validatedData.email,
        senha: hashedPassword,
        tipo: validatedData.tipo,
        nome: validatedData.nome,
        telefone: validatedData.telefone,
        cidade: 'Ribeirão Preto, SP', // Cidade padrão
        ativo: true,
        email_verificado: true, // Para cadastro rápido, consideramos verificado
      })
      .select()
      .single()

    if (userError) {
      console.error('User creation error:', userError)
      return NextResponse.json(
        { error: 'Erro ao criar usuário' },
        { status: 500 }
      )
    }

    // Criar perfil específico baseado no tipo
    if (validatedData.tipo === 'empresa') {
      const { error: empresaError } = await supabase
        .from('empresas')
        .insert({
          user_id: user.id,
          cnpj: '', // Será preenchido depois
          razao_social: validatedData.nome, // Usar nome como razão social inicial
          setor: 'Outros', // Setor padrão
        })

      if (empresaError) {
        console.error('Company profile creation error:', empresaError)
        // Rollback: deletar usuário criado
        await supabase.from('usuarios').delete().eq('id', user.id)
        return NextResponse.json(
          { error: 'Erro ao criar perfil da empresa' },
          { status: 500 }
        )
      }
    } else {
      const { error: freelancerError } = await supabase
        .from('freelancers')
        .insert({
          user_id: user.id,
          cpf: '', // Será preenchido depois
          profissao: 'Profissional', // Profissão padrão
          experiencia: 0,
          habilidades: [],
          preco_hora: 50, // Preço padrão
          disponivel: true,
        })

      if (freelancerError) {
        console.error('Freelancer profile creation error:', freelancerError)
        // Rollback: deletar usuário criado
        await supabase.from('usuarios').delete().eq('id', user.id)
        return NextResponse.json(
          { error: 'Erro ao criar perfil do freelancer' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { 
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          email: user.email,
          nome: user.nome,
          tipo: user.tipo
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Quick registration error:', error)
    
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