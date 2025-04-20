import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth/options";

// En mode export statique, nous ne pouvons pas utiliser force-dynamic
export const dynamic = 'auto';

// Créer le gestionnaire NextAuth
const handler = NextAuth(authOptions);

// Exporter les gestionnaires HTTP
export { handler as GET, handler as POST }; 