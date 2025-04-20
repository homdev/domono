import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { UserRole } from "@/lib/prisma-types";
import { hasRole } from "@/lib/auth/role";

// En haut du fichier, après les imports
export const dynamic = 'force-static';

// Désactiver la génération statique pour cette route en mode exportation
export function generateStaticParams() {
  return [];  // Route API qui sera gérée par les fonctions Netlify
}

// GET - Récupérer tous les utilisateurs (admin seulement)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Vérifier l'authentification et les permissions
    if (!session) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }
    
    // Seuls les administrateurs peuvent accéder à cette route
    const isAdmin = await hasRole("ADMIN");
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }
    
    // Paramètres de pagination et filtres
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const role = searchParams.get("role") as UserRole | null;
    const search = searchParams.get("search");
    
    const skip = (page - 1) * limit;
    
    // Construire la requête avec filtres
    const whereClause: any = {};
    
    if (role) {
      whereClause.role = role;
    }
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Récupérer les utilisateurs
    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        image: true,
        // Ne pas inclure le mot de passe
        _count: {
          select: {
            quotes: true,
            assignedQuotes: true
          }
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    });
    
    // Compter le nombre total d'utilisateurs
    const total = await prisma.user.count({ where: whereClause });
    
    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des utilisateurs" },
      { status: 500 }
    );
  }
} 