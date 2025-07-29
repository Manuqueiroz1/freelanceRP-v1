import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    const { data: user } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    return NextResponse.json({ exists: !!user })
  } catch (error) {
    console.error('Error checking email:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}