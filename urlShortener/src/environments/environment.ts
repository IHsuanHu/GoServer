// src/environments/environment.ts
export const environment = {
    production: false,
    apiUrl: process.env["API_BASE_URL"] || 'http://localhost:8080'  // 預設為本地開發環境
  };
  