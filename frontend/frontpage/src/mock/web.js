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
              slider: [
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
            },
            message: '数据获取成功'
          }
        },
      },

]