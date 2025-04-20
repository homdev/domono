import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth/options";

// Indiquer à Next.js que cette route est dynamique
export const dynamic = 'force-dynamic';

// Créer le gestionnaire NextAuth
const handler = NextAuth(authOptions);

// Exporter les gestionnaires HTTP
export { handler as GET, handler as POST }; 