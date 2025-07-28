import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from './supabase';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const { data: user, error } = await supabaseAdmin
            .from('usuarios')
            .select('*')
            .eq('email', credentials.email)
            .single();

          if (error || !user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.senha
          );

          if (!isPasswordValid) {
            return null;
          }

          if (!user.ativo || !user.email_verificado) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.nome,
            tipo: user.tipo,
            telefone: user.telefone,
            cidade: user.cidade
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tipo = user.tipo;
        token.telefone = user.telefone;
        token.cidade = user.cidade;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.tipo = token.tipo as string;
        session.user.telefone = token.telefone as string;
        session.user.cidade = token.cidade as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
};