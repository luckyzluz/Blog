export default[
    {
        url: '/localmock/slider',
        method: 'get',
        response: ({body}) => {
          return {
            code: 20000,
            success: true,
            data: [
                {
                  title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
                  url:'http://baidu.com',
                  imgUrl: 'src/assets/image/slider/社区论坛-幻灯片1.jpg'
                },
                {
                  title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
                  url:'http://baidu.com',
                  imgUrl: 'src/assets/image/slider/推广计划幻灯片2.jpg'
                },
                {
                  title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
                  url:'http://baidu.com',
                  imgUrl: 'src/assets/image/slider/zhifu-2-1.jpg'
                },
                {
                  title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
                  url:'http://baidu.com',
                  imgUrl: {
                    bg: 'src/assets/image/slider/slider-bg.jpg',
                    layer_1: 'src/assets/image/slider/slider-layer-1.png',
                    layer_2: 'src/assets/image/slider/slider-layer-2.png'
                  }
                },
                {
                  title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
                  url:'http://baidu.com',
                  imgUrl: 'src/assets/image/slider/客服二维码-幻灯片.jpg'
                },
                {
                  title: '子比定制-Wordpress主题模板-zibll子比主题官方演示',
                  url: 'http://baidu.com',
                  imgUrl: {
                    bg: 'src/assets/image/slider/定制-背景.jpg',
                    layer_1: 'src/assets/image/slider/定制-图层1.png',
                    layer_2: 'src/assets/image/slider/定制-图层2-3.png'
                  }
                }
              ],
            message: '数据获取成功'
          }
        }
    },
    {
        url: '/localmock/blog',
        method: 'get',
        response: ({body}) => {
          return {
            code: 20000,
            success: true,
            data: {
              Logo: 'src/assets/image/web/logo_夜间.png',
              notice:[
                {
                  icon:'icon-point',
                  content: '主题功能较多，部分功能未能演示，敬请谅解，如有疑问请与客服联系'
                },
                {
                  icon: 'icon-aixin_shixin',
                  content: '本站为演示站，购买主题、管理授权请转至www.zibll.com'
                }
              ],
              slider: {
                headerSliderTop:{
                  isShow:true,
                  type:'video',
                  list:[
                    {
                      type:'video',
                      url:'src/assets/video/唯美视频背景.webm'
                    }
                  ]
                },
                homeSliderCon:{
                  isShow:true,
                  list:[
                    {
                      title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
                      url:'http://baidu.com',
                      imgUrl: 'src/assets/image/slider/社区论坛-幻灯片1.jpg'
                    },
                    {
                      title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
                      url:'http://baidu.com',
                      imgUrl: 'src/assets/image/slider/推广计划幻灯片2.jpg'
                    },
                    {
                      title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
                      url:'http://baidu.com',
                      imgUrl: 'src/assets/image/slider/zhifu-2-1.jpg'
                    },
                    {
                      title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
                      url:'http://baidu.com',
                      imgUrl: {
                        bg: 'src/assets/image/slider/slider-bg.jpg',
                        layer_1: 'src/assets/image/slider/slider-layer-1.png',
                        layer_2: 'src/assets/image/slider/slider-layer-2.png'
                      }
                    },
                    {
                      title:'更优雅的Wordpress主题模板_WP中文主题_zibll主题_子比主题官方演示',
                      url:'http://baidu.com',
                      imgUrl: 'src/assets/image/slider/客服二维码-幻灯片.jpg'
                    },
                    {
                      title: '子比定制-Wordpress主题模板-zibll子比主题官方演示',
                      url: 'http://baidu.com',
                      imgUrl: {
                        bg: 'src/assets/image/slider/定制-背景.jpg',
                        layer_1: 'src/assets/image/slider/定制-图层1.png',
                        layer_2: 'src/assets/image/slider/定制-图层2-3.png'
                      }
                    }
                  ]
                }
              },
              pageList: [
                {
                  name: '购买主题',
                  color:'c-blue',
                  badge:{
                    name: '优惠',
                    color: 'jb-yellow'
                  },
                  submenu:[]
                },
                {
                  name: '社区',
                  color:'',
                  badge:{
                    name: 'NEW',
                    color: 'jb-blue'
                  },
                  submenu:[]
                },
                {
                  name: '官方演示',
                  color:'',
                  badge:{
                    name: '',
                    color: ''
                  },
                  submenu:[]
                },
                {
                  name: '需求提交',
                  color:'',
                  badge:{
                    name: '',
                    color: ''
                  },
                  submenu:[]
                },
                {
                  name: 'BUG反馈',
                  color:'',
                  badge:{
                    name: '',
                    color: ''
                  },
                  submenu:[]
                },
                {
                  name: '主题教程',
                  color:'',
                  badge:{
                    name: '',
                    color: ''
                  },
                  submenu:[
                    {
                      name: '视频教程',
                      color: '',
                      badge: {
                        name: 'NEW',
                        color: 'jb-blue'
                      }
                    },
                    {
                      name: '文档检索',
                      color: '',
                      badge: {
                        name: '',
                        color: ''
                      }
                    },
                    {
                      name: '主题功能',
                      color: '',
                      badge: {
                        name: '',
                        color: ''
                      }
                    },
                    {
                      name: '配置教程',
                      color: '',
                      badge: {
                        name: '',
                        color: ''
                      }
                    }
                  ]
                }
              ]
            },
            message: '数据获取成功'
          }
        },
      },

]