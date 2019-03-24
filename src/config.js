export const config = {
  local: {
    service: {
      dashboard: { hostname: "http://localhost", port: process.env.PORT || 3000 },
      env: { hostname: "http://localhost", port: process.env.PORT || 3000 }
    }
  },
  dev: {
    service: {
      dashboard: { hostname: "http://localhost", port: process.env.PORT || 3000 },
      env: { hostname: "http://localhost", port: process.env.PORT || 3000 }
    }
  },
  prod: {
    service: {
      dashboard: { hostname: "http://localhost", port: process.env.PORT || 3000 },
      env: { hostname: "http://localhost", port: process.env.PORT || 3000 }
    }
  }
};
