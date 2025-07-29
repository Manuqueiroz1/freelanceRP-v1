import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/lib/email'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    // Verificar se o usuário existe
    const { data: user, error } = await supabase
      .from('usuarios')
      .select('id, nome, email')
      .eq('email', email)
      .single()

    if (error || !user) {
      // Por segurança, sempre retornamos sucesso mesmo se o email não existir
      return NextResponse.json({
        message: 'Se o email existir em nossa base, você receberá um link de recuperação'
      })
    }

    // Gerar token de reset
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hora

    // Salvar token no banco (você precisará criar uma tabela para isso)
    // Por enquanto, vamos simular o envio do email
    
    try {
      await sendPasswordResetEmail(user.email, user.nome, resetToken)
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError)
      return NextResponse.json(
        { error: 'Erro ao enviar email de recuperação' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Email de recuperação enviado com sucesso'
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    
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