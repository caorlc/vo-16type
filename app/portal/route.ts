import { CustomerPortal } from "@polar-sh/nextjs";

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  getCustomerId: async (req) => {
    // 这里需要你根据实际业务返回 Polar Customer ID
    // 示例：从 query、header、cookie 等获取
    // 这里只做演示，返回空字符串
    return "";
  },
  server: "production", // 生产环境改为 'production'
}); 