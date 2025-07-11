
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy para API de usuarios
      '/api/users': {
        target: 'https://ifi23uyye0.execute-api.us-east-1.amazonaws.com/dev/usuario',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/users/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('🔥 Proxy error (users):', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('📤 Proxying users request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('📥 Users proxy response:', proxyRes.statusCode, req.url);
          });
        },
      },
      // Proxy para API de productos
      '/api/products': {
        target: 'https://y2zenkmkx8.execute-api.us-east-1.amazonaws.com/dev/producto',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/products/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('🔥 Proxy error (products):', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('📤 Proxying products request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('📥 Products proxy response:', proxyRes.statusCode, req.url);
          });
        },
      },
      // Proxy para API de compras
      '/api/purchases': {
        target: 'https://fiyjws2ty5.execute-api.us-east-1.amazonaws.com/dev/compras',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/purchases/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('🔥 Proxy error (purchases):', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('📤 Proxying purchases request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('📥 Purchases proxy response:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
