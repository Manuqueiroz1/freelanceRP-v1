import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email('Email inválido'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = emailSchema.parse(body)

    // Verificar se o usuário existe
    const { data: user, error } = await supabase
      .from('usuarios')
      .select('id, email, tipo')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 é o código para "não encontrado"
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      exists: !!user,
      tipo: user?.tipo || null
    })
  } catch (error) {
    console.error('Check email error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}