import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    if (session.user.tipo === 'empresa') {
      // Verificar se empresa tem CNPJ preenchido
      const { data: empresa } = await supabase
        .from('empresas')
        .select('cnpj')
        .eq('user_id', session.user.id)
        .single()

      return NextResponse.json({
        isComplete: !!(empresa?.cnpj && empresa.cnpj.length > 0)
      })
    } else {
      // Verificar se freelancer tem CPF preenchido
      const { data: freelancer } = await supabase
        .from('freelancers')
        .select('cpf')
        .eq('user_id', session.user.id)
        .single()

      return NextResponse.json({
        isComplete: !!(freelancer?.cpf && freelancer.cpf.length > 0)
      })
    }
  } catch (error) {
    console.error('Check completion error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}