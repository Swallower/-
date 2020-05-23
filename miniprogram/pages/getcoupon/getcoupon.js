// pages/getcoupon/getcoupon.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon:0,
    condition:0,
  },
  getcoupon:function(){
    let num=Math.random()*10;
    if(num<=7){
      this.setData({
        coupon:3,
        condition:25,
      })      
    }
    else if(num<=9){
      this.setData({
        coupon:6,
        condition:30
      })
    }
    else{
      this.setData({
        coupon:10,
        condition:0
      })
    }
    db.collection("coupon")
    .add({
      data:{
        coupon:this.data.coupon,
        condition:this.data.condition
      }
    })
    .then(res=>{
      console.log("成功")
      wx.showToast({
        title: '已领取',
        duration: 1000,
        icon: 'success'
      })

    })
    .catch(err=>{
      console.log(err);
      wx.showToast({
        title: '领取失败',
        duration: 1000,
        icon: 'none'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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