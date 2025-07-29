import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      tipo: string
      telefone?: string
      cidade?: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    tipo: string
    telefone?: string
    cidade?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    tipo: string
    telefone?: string
    cidade?: string
  }
}