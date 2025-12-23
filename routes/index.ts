export const routes = {
  home: "/",
  dashboard: {
    // Main dashboard routes
    overview: "/overview",
    batching: "/batching",
    certificate: {
      index: "/certificate",
    },
    manifest: {
      index: "/manifest",
    },
    system: {
      auditLogs: {
        index: "/audit-logs",
      },
    },

    management: {
      user: {
        index: "/user",
      },
      role_and_permissions: {
        index: "/roles_permissions",
      },
    },
  },
  auth: {
    login: "/auth/login",
    signUp: "/auth/sign-up",
    otp: "/auth/otp-input",
  },
};
