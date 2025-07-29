import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone, password, userType } = await request.json()

    // Validações básicas
    if (!email || !name || !phone || !password || !userType) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Verificar se email já existe
    const { data: existingUser } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12)

    // Criar usuário
    const { data: user, error: userError } = await supabase
      .from('usuarios')
      .insert({
        email: email.toLowerCase(),
        senha: hashedPassword,
        tipo: userType,
        nome: name,
        telefone: phone,
        cidade: 'Ribeirão Preto, SP', // Padrão
        ativo: true,
        email_verificado: true // Por enquanto, sem verificação
      })
      .select()
      .single()

    if (userError) {
      console.error('Error creating user:', userError)
      return NextResponse.json(
        { error: 'Erro ao criar usuário' },
        { status: 500 }
      )
    }

    // Enviar email de boas-vindas
    try {
      await sendWelcomeEmail(email, name, userType)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Não falhar o registro se o email falhar
    }

    return NextResponse.json(
      { 
        message: 'Conta criada com sucesso',
        user: {
          id: user.id,
          email: user.email,
          name: user.nome,
          tipo: user.tipo
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}