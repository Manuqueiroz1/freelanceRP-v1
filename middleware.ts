import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/login',
          '/register/empresa',
          '/register/freelancer',
          '/forgot-password',
          '/projetos',
          '/como-funciona',
          '/termos-uso',
          '/politica-privacidade',
          '/contato'
        ]
        
        // Check if the route is public
        if (publicRoutes.some(route => pathname.startsWith(route))) {
          return true
        }
        
        // Check if user is authenticated for protected routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}