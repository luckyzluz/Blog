export default {
  toolbarConfig: {
    pin: true, // 是否固定工具栏
    hide: false // 是否隐藏工具栏
  },
  toolbar: [
    'emoji',
    'link',
    'upload',
    'edit-mode',
    {
      name: 'more',
      toolbar: [
        'insert-after',
        'fullscreen',
        'preview',
        'info',
        'help'
      ]
    }
  ]
}
