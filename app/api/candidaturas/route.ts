import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { candidaturaSchema } from '@/lib/validations'

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
    const validatedData = candidaturaSchema.parse(body)

    // Get freelancer_id from user
    const { data: freelancer } = await supabase
      .from('freelancers')
      .select('id')
      .eq('user_id', session.user.id)
      .single()

    if (!freelancer) {
      return NextResponse.json(
        { error: 'Perfil do freelancer não encontrado' },
        { status: 404 }
      )
    }

    // Check if already applied
    const { data: existingApplication } = await supabase
      .from('candidaturas')
      .select('id')
      .eq('projeto_id', body.projeto_id)
      .eq('freelancer_id', freelancer.id)
      .single()

    if (existingApplication) {
      return NextResponse.json(
        { error: 'Você já se candidatou a este projeto' },
        { status: 400 }
      )
    }

    const { data: candidatura, error } = await supabase
      .from('candidaturas')
      .insert({
        projeto_id: body.projeto_id,
        freelancer_id: freelancer.id,
        proposta: validatedData.proposta,
        valor_proposto: validatedData.valor_proposto,
        prazo_proposto: validatedData.prazo_proposto,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao criar candidatura' },
        { status: 500 }
      )
    }

    return NextResponse.json(candidatura, { status: 201 })
  } catch (error) {
    console.error('Error creating application:', error)
    
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