export const routes = {
  home: "/",
  dashboard: {
    // Main dashboard routes
    overview: "/overview",
    batching: "/batching",

    manifest: {
      index: "/manifest",
    },
    system: {
      auditLogs: {
        index: "/audit-logs",
      },
    },

    management: {
      certificate: {
        index: "/certificate",
      },
    },
  },
  auth: {
    login: "/auth/login",
    signUp: "/auth/sign-up",
    otp: "/auth/otp-input",
  },
};
