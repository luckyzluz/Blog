export default {
  mode: 'dark' | 'light',
  anchor: 0, // 为标题添加锚点 0：不渲染；1：渲染于标题前；2：渲染于标题后，默认 0
  customEmoji: { '+1': '👍', '-1': '👎', 'heart': '❤️', 'cold_sweat': '😰' }, // 自定义 emoji，默认为 {}
  lang: 'zh_CN', // 语言，默认为 'zh_CN'
  emojiPath: 'https://cdn.jsdelivr.net/npm/vditor@3.8.12/dist/images/emoji', // 表情图片路径window.location.origin + '/static/vditor@3.8.12/dist/images/emoji'
  hljs: { // 代码块配置
    enable: true, // 是否启用代码高亮
    style: 'dracula', // 黑：，monokai，native。白：colorful，monokailight，github
    lineNumber: true // 是否启用行号
  },
  speech: { // 对选中后的内容进行阅读
    enable: true
  },
  math: {
    inlineDigit: false, // 内联数学公式起始 $ 后是否允许数字
    macros: {
      bf: '{\\boldsymbol f}',
      bu: '{\\boldsymbol u}',
      bv: '{\\boldsymbol v}',
      bw: '{\\boldsymbol w}'
    }, // 使用 MathJax 渲染时传入的宏定义
    engine: 'KaTeX'// 数学公式渲染引擎：KaTeX, MathJax
  }, // 数学公式渲染配置
  cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.8.12', // 自建 CDN 地址window.location.origin + '/static/vditor@3.8.12'
  //   transform(html: string): string, // 在渲染前进行的回调方法
  //   after(); // 渲染完成后的回调
  lazyLoadImage: 'https://img30.360buyimg.com/pop/jfs/t1/185968/7/22146/50400/62418347Efb72db05/25504776cee2ce90.gif', // 设置为 Loading 图片地址后将启用图片的懒加载
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
  theme: {
    current: 'light', // 当前主题
    list: { 'ant-design': 'Ant Design', dark: 'Dark', light: 'Light', wechat: 'WeChat' }, // 可选主题列表
    path: 'https://cdn.jsdelivr.net/npm/vditor@3.8.12/dist/css/content-theme' // 主题样式地址window.location.origin + '/static/vditor@3.8.12/dist/css/content-theme'
  }
//   renderers: ILuteRender // 自定义渲染 https://ld246.com/article/1588412297062
}
