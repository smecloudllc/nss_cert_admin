"use client";

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import { clearCookies } from "@/app/auth/actions";

declare module "axios" {
  export interface AxiosInstance {
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<T>;
    put<T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<T>;
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    patch<T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<T>;
  }
}

let logout: () => void;

export const injectLogout = (_logout?: typeof logout) => {
  if (_logout) logout = _logout;
};

// axios instance with default config
export const http = axios.create({
  timeout: 45000,
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request interceptor
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers?.["no-optimization"]) return config;

  const apiParams = (config.data as Record<string, unknown>) ?? {};
  const cleanedParams: Record<string, unknown> = {};

  // Inject Bearer token from access_token cookie
  document.cookie.split(";").forEach((cookie) => {
    const [name, value] = cookie.split("=");
    if (name.trim() === "access_token") {
      try {
        config.headers.Authorization = `Bearer ${decodeURIComponent(value)}`;
      } catch (e) {
        console.error("Failed to parse access_token cookie:", e);
      }
    }
  });

  Object.entries(apiParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      if (value.trim()) cleanedParams[key] = value;
    } else {
      cleanedParams[key] = value;
    }
  });

  config.data = cleanedParams;
  return config;
});

// Response interceptor: handle success & errors
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // Check if the response has a success field (your backend pattern)
    if (response.data && typeof response.data.success === "boolean") {
      if (
        response.data.success === false &&
        typeof response.data.info === "string"
      ) {
        // Handle business logic failure (even with 200 status)
        const errorMessage = response.data.info;

        // Check if this is a session expiration error
        if (
          errorMessage.includes("Session expired") ||
          errorMessage.includes("L101") ||
          errorMessage.includes("L102")
        ) {
          // Handle session expiration like a 401 error
          if (typeof window !== "undefined") {
            // Perform logout to clear all state and redirect to login
            clearCookies();
          }
          return Promise.reject(new Error(errorMessage));
        }

        // Check if we should show toast (you can add a flag in your requests)
        const config = response.config as InternalAxiosRequestConfig & {
          headers?: { "no-toast"?: string };
        };
        const shouldShowToast = !config?.headers?.["no-toast"];

        if (shouldShowToast) {
          toast.error(errorMessage, {
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        }

        // Reject the promise so your components can handle the error
        return Promise.reject(new Error(errorMessage));
      } else if (
        response.data.success === true &&
        typeof response.data.info === "object"
      ) {
        // Success case - return the data as-is from backend (maintains original structure)
        return response.data;
      }
    }

    // Return the data as-is from backend (maintains original structure)
    return response.data;
  },
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const config = error.config as InternalAxiosRequestConfig & {
      headers?: { "no-toast"?: string };
    };

    if (status === 401) {
      // Only perform logout in browser environment
      if (typeof window !== "undefined") {
        // Perform logout to clear all state and redirect to login
        clearCookies();
      }
    }

    const shouldShowToast = !config?.headers?.["no-toast"];

    const errorMessage =
      error.response?.data?.message ?? "An unknown error occurred";

    if (shouldShowToast) {
      toast.error(errorMessage);
    }

    if (status === 500) {
      return Promise.reject(new Error("Internal server error"));
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default Object.assign(http, { injectLogout });
