// pages/bar4/bar4.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:"",
    uimg:"",
    couponNum:0,
    mysite:[],
  },
  getUserinfo: function(event){
    var name=event.detail.userInfo.nickName;
    var img=event.detail.userInfo.avaterUrl;
    this.setData({
      uname:name,
      uimg:img
    })
    console.log(this.data.uname);
    console.log(1)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  jumpsite:function(){
    wx.navigateTo({
      url: '/pages/mysite/mysite',
    })
  },
  jumpnull:function(){
    wx.navigateTo({
      url: '/pages/null/null',
    })
  },
  jumpCoupon:function(){
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
  jumpgetcoupon:function(){
    wx.navigateTo({
      url: '/pages/getcoupon/getcoupon',
    })
  },
  getCouponNum:function(){
    db.collection("coupon")
    .get()
    .then(res=>{
      console.log(res.data.length)
      this.setData({
        couponNum:res.data.length
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },
  getCouponPhone: function () {
    db.collection("mysite")
      .get()
      .then(res => {
        console.log(res.data)
        this.setData({
          mysite: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  onLoad: function (options) {
    this.getCouponNum();
    this.getCouponPhone();
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