"use server";

import { UserRole } from "@/interfaces";
import { cookies } from "next/headers";

// Combined function to set both cookies at once
export async function setAuthCookies(token: string, role: UserRole) {
  const cookieStore = await cookies();

  const cookieOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
    domain: process.env.NODE_ENV !== "production" ? "localhost" : undefined,
  };
  cookieStore.set("access_token", token, cookieOptions);

  cookieStore.set("user_role", role, {
    ...cookieOptions,
    httpOnly: true,
  });
}

export async function clearCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("user_role");
}
