import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { UserRole } from "@/lib/prisma-types";
import { hasRole } from "@/lib/auth/role";
import bcrypt from "bcrypt";

// Indiquer à Next.js que cette route est dynamique
export const dynamic = 'force-dynamic';

// GET - Obtenir un utilisateur spécifique
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }
    
    const { id } = params;
    
    // Les utilisateurs peuvent voir leur propre profil, les admins peuvent voir tous les profils
    if (session.user.id !== id && !(await hasRole("ADMIN"))) {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }
    
    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id },
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
        },
        quotes: {
          take: 5,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            service: true,
            status: true,
            createdAt: true
          }
        },
        assignedQuotes: session.user.role === "ADMIN" || session.user.role === "TECHNICIAN" ? {
          take: 5,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            service: true,
            status: true,
            createdAt: true
          }
        } : undefined
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération de l'utilisateur" },
      { status: 500 }
    );
  }
}

// PATCH - Mettre à jour un utilisateur
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }
    
    const { id } = params;
    const body = await request.json();
    
    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }
    
    // Vérifier les permissions
    const isAdmin = await hasRole("ADMIN");
    const isSelf = session.user.id === id;
    
    if (!isAdmin && !isSelf) {
      return NextResponse.json(
        { error: "Vous n'avez pas les permissions pour modifier cet utilisateur" },
        { status: 403 }
      );
    }
    
    // Construire l'objet de mise à jour
    const updateData: any = {};
    
    // Champs que tous les utilisateurs peuvent modifier pour eux-mêmes
    if (isSelf) {
      if (body.name) updateData.name = body.name;
      if (body.email && body.email !== existingUser.email) {
        // Vérifier si l'email est déjà utilisé
        const emailExists = await prisma.user.findUnique({
          where: { email: body.email }
        });
        
        if (emailExists) {
          return NextResponse.json(
            { error: "Cet email est déjà utilisé" },
            { status: 400 }
          );
        }
        
        updateData.email = body.email;
      }
      
      // Mise à jour du mot de passe
      if (body.currentPassword && body.newPassword) {
        // Vérifier l'ancien mot de passe
        const isPasswordValid = await bcrypt.compare(
          body.currentPassword,
          existingUser.password || ""
        );
        
        if (!isPasswordValid) {
          return NextResponse.json(
            { error: "Mot de passe actuel incorrect" },
            { status: 400 }
          );
        }
        
        // Crypter le nouveau mot de passe
        updateData.password = await bcrypt.hash(body.newPassword, 12);
      }
    }
    
    // Champs que seuls les administrateurs peuvent modifier
    if (isAdmin) {
      // Les valeurs possibles de UserRole
      const USER_ROLES = ["USER", "TECHNICIAN", "ADMIN"];
      
      if (body.role && USER_ROLES.includes(body.role)) {
        updateData.role = body.role;
      }
      
      // Un admin peut définir un nouveau mot de passe sans connaître l'ancien
      if (body.adminSetPassword && !body.currentPassword) {
        updateData.password = await bcrypt.hash(body.adminSetPassword, 12);
      }
    }
    
    // Si aucune donnée à mettre à jour
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Aucune donnée valide fournie pour la mise à jour" },
        { status: 400 }
      );
    }
    
    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        image: true
      }
    });
    
    return NextResponse.json({
      message: "Utilisateur mis à jour avec succès",
      user: updatedUser
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour de l'utilisateur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un utilisateur
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }
    
    // Seuls les administrateurs peuvent supprimer des utilisateurs
    const isAdmin = await hasRole("ADMIN");
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }
    
    const { id } = params;
    
    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }
    
    // Empêcher la suppression de son propre compte
    if (id === session.user.id) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas supprimer votre propre compte" },
        { status: 400 }
      );
    }
    
    // Supprimer l'utilisateur
    await prisma.user.delete({
      where: { id }
    });
    
    return NextResponse.json({
      message: "Utilisateur supprimé avec succès"
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression de l'utilisateur" },
      { status: 500 }
    );
  }
} 