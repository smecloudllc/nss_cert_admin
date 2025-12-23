import { cookies } from "next/headers";
import { routes } from "@/routes";
import { UserRole } from "@/interfaces";

export async function checkAuthentication() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");
    const userRole = cookieStore.get("user_role");

    // Check if  authentication cookies exist
    if (!accessToken) {
      return { isAuthenticated: false, redirectTo: routes.auth.login };
    }

    return {
      isAuthenticated: true,
      redirectTo: routes.dashboard.overview,
      userRole: userRole?.value as UserRole,
    };
  } catch (error) {
    console.error("Error checking authentication:", error);
    return { isAuthenticated: false, redirectTo: routes.auth.login };
  }
}

// Dashboard routes
export async function requireAuthentication() {
  const { isAuthenticated, userRole } = await checkAuthentication();

  if (!isAuthenticated) {
    return routes.auth.login;
  }
  // Role-based redirection
  if (userRole === "writer") {
    return routes.dashboard.certificate.index;
  }

  return null;
}
