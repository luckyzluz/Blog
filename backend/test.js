const {createFolder,ifExist,checkSeriesNum,getNowSceond,getTimeInfo} = require('./util/utils')
 const fs = require('fs-extra')
 const path = require('path')
 const moment = require('moment')
// console.log(ifExists('./uploads/picture/4043.gif'))
// if(ifExist('./uploads/picture/4043.gif')){
//   console.log('111')
// }else{
//   console.log('222')
// }
// console.log(fs.existsSync('./uploads/picture/'))
// console.log(fs.mkdirsSync('./uploads/picture/2233'))

// console.log(__dirname,'..')
function fn(item) {
  let q = fs.readdirSync(item); //readdirSync 同步读取文件
  // console.log(q);
  for (let i = 0; i < q.length; i++) {
    let item1 = path.join(item,q[i])
    let dir = fs.statSync(item1); //fs.statSync()方法获取路径的详细信息
    // console.log(dir);
    if(dir.isDirectory()){ // isDirectory() 检查是否为文件夹
      fn(item1)
    }else{
      console.log(item1);

    }
  }
}
// fn('./uploads/transfer/111');
// console.log(getNowSceond())

let time = moment(Date.now()).format('YYYY-MM-DD')
function dateToTimestamp(dateStr) {
  if (!dateStr) {
      return ''
  }
  let newDataStr = dateStr.replace(/\.|\-/g, '/')
  let date = new Date(newDataStr);
  let timestamp = date.getTime();
  return timestamp
}
console.log(dateToTimestamp(time))
console.log(getTimeInfo(dateToTimestamp(time)))
// console.log(1111)

  // let xx=[]
  // file.map((item,index)=>{
    // xx.push(item.split('-')[1])
  // })
  // console.log(checkSeriesNum(xx,0,6))

// console.log(checkSeriesNum([1,2,4],0,6))









// })
// const xxx = require('./util/mysql')
// app.get('/',async  function (req, res, next) {
  // 查询
  // let result=await xxx.select('*','z_arts','where zuser_name="admin"')
  // 新增
  // let result=await xxx.insert('z_users',['zuser_ip','zuser_name','zuser_pwd','zuser_email'],['"111"','"admin"','"123456"','"2567046155@qq.com"'])
  // 更新
  // let result=await xxx.update('z_users',['zuser_ip','zuser_pwd','zuser_email'],['"111"','"123456"','"2567046155@qq.com"'],'where zuser_name="admin"')
  
  // 删除
  // let result=await xxx.delete('z_users','where zuser_name="admin"')
  // res.send(result)
      // db.query("select * from z_users where zuser_name='admin1'",[],function(err,result,fields){
        // return res.send({
        //   message:"成功",
        //   data:result
        // })
      // })
// });