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
        url: '/localmock/test',
        method: 'get',
        response: ({body}) => {
          return {
            code: 20000,
            success: true,
            message: '用户签到成功'
          }
        },
      },
]