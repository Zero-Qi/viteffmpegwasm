import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import eslintPlugin from "vite-plugin-eslint"; // 引入vite-plugin-vue
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 设置eslint
    // eslintPlugin({
    //   include: ["src/**/*.vue", "src/**/*.js"], // 检查的文件
    // }),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          next();
        });
      },
    },
  ],
  base: "./",
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //     utils: path.resolve(__dirname, 'src/utils'),
  //     assets: path.resolve(__dirname, 'src/assets'),
  //     comp: path.resolve(__dirname, 'src/components'),
  //     api: path.resolve(__dirname, 'src/api'),
  //     store: path.resolve(__dirname, 'src/store')
  //   }
  // },
  // 打包配置
  build: {
    outDir: "dist", // 指定输出路径
    assetsDir: "assets", // 指定生成静态资源的存放路径
    // target: "modules", // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
    // sourcemap: false, // 构建后是否生成 source map 文件
    // minify: "terser", // 混淆器，terser构建后文件体积更小
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
          if (id.includes(path.resolve(__dirname, "/src/store/index.js"))) {
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000, // 指定服务器端口
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
    https: false, // 是否开启 https
    cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
  },
});
