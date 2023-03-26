import { defineConfig ,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path"
import { viteMockServe } from 'vite-plugin-mock'
// import config from './src/config/index.js'
// , UserConfigExport, ConfigEnv
// https://vitejs.dev/config/
export default (({ mode, command } )=>{
  let prodMock = false;
  console.log(loadEnv(mode, process.cwd()).VITE_BASE_API_URL)
  return defineConfig({
    base: "./",
    // 本地运行配置，及反向代理配置
    server: {
      cors: true, // 默认启用并允许任何源
      open: false, // 在服务器启动时自动在浏览器中打开应用程序
      // 开启控制台输出日志
      silent: false,
      host: 'localhost',
      hmr: true,
      port: 5173,
      //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
      proxy: {
        '/api': { //项目代理
          target: loadEnv(mode, process.cwd()).VITE_BASE_API_URL, //实际请求地址http://localhost:3000loadEnv('VITE_MOCK_API_URL')
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/remotemock': { // 远程mock
          target: loadEnv(mode, process.cwd()).VITE_REMOTE_MOCK_API_URL, //代理接口http://localhost:3000loadEnv('VITE_MOCK_API_URL')
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/remotemock/, '') // 检测接口中出现的'api/'因为这段字符只是我们用来检测转发的而已，实际请求中要用正则将api设置为空，要记住他只是一个识别字符而已，因为我们的项目中可能存在需要请求不同的后端接口地址
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteMockServe({
        // default
        mockPath: './src/mock',
        localEnabled: true, // 是否应用于本地
    // prodEnabled: false, // 是否应用于生产
    // watchFiles: true, // 监听mock文件变化
    // logger: true,
    // // 这个属性是给生产用的，也就是说prodEnabled必须是true才有用
    // // 如果只是本地使用的话，这个属性就没必要加了
    //     injectCode: `
    //       import { setupProdMockServer } from './mockProdServer';
    //       setupProdMockServer();
    //     `
      }),
    ],
    resolve: {
      // ↓路径别名，主要是这部分
      alias: {
        "@": resolve(__dirname, "./src"),
        "c": resolve(__dirname, "./src/components"),
        "v": resolve(__dirname, "./src/views"),
        // "u": resolve(__dirname, "./src/utils"),
        // "s": resolve(__dirname, "./src/store"),
        "a": resolve(__dirname, "./src/assets")
      }
    }
  })
})
