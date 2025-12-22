import { clearCookies } from "@/app/auth/actions";
import { BaseApiResponse } from "@/interfaces";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();

  const handleLogout = async (device: string) => {
    try {
      // Call API route first to logout from backend
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device }),
      });

      const data = (await res.json()) as BaseApiResponse<string>;

      // Clear server-side cookies using server action
      await clearCookies();

      // Clear client-side storage regardless of status
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("web-token");
        localStorage.removeItem("temp-user");
        localStorage.removeItem("user-role");
        sessionStorage.clear();
      }

      // Redirect
      router.push(routes.auth.login);
    } catch (error) {
      console.error("Logout failed:", error);

      // Still try to clear cookies and storage on error
      try {
        await clearCookies();
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          localStorage.removeItem("web-token");
          localStorage.removeItem("temp-user");
          localStorage.removeItem("user-role");
          sessionStorage.clear();
        }
      } catch (cleanupError) {
        console.error("Cleanup failed:", cleanupError);
      }

      router.push(routes.auth.login);
    }
  };

  return { handleLogout };
}
