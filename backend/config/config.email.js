/**
 * 邮箱配置
 */

module.exports = {
    EmailVerifyConfig:{
        isEmailVerify: {
          RegisteredAccount : false,
          UpdatePassword: false
        },
        smtpConfig: {
          host: 'smtp.qq.com',
          port: 465,
          secure: true, // 使用 SSL
          secureConnection: true, // 使用 SSL
          auth: {
            user: '2567046155@qq.com', //注册的邮箱账号
            pass: 'eckhfvvstjendjgh' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
          }
        },
        EffectiveTime: 5*60,
        Template: 'letter'
      }
}