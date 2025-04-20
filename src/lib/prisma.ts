import { PrismaClient } from "@/generated/prisma";

// PrismaClient est attaché au scope global en développement pour éviter 
// d'épuiser la limite de connexion de la base de données.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 