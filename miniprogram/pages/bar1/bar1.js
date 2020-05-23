// pages/bar1/bar1.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:"",
    active:0,
    list:[],
  },
  jumpshop:function(){
    wx.navigateTo({
      url: '/pages/shop/shop',
    })
  },
  jumpmap:function(){
    wx.navigateTo({
      url:"/pages/mymap/mymap"
    })
  },
  show: function () {
    //  查询云数据库图片路径并且显示
    // console.log(`show`)
    // 指定的结合
    db.collection("lunbo")
      .get()// 查询数据库
      .then(result => {  //成功的回调函数
        //  console.log(result.data)
        this.setData({  // 设置  list的值
          //  将数据查询出的结果 保存在list数组中
          list: result.data
        })
        //  this.data.list 是  获取data对象中list数组 
         console.log(this.data.list)
      })
      .catch(err => { // 失败的回到函数
        console.log(err)
      })
    console.log("show")
  },
  onChange(event) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.show();
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
    var that = this;
    wx.getStorage({
      key: 'releases',
      success: function (res) {
        that.setData({
          address: res.data
        });
        console.log(that.data.address)
      },
    })
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