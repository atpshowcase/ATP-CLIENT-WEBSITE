import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    port: 2007,
    host: true,
    open: true,
    strictPort: true,
    allowedHosts: [
      'atpshowcase.com',
      'www.atpshowcase.com',
      'bank.atpshowcase.com'
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
