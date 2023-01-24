/**
 * 默认配置
 */
module.exports = {
    PORT: 3000, // express 服务启动端口(默认3000)
    ENV:"development", // development production test
// 9faea7c8-67aa-11ec-90d6-0242ac120003
    jwtAccessSecret:'FbfkO40bLH20Iko4YNPdLCdzlOUpFgfXtoObT2ey',
    jwtRefreshSecret:'YC0l7GPEVpSVPCJfkEHjlVCndP4tp62xIkMBMbeX',
    yuqueConfig:{
      AccessToken:"x9VOFtj9D4VFNceGrD9nKKdSOCPurCWh9Nkurpjc",
      user:"luckyzluz",
      baseUrl:"https://www.yuque.com/api/v2"
    },
    video:{
      videoApi:[
        {
          name:"M3u8",
          url:"https://www.m3u8.tv.cdn.8old.cn/jx2022/index..php",
          delete:""
        },
        {
          name:"测试1",
          url:"https://json.hfyrw.com/mao.go",
          delete:"Mao"
        }
      ],
      videoUrl:[
        {
          name:"M3u8",
          url:"https://jx.m3u8.tv/jiexi/?url="
        },
        {
          name:"parwix",
          url:"https://jx.parwix.com:4433/player/?url="
        },
        {
          name:"iztyy",
          url:"https://jx.iztyy.com/svip/?url="
        },
        {
          name:"M3u8",
          url:"https://jx.iztyy.com/svip/?url="
        },
        {
          name:"忘忧国",
          url:"https://ax.jx.cn/?url="
        }
    ]
    }
}