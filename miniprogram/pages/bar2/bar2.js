// pages/bar2/bar2.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    active:0,
    start: 0, //分页开始记录数
    count: 20, //一页多少条记录
    movielist: [] //电影列表
  },
  show: function () {
    //  查询云数据库图片路径并且显示
    // 指定的结合
    db.collection("lunbo")
      .get()// 查询数据库
      .then(result => {  //成功的回调函数
         console.log(result)
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
    console.log(1)
    console.log(this.data.list)
  },
  loadMore: function () {
    //分页查询都办电影列表
    //1在data中添加两个属性 一个是start 一个是count
    //2调用云函数movielist1907 并且传递两个参数start count
    wx.cloud.callFunction({
      name: "movelist1907",
      data: {
        start: this.data.movielist.length,
        count: this.data.count
      }
    }).then(res => {
      console.log("123")
      console.log(res.result);
      var rows = JSON.parse(res.result);
      console.log(rows)
      var list1 = this.data.movielist.concat(rows.subjects);
      console.log(list1)
      this.setData({
        movielist: list1
      })
      console.log(1);
      console.log(this.data.movielist)
    }).catch(err => {
      console.log(err)
    })
    // this.loadMore();
    //3在获取眼睛函数返回结果
    //4在data添加list数组电影列表 
    //5 将云函数返回结果保存list
  },
  comment: function (event) {
    console.log(event.target.dataset.id);
    wx.navigateTo({   //保留跳转
      url: `/pages/filmdetail/filmdetail?id=${event.target.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.show();
  
    this.loadMore();
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
    this.loadMore();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})