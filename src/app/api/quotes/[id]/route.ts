import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { ProjectStatus } from "@/lib/prisma-types";

// Indiquer à Next.js que cette route est dynamique
export const dynamic = 'force-dynamic';

// Valeurs possibles pour ProjectStatus
const PROJECT_STATUS_VALUES = ["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

// GET - Obtenir un devis spécifique
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
    
    // Récupérer le devis
    const quote = await prisma.quote.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        technician: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        notes: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                role: true
              }
            }
          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    });
    
    // Vérifier si le devis existe
    if (!quote) {
      return NextResponse.json(
        { error: "Devis non trouvé" },
        { status: 404 }
      );
    }
    
    // Vérifier les permissions en fonction du rôle
    if (
      session.user.role === "USER" && 
      quote.userId !== session.user.id
    ) {
      return NextResponse.json(
        { error: "Vous n'avez pas accès à ce devis" },
        { status: 403 }
      );
    }
    
    if (
      session.user.role === "TECHNICIAN" && 
      quote.technicianId !== session.user.id &&
      quote.technicianId !== null // Les techniciens peuvent voir les devis non assignés
    ) {
      return NextResponse.json(
        { error: "Vous n'avez pas accès à ce devis" },
        { status: 403 }
      );
    }
    
    return NextResponse.json(quote);
  } catch (error) {
    console.error("Erreur lors de la récupération du devis:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération du devis" },
      { status: 500 }
    );
  }
}

// PATCH - Mettre à jour un devis
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
    
    // Récupérer le devis existant
    const existingQuote = await prisma.quote.findUnique({
      where: { id }
    });
    
    // Vérifier si le devis existe
    if (!existingQuote) {
      return NextResponse.json(
        { error: "Devis non trouvé" },
        { status: 404 }
      );
    }
    
    // Vérifier les permissions en fonction du rôle
    if (session.user.role === "USER" && existingQuote.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Vous n'avez pas les permissions pour modifier ce devis" },
        { status: 403 }
      );
    }
    
    // Construire l'objet de mise à jour en fonction du rôle
    let updateData: any = {};
    
    // Les utilisateurs peuvent uniquement mettre à jour certains champs
    if (session.user.role === "USER") {
      // Les utilisateurs peuvent modifier leurs informations de contact et commentaires
      if (body.phone) updateData.phone = body.phone;
      if (body.address) updateData.address = body.address;
      if (body.postalCode) updateData.postalCode = body.postalCode;
      if (body.city) updateData.city = body.city;
      if (body.preferredContactMethod) updateData.preferredContactMethod = body.preferredContactMethod;
      if (body.preferredContactTime) updateData.preferredContactTime = body.preferredContactTime;
      if (body.additionalComments) updateData.additionalComments = body.additionalComments;
    } 
    // Les techniciens et administrateurs peuvent faire plus de modifications
    else if (session.user.role === "TECHNICIAN" || session.user.role === "ADMIN") {
      // Statut du projet
      if (body.status && PROJECT_STATUS_VALUES.includes(body.status)) {
        updateData.status = body.status;
      }
      
      // Assignation d'un technicien (admin uniquement)
      if (session.user.role === "ADMIN" && body.technicianId) {
        // Vérifier que le technicien existe et a le rôle TECHNICIAN
        const technician = await prisma.user.findFirst({
          where: {
            id: body.technicianId,
            role: "TECHNICIAN"
          }
        });
        
        if (technician) {
          updateData.technicianId = body.technicianId;
        }
      }
      
      // Auto-assignation pour un technicien
      if (session.user.role === "TECHNICIAN" && body.assign === true) {
        updateData.technicianId = session.user.id;
      }
    }
    
    // Si aucune donnée à mettre à jour
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Aucune donnée valide fournie pour la mise à jour" },
        { status: 400 }
      );
    }
    
    // Mettre à jour le devis
    const updatedQuote = await prisma.quote.update({
      where: { id },
      data: updateData
    });
    
    // Si une note est fournie, l'ajouter
    if (body.note) {
      await prisma.quoteNote.create({
        data: {
          content: body.note,
          quoteId: id,
          authorId: session.user.id
        }
      });
    }
    
    return NextResponse.json({
      message: "Devis mis à jour avec succès",
      quote: updatedQuote
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du devis:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour du devis" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un devis
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
    
    // Seuls les administrateurs peuvent supprimer des devis
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Vous n'avez pas les permissions pour supprimer ce devis" },
        { status: 403 }
      );
    }
    
    const { id } = params;
    
    // Vérifier si le devis existe
    const existingQuote = await prisma.quote.findUnique({
      where: { id }
    });
    
    if (!existingQuote) {
      return NextResponse.json(
        { error: "Devis non trouvé" },
        { status: 404 }
      );
    }
    
    // Supprimer le devis et toutes les notes associées (cascade)
    await prisma.quote.delete({
      where: { id }
    });
    
    return NextResponse.json({
      message: "Devis supprimé avec succès"
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du devis:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression du devis" },
      { status: 500 }
    );
  }
} 