import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendWelcomeEmail(email: string, nome: string, tipo: string) {
  const tipoLabel = tipo === 'empresa' ? 'Empresa' : 'Freelancer'
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Bem-vindo ao FreelanceRP, ${nome}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">FreelanceRP</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Conectando talentos em Ribeirão Preto</p>
        </div>
        
        <div style="padding: 40px 20px; background: white;">
          <h2 style="color: #1F2937; margin: 0 0 20px 0;">Olá, ${nome}!</h2>
          
          <p style="color: #4B5563; line-height: 1.6; margin: 0 0 20px 0;">
            Seja muito bem-vindo(a) ao FreelanceRP! Sua conta como <strong>${tipoLabel}</strong> foi criada com sucesso.
          </p>
          
          ${tipo === 'empresa' ? `
            <p style="color: #4B5563; line-height: 1.6; margin: 0 0 20px 0;">
              Agora você pode publicar projetos e encontrar os melhores freelancers da região de Ribeirão Preto para trabalhar com sua empresa.
            </p>
            
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px;">Próximos passos:</h3>
              <ul style="color: #4B5563; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Complete seu perfil da empresa</li>
                <li style="margin-bottom: 8px;">Publique seu primeiro projeto</li>
                <li style="margin-bottom: 8px;">Explore os freelancers disponíveis</li>
              </ul>
            </div>
          ` : `
            <p style="color: #4B5563; line-height: 1.6; margin: 0 0 20px 0;">
              Agora você pode se candidatar a projetos incríveis e construir sua carreira como freelancer na região de Ribeirão Preto.
            </p>
            
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px;">Próximos passos:</h3>
              <ul style="color: #4B5563; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Complete seu perfil profissional</li>
                <li style="margin-bottom: 8px;">Explore os projetos disponíveis</li>
                <li style="margin-bottom: 8px;">Candidate-se aos projetos que combinam com você</li>
              </ul>
            </div>
          `}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/login" 
               style="background: #3B82F6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Acessar Plataforma
            </a>
          </div>
          
          <p style="color: #6B7280; font-size: 14px; line-height: 1.5; margin: 30px 0 0 0;">
            Se você tiver alguma dúvida, entre em contato conosco através do email 
            <a href="mailto:contato@freelancerp.com" style="color: #3B82F6;">contato@freelancerp.com</a>
          </p>
        </div>
        
        <div style="background: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
          <p style="color: #6B7280; font-size: 12px; margin: 0;">
            © 2024 FreelanceRP. Todos os direitos reservados.
          </p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

export async function sendApplicationNotification(
  empresaEmail: string,
  empresaNome: string,
  freelancerNome: string,
  projetoTitulo: string,
  projetoId: string
) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: empresaEmail,
    subject: `Nova candidatura para "${projetoTitulo}"`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">FreelanceRP</h1>
        </div>
        
        <div style="padding: 40px 20px; background: white;">
          <h2 style="color: #1F2937; margin: 0 0 20px 0;">Olá, ${empresaNome}!</h2>
          
          <p style="color: #4B5563; line-height: 1.6; margin: 0 0 20px 0;">
            Você recebeu uma nova candidatura para o projeto <strong>"${projetoTitulo}"</strong>.
          </p>
          
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1F2937; margin: 0 0 10px 0;">Freelancer:</h3>
            <p style="color: #4B5563; margin: 0; font-size: 18px; font-weight: bold;">${freelancerNome}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/projeto/${projetoId}" 
               style="background: #3B82F6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Ver Candidatura
            </a>
          </div>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}