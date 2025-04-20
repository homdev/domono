import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth/options";

// En mode export statique, nous devons spécifier auto au lieu de force-dynamic
export const dynamic = 'force-static';

// Désactiver la génération statique pour cette route en mode exportation
export function generateStaticParams() {
  return [
    { nextauth: ['signin'] },
    { nextauth: ['signout'] },
    { nextauth: ['callback'] }, 
    { nextauth: ['session'] },
    { nextauth: ['csrf'] }
  ];
}

// Créer le gestionnaire NextAuth
const handler = NextAuth(authOptions);

// Exporter les gestionnaires HTTP
export { handler as GET, handler as POST }; 