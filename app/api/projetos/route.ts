import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { projetoSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoria = searchParams.get('categoria')
    const orcamento_min = searchParams.get('orcamento_min')
    const orcamento_max = searchParams.get('orcamento_max')
    const modalidade = searchParams.get('modalidade')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    let query = supabase
      .from('projetos')
      .select(`
        *,
        empresas (
          razao_social,
          logo_url,
          usuarios (nome, cidade)
        )
      `)
      .eq('status', 'ativo')
      .order('created_at', { ascending: false })

    // Apply filters
    if (categoria) {
      query = query.eq('categoria', categoria)
    }
    if (orcamento_min) {
      query = query.gte('orcamento_min', parseInt(orcamento_min))
    }
    if (orcamento_max) {
      query = query.lte('orcamento_max', parseInt(orcamento_max))
    }
    if (modalidade) {
      query = query.eq('modalidade', modalidade)
    }
    if (search) {
      query = query.or(`titulo.ilike.%${search}%,descricao.ilike.%${search}%`)
    }

    const { data: projetos, error, count } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar projetos' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      projetos,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

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
    const validatedData = projetoSchema.parse(body)

    // Get empresa_id from user
    const { data: empresa } = await supabase
      .from('empresas')
      .select('id')
      .eq('user_id', session.user.id)
      .single()

    if (!empresa) {
      return NextResponse.json(
        { error: 'Perfil da empresa não encontrado' },
        { status: 404 }
      )
    }

    const { data: projeto, error } = await supabase
      .from('projetos')
      .insert({
        empresa_id: empresa.id,
        titulo: validatedData.titulo,
        descricao: validatedData.descricao,
        categoria: validatedData.categoria,
        orcamento_min: validatedData.orcamento_min,
        orcamento_max: validatedData.orcamento_max,
        prazo: validatedData.prazo,
        requisitos: validatedData.requisitos,
        modalidade: validatedData.modalidade,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao criar projeto' },
        { status: 500 }
      )
    }

    return NextResponse.json(projeto, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    
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