// pages/shop/shop.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['0'],
    active: 0,
    activeKey: 0,
    flag: 0,
    currentTab: 0,
    initial:20,
    sum:0,
    nopurchased:"20起送", //未购买 
    totalprice:0,
    list:[
      { title: "拉胯啤酒人", material: "起飞", msales: "9999+", price: "30", number: "0", goodsid:1},
      { title: "秀人秀己喜之螂", material: "起飞", msales: "9999+", price: "24", number: "0", goodsid: 2},
      { title: "团战核心吸血蚊", material: "起飞", msales: "9999+", price: "21", number: "0", goodsid: 3},
      { title: "还望先生救我", material: "刘琦", msales: "9999+", price: "45", number: "0", goodsid: 4},
      { title: "吾既出,必绝之", material: "徐荣", msales: "9999+", price: "999", number: "0", goodsid: 5},
      { title: "狭目之间,只能窥底", material: "许攸", msales: "9999+", price: "450", number: "0", goodsid:6 },
      { title: "言贵者斩", material: "诸葛恪", msales:"9999+", price:"20", number:"0",goodsid: 7 },
      { title: "江东子弟,何惧于天下", material: "孙笨", msales: "9999+", price: "8",number: "0", goodsid:8},
      { title: "我为住上出过力!a~", material: "岑昏", msales: "9999+", price:"45",number:"0", goodsid:9},
      { title: "从主之劝,博览群书", material: "吕蒙", msales: "9999+", price:"350", number:"0", goodsid:10},    
    ],
    discounts:[
      {start:40,end:15},
      {start:60,end:25},
      {start:88,end:40}
    ],
  },
  switchNav: function (e) {
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      flag: id
    });
  },
  catchTouchMove: function (res) {
    return false
  },
  onChangeCollapse(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    });
  },
  onChangeNum(event) {
    console.log(event.detail);
  },
  addtakeout:function(event){
    var item1 = event.currentTarget.dataset.item;
    console.log(item1.goodsid);
    // item.number=event.detail;
    
    for(var key in this.data.list){
      let p=0;
      p = event.detail - this.data.list[key].number ;
      if (this.data.list[key].goodsid==item1.goodsid){
        var number="list["+key+"].number"; 
        this.setData({
          [number]:event.detail
        })
        if(p>0){

          console.log(this.data.sum);
          this.data.sum+=p*this.data.list[key].price;
        }else{
          console.log(this.data.sum);
          this.data.sum += p * this.data.list[key].price;

        }
      }
    }
      this.setData({
        totalprice:this.data.sum
      })
  },
  onChangeTitle(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none'
    // });
    var a = event.detail.name;
    console.log(a);
    this.setData({
      active:a
    })
  },
  jumpSettleAccounts:function(){
    wx.navigateTo({
      url: `/pages/settleaccounts/settleaccounts?list=${JSON.stringify(this.data.list)}&discounts=${JSON.stringify(this.data.discounts)}&shopName=${'大司马下饭操作南京总店'}`,
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