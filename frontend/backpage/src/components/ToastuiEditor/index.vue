<template>
  <div>
    <!-- <markdown-editor3 ref="editor" v-model="content" :height="400" /> -->
    <editor
      :initial-value="editorText"
      :options="editorOptions"
      height="500px"
      initial-edit-type="wysiwyg"
      preview-style="vertical"
    />
    <div>1111111111111111111111111111111111111111111111111111111</div>
    <viewer :initial-value="viewerText" height="500px" />
  </div>
</template>
<script>
// import ToastuiEditor from '@/components/ToastuiEditor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn.js'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
// chart
import '@toast-ui/chart/dist/toastui-chart.css'
import chart from '@toast-ui/editor-plugin-chart'
// Code Syntax Highlight Plugin
import Prism from 'prismjs'
// import 'prismjs/components/prism-cshtml.js'
import 'prismjs/themes/prism.css'

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js'
// Color Syntax Plugin
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

// Table Merged Cell Plugin
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css'
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'

// UML Plugin
import uml from '@toast-ui/editor-plugin-uml'
// import latexjs from 'latex.js/dist/latex.js'`

import { Editor, Viewer } from '@toast-ui/vue-editor'
export default {
  name: 'Test',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    editor: Editor,
    // eslint-disable-next-line vue/no-unused-components
    viewer: Viewer
  },
  data() {
    return {
      content: [
        '$$latex',
        '\\documentclass{article}',
        '\\begin{document}',
        '',
        '$',
        'f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\,e^{2 \\pi i \\xi x} \, d\\xi',
        '$',
        '\\end{document}',
        '$$'
      ].join('\n'),
      umlOptions: {
        rendererURL: 'http://www.plantuml.com/plantuml/png/'
      },
      colorSyntaxOptions: {
        preset: ['#181818', '#292929', '#393939']
      },
      chartOptions: {
        width: '', // 默认宽度值
        height: '', // 默认高度值
        minWidth: 100, // 最小宽度值
        maxWidth: 600, // 最大宽度值
        minHeight: 100, // 最小高度值
        maxHeight: 300 // 最大高度值
      },
      initialValue: [
        '$$latex',
        '\\documentclass{article}',
        '\\begin{document}',
        '',
        '$',
        'f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\,e^{2 \\pi i \\xi x} \, d\\xi',
        '$',
        '\\end{document}',
        '$$'
      ].join('\n'),
      editorText: [
        '$$latex',
        '\\documentclass{article}',
        '\\begin{document}',
        '',
        '$',
        'f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\,e^{2 \\pi i \\xi x} \, d\\xi',
        '$',
        '\\end{document}',
        '$$'
      ].join('\n'),
      // '# This is editor.\n Hello World.\n # code样式 \n ```js \nconsole.log(\'foo\')\n```\n```javascript\nconsole.log(\'bar\')\n```\n```html\n<div id="editor"><span>baz</span></div>\n```\n```wrong\n[1 2 3]\n```\n```clojure\n[1 2 3]\n```\n$$uml\npartition Conductor {\n(*) --> "Climbs on Platform"\n--> === S1 ===\n--> Bows\n}\npartition Audience #LightSkyBlue {\n === S1 === --> Applauds\n}\npartition Conductor {\nBows --> === S2 ===\n--> WavesArmes\nApplauds --> === S2 ===\n}\npartition Orchestra #CCCCEE {\nWavesArmes --> Introduction\n--> "Play music"\n}\n$$\n$$latex\n \/\/documentclass{article}\n\/\/begin{document}\n \n $\nf(x) = \/\/int_{-\/\/infty}^\/\/infty \/\/hat f(\/\/xi)\,e^{2 \/\/pi i \/\/xi x} \, d\/\/xi\n$\n\/\/end{document}\n$$',
      viewerText: '# This is Viewer.\n Hello World.',
      editorOptions: {
        customHTMLRenderer: {
          latex(node) {
            const generator = new latexjs.HtmlGenerator({ hyphenate: false });
            const { body } = latexjs.parse(node.literal, { generator }).htmlDocument();

            return [
              { type: 'openTag', tagName: 'div', outerNewLine: true },
              { type: 'html', content: body.innerHTML },
              { type: 'closeTag', tagName: 'div', outerNewLine: true }
            ];
          },
        },
        initialEditType: 'markdown', // markdown, wysiwyg
        // hideModeSwitch: true,
        language: 'zh-CN',
        previewStyle: 'tab',
        // theme: 'dark',
        plugins: [[chart, this.chartOptions], [codeSyntaxHighlight, { highlighter: Prism }], [colorSyntax], [tableMergedCell], [uml, this.umlOptions]] // , { highlighter: Prism }, [this.latexPlugin]
        // minHeight: '200px',
        // useCommandShortcut: true,
        // usageStatistics: true,
        // toolbarItems: [
        //   ['heading', 'bold', 'italic', 'strike'],
        //   ['hr', 'quote'],
        //   ['ul', 'ol', 'task', 'indent', 'outdent'],
        //   ['table', 'image', 'link'],
        //   ['code', 'codeblock'],
        //   ['scrollSync']
        // ]
      }
    }
  },
  methods: {
    // latexPlugin() {
    //   const toHTMLRenderers = {
    //     latex(node) {
    //       const generator = new latexjs.HtmlGenerator({ hyphenate: false });
    //       const { body } = latexjs.parse(node.literal, { generator }).htmlDocument();

    //       return [
    //         { type: 'openTag', tagName: 'div', outerNewLine: true },
    //         { type: 'html', content: body.innerHTML },
    //         { type: 'closeTag', tagName: 'div', outerNewLine: true }
    //       ];
    //     },
    //   }

    //   return { toHTMLRenderers }
    // }
  }
}
</script>
