/// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
//功能:向豆瓣发送ajax请求
//引入模块 rp
const rp = require("request-promise")
// 云函数入口函数
exports.main = async (event, context) => {
  //创建变量url 公司网址
  var url = `http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`;
  //向网址发送请求 
  return rp(url) //发送请求
    .then(res => { //成功回调
      return res; //将结果返回
    })
    .catch(err => { //失败回调
      console.log(err)
    })
}