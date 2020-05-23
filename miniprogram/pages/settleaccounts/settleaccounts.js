// pages/settleaccounts/settleaccounts.js
const db=wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shopName:'',
    list:[],//商家商品全部信息
    mysite:[],//获取个人全部保存地址信息
    fcontainerprice:0,//餐盒总费用
    univalence:2,//餐盒单价
    totalprice:0,//实际付款金额
    // activeName: '0',
    checked: true,//号码保护是否开启
    discounts:[],//获取店铺所有优惠条款
    discount:0,//满足店铺优惠的最大金额
    show: false,//选择地址判断
    show1: false,//选择红包判断
    site:[],//当前选中的地址信息
    flag:false,//辅助地址信息的判断
    flag1:false,//辅助优惠劵样式以及付款金额等样式判断
    coupon:[],//获取用户所有优惠劵信息
    selcoupon:0,//选择的优惠劵金额
    text:'',//订单备注内容
    tableware:0,//额外餐具份数
  },
  getMyCoupon:function (){
    db.collection('coupon')
      .get()
      .then(res => {
        console.log(res.data);
        this.setData({
          coupon: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  },
  getmysite:function(){
    db.collection("mysite")
    .get()
    .then(res=>{
      console.log(res.data);
      this.setData({
        mysite:res.data,
        site:res.data[0]
      })
    })
    .catch(err=>{
      console.log(err);
    })
  },
  getFoodContainerPrice:function(){
    let sum=0;
    for(var item of this.data.list){
      if(item.number>0){
        sum+=item.number;
      }
    }
    console.log(sum);
    this.setData({
      fcontainerprice: sum *this.data.univalence
    })
  },
  getTotalPrice:function(){
    let sum=0;
    for(var item of this.data.list){
      if(item.number>0){
        sum+=item.number*item.price
      }
    }
    this.setData({
      sum:sum,
      totalprice: sum + this.data.fcontainerprice + 1 - this.data.discount - this.data.selcoupon 
    })  
    console.log(this.data.totalprice)
  },
  judjediscounts:function(){
    let sum=0;
    for(var item of this.data.list){
      if(item.number>0){
        sum+=item.number*item.price
      }
    }
    if (sum >= this.data.discounts[0].start && sum <= this.data.discounts[1].start){
      this.setData({
        discount:this.data.discounts[0].end
      })
    } 
    else if (sum >= this.data.discounts[1].start && sum <=this.data.discounts[2].start){
      this.setData({
        discount: this.data.discounts[1].end  
      })
    } 
    else if (sum >= this.data.discounts[2].start){
      this.setData({
        discount:this.data.discounts[2].end
      })
    }
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  // onChangeText(event) {
  //   this.setData({
  //     activeName: event.detail
  //   });
  // },
  notouch:function(){
    wx.showToast({
      title: '主子,您暂时不满足条件呢',
      icon:'none',
      duration: 2000,
    })
  },
  onChangeTableware(event) {
    console.log(event.detail);
    this.setData({
      tableware:event.detail
    })
  },
  onChangeSwitch({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  selectSite:function(event){
    let item = event.currentTarget.dataset.item;
    console.log(item)
    this.setData({
      flag:true,
      site:item
    })
    console.log(this.data.site)
  },
  showPopup1() {
    this.setData({ show1: true });
  },

  onClose1() {
    this.setData({ show1: false });
  },
  getselcoupon:function(event){
    let item = event.currentTarget.dataset.selcoupon;
    console.log(item)
    this.setData({
      flag1: true,
      selcoupon:item.coupon 
    })
    console.log(this.data.selcoupon)
    this.getTotalPrice();
    
    wx.showToast({
      title: '使用成功',
      icon: 'success',
      duration: 1000,
    })
  },
  onChangeText(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      text:event.detail
    })
  },
  submitOrder:function(){
    var orderTime=Date.parse(new Date());
    console.log(orderTime);
    var that=this.data
    db.collection("submitOrder")
    .add({
      data:{
        shopName:that.shopName,
        list:that.list,
        fcontainerprice:that.fcontainerprice,
        totalprice:that.totalprice,
        checked:that.checked,
        site:that.site,
        selcoupon:that.selcoupon,
        text:that.text,
        tableware:that.tableware,
        discounts:that.discounts,
        discount:that.discount,
        flag:that.flag,
        flag1:that.flag1,  
        orderTime: orderTime,
      }
    })
    .then(res=>{
      console.log(res);
      
      wx.showToast({
        title: '下单成功',
        duration: 1000,
        icon: 'success'
      })
      setTimeout(function(){
        wx.switchTab({
          url: '../bar3/bar3',
          success: function (e) {
            var page = getCurrentPages().pop();

            page.onLoad();
          }
        })
        
      },1000)
    })
    .catch(err=>{
      console.log(err)
      wx.showToast({
        title: '错误,请重试',
        duration: 1000,
        icon: 'none'
      })    
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var accounts=JSON.parse(options.list);
    var _discounts = JSON.parse(options.discounts)
    var shopName=options.shopName;
    console.log(shopName);
    this.setData({
      list:accounts,
      discounts:_discounts,
      shopName:shopName
    })
    this.getmysite();
    this.getFoodContainerPrice();
    this.judjediscounts();
    this.getMyCoupon();
    this.getTotalPrice();
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
   * 页面相关事件处理函SS数--监听用户下拉动作
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