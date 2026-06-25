import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // 避免 monorepo 父目录被误判为 workspace root，导致 Turbopack manifest 错乱
  turbopack: {
    root: appRoot,
  },
};

export default nextConfig;
