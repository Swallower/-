// pages/mysite/mysite.jscon
const db=wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    sex: ["女士", "先生"],
    item:""
  },
  jumpAddSite:function(){
    wx.navigateTo({
      url: '/pages/addsite/addsite',
    })
  },
  jumpupdate:function(event){
    console.log(event);
    this.setData({
      item:event.currentTarget.dataset.id
    })
    console.log(this.data.item)
    var i = JSON.stringify(this.data.item)
    console.log(i)
    wx.navigateTo({
      url: '/pages/updatesite/updatesite?item='+i,
    })
  },
  deletesite:function(event){
    this.setData({
      item: event.currentTarget.dataset.id
    })
    console.log(this.data.item)
    var t=this.data.item;
    console.log(t._id)
    wx.showModal({
      title: '删除地址',
      content: '确认删除该收货地址',
      success(res){
        if(res.confirm){
          console.log('用户点击确定')
          db.collection("mysite")
          .doc(t._id)
          .remove()
          .then(res=>{
            console.log("删除成功")
            wx.navigateTo({
              url: '/pages/mysite/mysite',
            })
          })
          .catch(err=>{
            console.log(err)
          })
        }else if(res.cancel){
          console.log("已取消")
        }
      }
    })
  },
    mysite:function(){

      db.collection("mysite")
        .get()
        .then(res =>{
          this.setData({
            list:res.data
          })
          console.log(this.data.list)  
        }) 
        .catch(err=>{
          console.log(err)
        }) 
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mysite();
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