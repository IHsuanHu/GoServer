// src/environments/environment.prod.ts
export const environment = {
    production: true,
    apiUrl: process.env["API_BASE_URL"] || 'https://urlshortener-iqwe.onrender.com'  // 默認值用於生產環境
  };
  