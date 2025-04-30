import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";
import { CONTACT_EMAIL } from "@/lib/resend";

// Schéma de validation pour le formulaire de contact
const contactSchema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Téléphone requis"),
  project: z.string().optional().default("Non spécifié"),
  message: z.string().min(1, "Message requis"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation des données
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      console.error("Erreur de validation:", validation.error.flatten());
      return NextResponse.json(
        { error: "Données invalides", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const validatedData = validation.data;
    const { firstName, lastName, email, phone, project, message } = validatedData;

    // Convertir le projet en nom lisible si nécessaire
    let projectName = "Non spécifié";
    
    if (project) {
      switch (project) {
        case "eclairage":
          projectName = "Éclairage intelligent";
          break;
        case "securite":
          projectName = "Sécurité & vidéosurveillance";
          break;
        case "temperature":
          projectName = "Gestion de température";
          break;
        case "complete":
          projectName = "Solution complète";
          break;
        case "autre":
          projectName = "Autre projet";
          break;
        default:
          projectName = project;
      }
    }

    // Envoyer l'email via Resend
    const { data, error } = await resend.emails.send({
      from: `Contact Domono <contact@domono.fr>`,
      to: [CONTACT_EMAIL],
      subject: `Nouvelle demande de contact - ${projectName} - ${lastName} ${firstName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF6600; margin-bottom: 20px;">Nouvelle demande de contact</h1>
          
          <p style="margin-bottom: 20px;">
            Une nouvelle demande de contact a été soumise sur le site Domono.fr.
          </p>
          
          <h2 style="color: #333; font-size: 18px; margin-top: 30px; padding-bottom: 8px; border-bottom: 1px solid #eaeaea;">
            Informations client
          </h2>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="padding: 8px 0; border-bottom: 1px solid #eaeaea;">
              <strong style="display: inline-block; width: 120px;">Nom:</strong> ${lastName} ${firstName}
            </li>
            <li style="padding: 8px 0; border-bottom: 1px solid #eaeaea;">
              <strong style="display: inline-block; width: 120px;">Email:</strong> ${email}
            </li>
            <li style="padding: 8px 0; border-bottom: 1px solid #eaeaea;">
              <strong style="display: inline-block; width: 120px;">Téléphone:</strong> ${phone}
            </li>
            <li style="padding: 8px 0; border-bottom: 1px solid #eaeaea;">
              <strong style="display: inline-block; width: 120px;">Projet:</strong> ${projectName}
            </li>
          </ul>
          
          <h2 style="color: #333; font-size: 18px; margin-top: 30px; padding-bottom: 8px; border-bottom: 1px solid #eaeaea;">
            Message
          </h2>
          <div style="background-color: #f8f9fa; padding: 16px; border-radius: 6px; margin-top: 15px;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center; color: #666;">
            <p style="font-size: 12px;">© ${new Date().getFullYear()} Domono • Tous droits réservés</p>
          </div>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return NextResponse.json(
        { error: "Une erreur est survenue lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors du traitement de la demande:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors du traitement de la demande" },
      { status: 500 }
    );
  }
} 