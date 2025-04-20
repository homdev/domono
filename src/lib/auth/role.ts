// Définition manuelle du type UserRole
type UserRole = "USER" | "TECHNICIAN" | "ADMIN";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

// Types d'assertions de rôle
export type RoleAssertionMode = "at-least" | "exact";

/**
 * Vérifier si l'utilisateur connecté possède un rôle spécifique ou supérieur
 */
export async function hasRole(
  requiredRole: UserRole, 
  mode: RoleAssertionMode = "at-least"
): Promise<boolean> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return false;
  }
  
  const userRole = session.user.role;
  
  if (mode === "exact") {
    return userRole === requiredRole;
  }
  
  // Mode "at-least" - vérifier si l'utilisateur a un rôle supérieur ou égal
  const roleHierarchy: UserRole[] = ["USER", "TECHNICIAN", "ADMIN"];
  const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
  const userRoleIndex = roleHierarchy.indexOf(userRole);
  
  return userRoleIndex >= requiredRoleIndex;
}

/**
 * Middleware pour protéger les routes API en fonction du rôle
 */
export function withRoleProtection(
  handler: (req: NextRequest, context: any) => Promise<NextResponse>,
  requiredRole: UserRole,
  mode: RoleAssertionMode = "at-least"
) {
  return async (req: NextRequest, context: any) => {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }
    
    const hasRequiredRole = await hasRole(requiredRole, mode);
    
    if (!hasRequiredRole) {
      return NextResponse.json(
        { error: "Vous n'avez pas les permissions nécessaires" },
        { status: 403 }
      );
    }
    
    return handler(req, context);
  };
} 