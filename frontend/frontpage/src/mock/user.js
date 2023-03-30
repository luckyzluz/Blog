export default[
    // 用户签到
    {
        url: '/localmock/user/signedin',
        method: 'post',
        response: ({body}) => {
          return {
            code: 20000,
            success: true,
            message: '用户签到成功'
          }
        },
      },
      // 用户登录
      {
        url: '/localmock/user/login',
        method: 'post',
        response: ({body}) => {
          console.log(body)
          return {
            code: 20000,
            success: true,
            message: '用户登录成功'
          }
        },
      },
      {
        url: '/localmock/user',
        method: 'get',
        response: ({body}) => {
          return {
            code: 20000,
            success: true,
            user:{
              name:'hhhh',
              profile: '这家伙很懒，什么都没有写...',
              avatar: 'https://gw.alipayobjects.com/zos/basement_prod/740e223d-7c72-4259-93f3-df7e608e9376.svg',
              level: 2,
              forum_post:6,
              post: 33,
              comment: 33,
              view:33
            },
            message: '数据获取成功'
          }
        },
      },
]