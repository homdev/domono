/**
 * Fichier utilitaire pour centraliser les types Prisma
 * Utilisez ces types plutôt que d'importer directement depuis "@prisma/client"
 */

// Types d'énumération définis dans le schéma Prisma
export type UserRole = "USER" | "TECHNICIAN" | "ADMIN";
export type ServiceType = "DOMOTIQUE" | "ALARME" | "VIDEOSURVEILLANCE" | "CONTROLE_ACCES";
export type ContactMethod = "EMAIL" | "PHONE" | "ANY";
export type ContactTime = "MORNING" | "AFTERNOON" | "EVENING" | "ANYTIME";
export type ProjectStatus = "PENDING" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

// Réexporter les types et constantes utiles
export { prisma } from "./prisma"; 