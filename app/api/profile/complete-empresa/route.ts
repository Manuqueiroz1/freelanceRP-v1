import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'
import { validateCNPJ } from '@/lib/validations'

const completeEmpresaSchema = z.object({
  cnpj: z.string().refine(validateCNPJ, 'CNPJ inválido'),
  razao_social: z.string().min(2, 'Razão social é obrigatória'),
  setor: z.string().min(1, 'Setor é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  bairro: z.string().optional(),
  descricao: z.string().optional(),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.tipo !== 'empresa') {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = completeEmpresaSchema.parse(body)

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

    // Atualizar dados da empresa
    const { error: empresaError } = await supabase
      .from('empresas')
      .update({
        cnpj: validatedData.cnpj,
        razao_social: validatedData.razao_social,
        setor: validatedData.setor,
        descricao: validatedData.descricao,
        website: validatedData.website,
      })
      .eq('user_id', session.user.id)

    if (empresaError) {
      console.error('Company update error:', empresaError)
      return NextResponse.json(
        { error: 'Erro ao atualizar dados da empresa' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Perfil completado com sucesso'
    })
  } catch (error) {
    console.error('Complete empresa profile error:', error)
    
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