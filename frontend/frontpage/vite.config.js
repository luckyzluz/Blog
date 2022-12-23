import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  // 本地运行配置，及反向代理配置
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    // 开启控制台输出日志
    silent: false,
    host: 'localhost',
    port: 8082,
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '/api': {
        target: "http://localhost:3000", //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
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
  ],//配置需要使用的插件列表，这里将vue添加进去
  resolve: {
    alias: {
      // 配置文件别名 vite1.0是/@/  2.0改为/@
      // 这里是将src目录配置别名为 /@ 方便在项目中导入src目录下的文件
      "/@": pathResolve("src"),
      "c": pathResolve("src/components"),
      "v": pathResolve("src/views"),
      "u": pathResolve("src/utils"),
      "s": pathResolve("src/store"),
      "a": pathResolve("src/assets")
    }
  },
  // 强制预构建插件包
  optimizeDeps: {
    include: ['axios'],
  },
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    ssr:false,// 是否开启ssr服务断渲染src/pages/blog/index.html
    rollupOptions: {
      // input: {
      //   main: resolve(__dirname, 'index.html'),
      //   admin: resolve(__dirname, '/src/pages/admin/admin.html')
      // },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',//文件名
        entryFileNames: 'static/js/[name]-[hash].js',//入口文件名
        assetFileNames:  function(ext) {
          // 后缀获取
          let suffix = '';
          // 获取类型结果
          let result = '';
          try {
           suffix = ext.name.slice(ext.name.lastIndexOf('.') + 1);
          } catch (err) {
           suffix = '';
          }
          // fileName无后缀返回 false
          if (!suffix) { return false; }
          suffix = suffix.toLocaleLowerCase();
          // 图片格式
          const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
          // 进行图片匹配
          result = imglist.find(item => item === suffix);
          if (result) {
          //  return 'image';
           return 'static/picture/[name].[ext]';
          }
          // 匹配 excel
          const excelist = ['xls', 'xlsx'];
          result = excelist.find(item => item === suffix);
          if (result) {
          //  return 'excel';
           return 'static/excel/[name].[ext]';
          }
          // 匹配 word
          const wordlist = ['doc', 'docx','pdf','ppt', 'pptx','txt'];
          result = wordlist.find(item => item === suffix);
          if (result) {
          //  return 'doc';
           return 'static/doc/[name].[ext]';
          }
          // 匹配 视频
          const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
          result = videolist.find(item => item === suffix);
          if (result) {
          //  return 'video';
           return 'static/video/[name].[ext]';
          }
          // 匹配 音频
          const radiolist = ['mp3', 'wav', 'wmv'];
          result = radiolist.find(item => item === suffix);
          if (result) {
          //  return 'music';
           return 'static/music/[name].[ext]';
          }
          // 匹配 字体
          const fontlist = ['woff', 'woff2', 'ttf'];
          result = fontlist.find(item => item === suffix);
          if (result) {
          //  return 'fonts'; 
           return 'static/fonts/[name].[ext]';
          }
          // 匹配 字体
          const csslist = ['css'];
          result = csslist.find(item => item === suffix);
          if (result) {
          //  return 'fonts'; 
           return 'static/css/[name].[ext]';
          }
          // 其他 文件类型
          // return 'other';
          return 'static/other/[name].[ext]';
         },
        manualChunks(id) { //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  cssPreprocessOptions: {
    scss: {
      //  additionalData: '@import "./src/assets/style/scss/common/common";' // 全局公共样式
    }
 }
})


