import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase'
import { empresaSchema, freelancerSchema } from '@/lib/validations'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tipo } = body

    // Validate based on user type
    let validatedData
    if (tipo === 'empresa') {
      validatedData = empresaSchema.parse(body)
    } else if (tipo === 'freelancer') {
      validatedData = freelancerSchema.parse(body)
    } else {
      return NextResponse.json(
        { error: 'Tipo de usuário inválido' },
        { status: 400 }
      )
    }

    // Check if user already exists
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

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.senha, 12)

    // Create user
    const { data: user, error: userError } = await supabase
      .from('usuarios')
      .insert({
        email: validatedData.email,
        senha: hashedPassword,
        tipo: validatedData.tipo || tipo,
        nome: validatedData.nome,
        telefone: validatedData.telefone,
        cidade: validatedData.cidade,
        bairro: validatedData.bairro,
      })
      .select()
      .single()

    if (userError) {
      return NextResponse.json(
        { error: 'Erro ao criar usuário' },
        { status: 500 }
      )
    }

    // Create specific profile
    if (tipo === 'empresa') {
      const { error: empresaError } = await supabase
        .from('empresas')
        .insert({
          user_id: user.id,
          cnpj: validatedData.cnpj,
          razao_social: validatedData.razao_social,
          descricao: validatedData.descricao,
          website: validatedData.website,
          setor: validatedData.setor,
        })

      if (empresaError) {
        // Rollback user creation
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
          cpf: validatedData.cpf,
          profissao: validatedData.profissao,
          experiencia: validatedData.experiencia,
          portfolio_url: validatedData.portfolio_url,
          habilidades: validatedData.habilidades,
          preco_hora: validatedData.preco_hora,
          bio: validatedData.bio,
          linkedin_url: validatedData.linkedin_url,
          github_url: validatedData.github_url,
        })

      if (freelancerError) {
        // Rollback user creation
        await supabase.from('usuarios').delete().eq('id', user.id)
        return NextResponse.json(
          { error: 'Erro ao criar perfil do freelancer' },
          { status: 500 }
        )
      }
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.nome, tipo)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't fail registration if email fails
    }

    return NextResponse.json(
      { message: 'Usuário criado com sucesso' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}