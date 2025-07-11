
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
            // Añadir headers CORS si es necesario
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('📥 Users proxy response:', proxyRes.statusCode, req.url);
            // Añadir headers CORS a la respuesta
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
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
            // Añadir headers CORS
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('📥 Products proxy response:', proxyRes.statusCode, req.url);
            // Añadir headers CORS a la respuesta
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
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
            // Añadir headers CORS
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('📥 Purchases proxy response:', proxyRes.statusCode, req.url);
            // Añadir headers CORS a la respuesta
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
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
