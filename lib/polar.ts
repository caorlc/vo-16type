import { Polar } from "@polar-sh/sdk";

export const api = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "production", // 使用 sandbox 环境，生产环境时改为 'production'
}); 