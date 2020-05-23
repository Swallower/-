// pages/addsite/addsite.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    val1:"123123",
    uname:"",
    placeholder1:"联系人",
    placeholder2: "电话",
    placeholder3: "例 : A座302号",
    radio: "",
    doorplate:"",
    phone:"",
    error1:false,
    error2: false,
    error3: false,
    icon: {
      normal1: '/images/man.png',
      active1: '/images/man1.png',
      normal0: '/images/woman.png',
      active0: '/images/woman1.png'
    },
    items: [
      { name: 'home', value: '家' },
      { name: 'school', value: '学校'}, 
      { name: 'firm', value: '公司' }
    ],
    address:"",
    uli:""
  },
  onChangeName:function(event){
    if (!(/^.{2,9}$/ .test(event.detail.value))){
      wx.showToast({
        title: '联系人最少2个字符',
        duration: 2000,
        icon: 'none',
      })
      this.setData({
        error1:true,
        placeholder1:"联系人不能为空"
      })
    }else{
      this.setData({
        uname:event.detail.value,
        error1:false
      })
    }
    console.log(this.data.uname)
  },
  onChangePhone: function (event) {
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(event.detail.value))) {
     
      wx.showToast({
        title: '手机号格式错误',
        duration: 2000,
        icon: 'none',
      })
      this.setData({
        error2: true,
        placeholder2: "手机号格式错误"
      })
    } else {
      this.setData({
        phone: event.detail.value,
        error2: false
      })
    }
    console.log(this.data.phone)
  },
  onChangeDoorplate: function (event) {
    if (!event.detail.value) {
      wx.showToast({
        title: '门牌号不能为空',
        duration: 2000,
        icon: 'none',
      })
      this.setData({
        error3: true,
        placeholder3: "门牌号不能为空"
      })
    } else {
      this.setData({
        doorplate: event.detail.value,
        error3: false
      })
    }
    console.log(this.data.doorplate)
  },
  onChangeInput(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onChangeSex(event) {
    this.setData({
      radio: event.detail
    });
    console.log(this.data.radio)
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      uli:e.detail.value
    })
  },
  addsite:function(){
    var d=this.data;
    if (d.radio==""||d.error1 == true || d.error2 == true || d.error3 == true ){ 
      wx.showToast({
        title: '添加失败,请按标准填写',
        duration: 2000,
        icon: 'none',
      })
        wx.navigateBack({
        })
        return;
    }else{
      db.collection("mysite")
      .add({
        data:{
          uname:this.data.uname,
          usex:this.data.radio,
          uphone:this.data.phone,
          uaddress:this.data.address,
          udoorplate:this.data.doorplate,
          uli:this.data.uli
        }
        
      })
      .then(res=>{
        // wx.showToast({
        //   title: '添加成功',
        //   duration: 3000,
        // })
        console.log("SUCCESS")
        wx.navigateTo({
          url: '/pages/mysite/mysite',
        })
        // wx.navigateBack({          
        // })
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  jumpmap:function(){
    wx.navigateTo({
      url: '/pages/mymap/mymap',
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
    // 本地获取收藏的发布信息
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