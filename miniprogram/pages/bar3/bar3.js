// pages/bar3/bar3.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    order:[],
    title:[],
    num:[],
    time:[],
  },
  getopenid:function(){
    let page = this;
    wx.cloud.callFunction({
      name: 'openid',
      complete: res => {
        console.log('openid--', res.result)
        var openid = res.result.openid
        page.setData({
          openid: openid
        })
      }
    })
  },
  getOrder:function(){
    db.collection("submitOrder")
    .get()
    .then(res=>{
      this.setData({
        order:res.data
      })
      console.log(this.data.order)
      this.getListNumTitle();
    })
    .catch(err=>{
      console.log(err)
    })
  },
  getListNumTitle:function(){
    function addZero(num) {
      if (num < 10)
        return "0" + num;
      return num;
    }

    var nowtime=Date.parse(new Date());
    var t = new Array();
    var that=this.data.order;
    var l = new Array(20).fill("");;
    var n = new Array(20).fill(0);;
    console.log(that.length)
    for(var i=0;that.length>i;i++ ){
      for (var j = 0; that[i].list.length > j; j++){
        if(that[i].list[j].number>0){
          n[i] += that[i].list[j].number;
          l[i] += that[i].list[j].title+" ";
        }
      }

      if (nowtime - that.orderTime > 86400000){
        var oDate = new Date(that.orderTime);
        let  oYear = oDate.getFullYear();
        let  oMonth = oDate.getMonth() + 1;
        let  oDay = oDate.getDate();
        let  oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay) //最后拼接时间
          
        t[i]=otime;
      }else{
        let date=nowtime-that.orderTime;
        var oDate = new Date(date);
        let oHour = oDate.getHours();
        let oMin = oDate.getMinutes();
        let oTime = addZero(oHour) + ':' + addZero(oMin) + ':' ;//最后拼接时间
        t[i] = oTime;
      }

    }
    this.setData({
      title:l,
      num:n,
      time:t,
    })
    console.log(this.data.title);
    console.log(this.data.num);
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})