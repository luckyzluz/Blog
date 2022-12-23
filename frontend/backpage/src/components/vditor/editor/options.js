export default {
  // lang: 'zh_CN', // 语言种类
  undoDelay: 30, // 历史记录间隔
  // height: 360, // 编辑器总高度
  width: 'auto', //	编辑器总宽度，支持 %	'auto'
  minHeight: 500, //	编辑区域最小高度
  placeholder: '请输入...', //	输入区域为空时的提示
  classes: {
    preview: '' // 预览元素上的 className
  },
  fullscreen: 90, // 全屏层级
  outline: {
    enable: false, // 初始化是否展现大纲
    position: 'left' // 大纲位置：'left', 'right'
  },
  cache: {
    enable: false, // 是否使用 localStorage 进行缓存
    id: '', // 缓存 key，第一个参数为元素且启用缓存时必填
    after: () => { // 缓存后的回调

    }
  },
  cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.8.12', // 配置自建 CDN 地址本地window.location.origin + '/static/vditor@3.8.12''https://cdn.bootcdn.net/ajax/libs/vditor/3.8.12'
  typewriterMode: false, // 是否启用打字机模式
  mode: 'ir', // 可选模式：sv, ir, wysiwyg
  debugger: false, // 是否显示日志
  value: '', // 编辑器初始化值
  theme: 'classic', // 主题：classic, dark
  icon: 'ant', // 图标风格：ant, material
  counter: {
    enable: true, // 是否启用计数器
    type: 'text', // 统计类型：'markdown', 'text'
    max: '', // 允许输入的最大值
    after: () => { // 字数统计回调
    }
  },
  preview: {
    actions: ['desktop', 'mobile'], // 'tablet', 'mp-wechat', 'zhihu'
    delay: 1000, // 预览 debounce 毫秒间隔
    markdown: {
      autoSpace: false, // 自动空格
      fixTermTypo: false, // 自动矫正术语
      toc: false, // 插入目录
      footnotes: true, // 脚注
      codeBlockPreview: true, // wysiwyg 和 ir 模式下是否对代码块进行渲染
      mathBlockPreview: true,	// wysiwyg 和 ir 模式下是否对数学公式进行渲染
      paragraphBeginningSpace: false,	// 段落开头空两个
      sanitize: true,	// 是否启用过滤 XSS
      listStyle: false,	// 为列表添加 data-style 属性
      linkBase: '',	// 链接相对路径前缀
      linkPrefix: '',	// 链接强制前缀
      mark: false // 启用 mark 标记
    },
    math: {
      inlineDigit: false, // 内联数学公式起始 $ 后是否允许数字
      macros: {}, // 使用 MathJax 渲染时传入的宏定义
      engine: 'KaTeX'// 数学公式渲染引擎：KaTeX, MathJax
    },
    maxWidth: 800, // 预览区域最大宽度
    mode: 'both', // 显示模式：both, editor
    theme: {
      current: 'light', // 当前主题
      list: { 'ant-design': 'Ant Design', dark: 'Dark', light: 'Light', wechat: 'WeChat' }, // 可选主题列表
      path: 'https://cdn.jsdelivr.net/npm/vditor@3.8.12/dist/css/content-theme' // 主题样式地址window.location.origin + '/static/vditor@3.8.12/dist/css/content-theme'
    },
    // url: '', // url
    hljs: {
      enable: true, // 是否启用代码高亮
      style: 'dracula', // 黑：，monokai，native。白：colorful，monokailight，github
      lineNumber: true // 是否启用行号
    }
    // ,
    // parse: () => { // 预览回调
    // },
    // transform: () => { // 渲染之前回调
    // }
  },
  comment: {
    enable: true // 是否启用评论模式
  },
  hint: {
    parse: true, // 是否进行 md 解析
    delay: 200,	// 提示 debounce 毫秒间隔
    emoji: { '+1': '👍', '-1': '👎', 'heart': '❤️', 'cold_sweat': '😰' },	// 默认表情，可从lute/emoji_map 中选取，也可自定义
    emojiTail: '',	// 常用表情提示	-
    emojiPath: 'https://cdn.jsdelivr.net/npm/vditor@@3.8.12/dist/images/emoji' // 表情图片地址window.location.origin + '/static/vditor@3.8.12/dist/images/emoji'
    // extend: IHintExtend[]	对 @/话题等关键字自动补全的扩展	[]
  },
  resize: {
    enable: false, // 是否支持大小拖拽
    position: 'bottom', // 拖拽栏位置：'top', 'bottom'
    after: () => { // 拖拽结束的回调

    }
  }
}
