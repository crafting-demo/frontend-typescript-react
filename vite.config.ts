import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { json } from "stream/consumers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Set up aliases to match the baseUrl in tsconfig.json
      app: resolve(__dirname, "./src/app"),
      assets: resolve(__dirname, "./src/assets"),
      backend: resolve(__dirname, "./src/backend"),
      common: resolve(__dirname, "./src/common"),
      components: resolve(__dirname, "./src/components"),
      logger: resolve(__dirname, "./src/logger"),
      styles: resolve(__dirname, "./src/styles"),
    },
  },
  // Handle environment variables similar to CRA
  define: {
    // Only include specific environment variables that are needed
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    "process.env.REACT_APP_DNS_SUFFIX": JSON.stringify(
      process.env.REACT_APP_DNS_SUFFIX
    ),
  },
  // Configure server options
  server: {
    host: true,
    port: 3000,
    open: true,
    allowedHosts: true,
  },
  // Configure build options
  build: {
    outDir: "build", // Same output directory as CRA
  },
});
