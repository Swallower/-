// pages/filmdetail/filmdetail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,

    info: [],
    val1: "",
    val2: "",
    images: [],
    fileids: [],


  },
  onVal1Change(event) {
    // event.detail 为当前输入的值
    this.setData({
      val1: event.detail
    });
    console.log(this.data.val1);

  },
  onVal2Change(event) {
    this.setData({
      val2: event.detail
    });
    console.log(this.data.val2);
  },
  selectImg: function () {
    wx.chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        console.log(this.data.images);

        console.log(res.tempFilePaths);
        this.setData({
          images: res.tempFilePaths
        })
      }
    })
  },
  submit: function () {
    //查询云数据库图片路径并且显示
    wx.showLoading({
      title: '评论中',
    })
    var rows = [];
    //1 创建循环遍历选中数组
    for (var i = 0; i < this.data.images.length; i++) {
      //2 创建Promise完成上传一张图片
      rows.push(new Promise((resolve, reject) => {
        //3 获取当前图片名字
        var item = this.data.images[i];
        //4 拆分字符串获取文件后缀名
        var suffix = /\.\w+$/.exec(item)[0]

        //5 创建新文件名
        var newFile = new Date().getTime();
        newFile += Math.floor(Math.random() * 9999);
        newFile += suffix
        //6 上传云存储中
        wx.cloud.uploadFile({
          cloudPath: newFile,
          filePath: item,
          success: (res) => {
            console.log(123)
            console.log(res.fileID)
            this.fileids.push(res.fileID);
            resolve();
          }
        })
        //7 在data添加属性 fileids
        //8 上传成功将图片fileID保存起来

      })
      );
    }
    Promise.all(rows).then(res => {
      var v1 = this.data.val1;
      var v2 = this.data.val2;
      var fids = this.data.fileids
      db.collection("mymovie")
        .add({
          data: {
            content: v1,
            score: v2,
            fids: fids,
            mid: this.data.id,
          }
        })
        .then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '评论发表成功...',
          })
        })
        .catch(err => {
          console.log(err)
        })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id,
      info: []
    })
    // console.log(this.data.id)
    this.loadMore();
  },
  loadMore: function () {
    wx.cloud.callFunction({
      name: "findDetail",
      data: {
        id: this.data.id
      }

    }).then(res => {

      var obj = JSON.parse(res.result);
      console.log(obj)
      this.setData({
        info: obj
      })
      console.log(this.data.info);
    }).catch(err => {
      console.log(err)
    })
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