import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { ServiceType, ContactMethod, ContactTime } from "@/lib/prisma-types";
import { z } from "zod";

// Indiquer à Next.js que cette route est dynamique
export const dynamic = 'force-dynamic';

// Les valeurs possibles pour les énumérations
const SERVICE_TYPES = ["DOMOTIQUE", "ALARME", "VIDEOSURVEILLANCE", "CONTROLE_ACCES"];
const CONTACT_METHODS = ["EMAIL", "PHONE", "ANY"];
const CONTACT_TIMES = ["MORNING", "AFTERNOON", "EVENING", "ANYTIME"];

// Schéma de validation pour une nouvelle demande de devis
const quoteSchema = z.object({
  service: z.enum(SERVICE_TYPES as [string, ...string[]]),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  address: z.string().min(5, "Adresse invalide"),
  postalCode: z.string().min(5, "Code postal invalide"),
  city: z.string().min(2, "Ville invalide"),
  preferredContactMethod: z.enum(CONTACT_METHODS as [string, ...string[]]),
  preferredContactTime: z.enum(CONTACT_TIMES as [string, ...string[]]),
  additionalComments: z.string().optional(),
  
  // Champs spécifiques au service (optionnels car ils dépendent du service choisi)
  domotiqueDetails: z.any().optional(),
  alarmeDetails: z.any().optional(),
  videosurveillanceDetails: z.any().optional(),
  controleAccesDetails: z.any().optional(),
});

// GET - Récupérer les devis (avec pagination et filtres)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Vérifier l'authentification
    if (!session) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const service = searchParams.get("service") as ServiceType | null;
    const status = searchParams.get("status");
    
    const skip = (page - 1) * limit;
    
    // Construire la requête avec les filtres
    const whereClause: any = {};
    
    // Filtrage par rôle utilisateur
    if (session.user.role === "USER") {
      // Les utilisateurs normaux ne peuvent voir que leurs propres devis
      whereClause.userId = session.user.id;
    } else if (session.user.role === "TECHNICIAN") {
      // Les techniciens peuvent voir les devis qui leur sont assignés ou non assignés
      whereClause.OR = [
        { technicianId: session.user.id },
        { technicianId: null }
      ];
    }
    // Les administrateurs peuvent voir tous les devis (pas de filtre supplémentaire)
    
    // Filtres additionnels
    if (service) {
      whereClause.service = service;
    }
    
    if (status) {
      whereClause.status = status;
    }
    
    // Récupérer les devis avec pagination
    const quotes = await prisma.quote.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
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
        }
      }
    });
    
    // Compter le nombre total de devis pour la pagination
    const total = await prisma.quote.count({ where: whereClause });
    
    return NextResponse.json({
      quotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des devis:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des devis" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau devis
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Le devis peut être créé par un utilisateur connecté ou un visiteur
    const body = await request.json();
    
    // Validation des données
    const validation = quoteSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Données de devis invalides", details: validation.error.flatten() },
        { status: 400 }
      );
    }
    
    const {
      service,
      firstName,
      lastName,
      email,
      phone,
      address,
      postalCode,
      city,
      preferredContactMethod,
      preferredContactTime,
      additionalComments,
      domotiqueDetails,
      alarmeDetails,
      videosurveillanceDetails,
      controleAccesDetails
    } = body;
    
    // Si l'utilisateur est connecté, utiliser son ID, sinon créer un utilisateur temporaire ou anonyme
    let userId = session?.user.id;
    
    if (!userId) {
      // Rechercher si un utilisateur existe déjà avec cet email
      let user = await prisma.user.findUnique({
        where: { email }
      });
      
      // Si aucun utilisateur n'existe, en créer un
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name: `${firstName} ${lastName}`,
            // Pas de mot de passe, l'utilisateur devra s'inscrire pour voir ses devis
          }
        });
      }
      
      userId = user.id;
    }
    
    // Création du devis
    const quote = await prisma.quote.create({
      data: {
        service,
        firstName,
        lastName,
        email,
        phone,
        address,
        postalCode,
        city,
        preferredContactMethod,
        preferredContactTime,
        additionalComments,
        userId,
        
        // Détails spécifiques au service
        domotiqueDetails: service === "DOMOTIQUE" && domotiqueDetails ? domotiqueDetails : undefined,
        alarmeDetails: service === "ALARME" && alarmeDetails ? alarmeDetails : undefined,
        videosurveillanceDetails: service === "VIDEOSURVEILLANCE" && videosurveillanceDetails ? videosurveillanceDetails : undefined,
        controleAccesDetails: service === "CONTROLE_ACCES" && controleAccesDetails ? controleAccesDetails : undefined,
      }
    });
    
    return NextResponse.json(
      { 
        message: "Demande de devis créée avec succès", 
        quote 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du devis:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création du devis" },
      { status: 500 }
    );
  }
} 