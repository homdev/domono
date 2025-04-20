import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth/options";

// En mode export statique, nous ne pouvons pas utiliser force-dynamic
export const dynamic = 'auto';

// Fonction requise pour les routes dynamiques lors d'un export statique
export function generateStaticParams() {
  // Ne génère aucun chemin statique pour cette route
  return [];
}

// Configuré pour être ignoré dans un export statique
export const config = {
  unstable_excludeFiles: true
};

// Créer le gestionnaire NextAuth
const handler = NextAuth(authOptions);

// Exporter les gestionnaires HTTP
export { handler as GET, handler as POST }; 