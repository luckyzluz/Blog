/**
 * 环境配置封装
 * https://www.fastmock.site/mock/9c617ea4462b67936e0f6c46e5c09235/api
 */
// import { getCurrentInstance } from 'vue'
// const {proxy} = getCurrentInstance();
// proxy.
// this.$api.signedin().then((res) => {
//     console.log(res)
// });
const env= import.meta.env.MODE || 'development';
const EnvConfig = {
    baseApi:`/api`, // 后端接口
    localMockApi:`/localmock`,//本地mock
    remoteMockApi: '/remotemock' // 远程mock
}
// const EnvConfig = {
//     development:{
//         baseApi:`/api`, // 后端接口
//         localMockApi:`/localmock`,//本地mock
//         remoteMockApi: '/remotemock' // 远程mock
//     },
//     production:{
//         baseApi:`/api`, // 后端接口
//         localMockApi:`/localmock`,//本地mock
//         remoteMockApi: '/remotemock' // 远程mock
//     }
// }
const webConfig={ // 网站静态配置
        Logo: {
            light:'src/assets/image/web/logo_白天.png',
            dark:'src/assets/image/web/logo_夜间.png'
        },
        notice:[ // 公告
          {
            icon: 'icon-aixin_shixin',
            content: '本站为暂未开发完毕，敬请期待'
          },
          {
            icon:'icon-point',
            content: '主题功能较多，部分功能未能演示，敬请谅解，如有疑问请与客服联系'
          }
        ],
        slider: {
          headerSliderTop:{  // 首页顶部slider
            isShow:true,
            type:'video',
            list:[
              {
                type:'video',
                url:'src/assets/video/唯美视频背景.webm'
              }
            ]
          },
          homeSliderCon:{ // 首页幻灯片
            isShow:true,
            list:[
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
            name: '测试分类1',
            color:'c-blue',
            badge:{
              name: '优惠',
              color: 'jb-yellow'
            },
            submenu:[]
          },
          {
            name: '测试分类2',
            color:'',
            badge:{
              name: 'NEW',
              color: 'jb-blue'
            },
            submenu:[]
          },
          {
            name: '测试分类3',
            color:'',
            badge:{
              name: '',
              color: ''
            },
            submenu:[]
          },
          {
            name: '测试分类4',
            color:'',
            badge:{
              name: '',
              color: ''
            },
            submenu:[]
          },
          {
            name: '测试分类5',
            color:'',
            badge:{
              name: '',
              color: ''
            },
            submenu:[]
          },
          {
            name: '测试分类6',
            color:'',
            badge:{
              name: '',
              color: ''
            },
            submenu:[
              {
                name: '测试分类6-1',
                color: '',
                badge: {
                  name: 'NEW',
                  color: 'jb-blue'
                }
              },
              {
                name: '测试分类6-2',
                color: '',
                badge: {
                  name: '',
                  color: ''
                }
              },
              {
                name: '测试分类6-3',
                color: '',
                badge: {
                  name: '',
                  color: ''
                }
              },
              {
                name: '测试分类6-4',
                color: '',
                badge: {
                  name: '',
                  color: ''
                }
              }
            ]
          }
        ]
}
export default{
    env,
    mock: 'local', // '' 'local'  'remote'
    namespace:'zblog',
    ...EnvConfig //...EnvConfig[env]
}