// pages/mymap/mymap.js
var qqmapwx=require("../../mapsdk/qqmap-wx-jssdk.min.js");
var qqmapsdk=new qqmapwx({
  key:"ZEKBZ-QDW66-ZKLSA-M26YA-GOSIZ-64F7Z"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 中心点纬度、经度
    latitude: "",
    longitude: "",
    // 标记点 当前位置
    markers: [],
    // 圆
    circles: [],
    // 控件 回到当前位置
    controls: [],
    address:"",
    mysite:""
  },

  // 回到当前位置
  locationClick: function (event) {
    var thisBlock = this;

    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        console.log(res);

        thisBlock.setData({
          latitude: res.latitude,
          longitude: res.longitude,

          markers: [{
            iconPath: "/images/_1.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 35,
            height: 35,
            title: "当前位置",
            callout: {
              padding: 10,
              content: "当前位置",
              bgColor: "#DC143C",
              color: "#ccc",
              display: "ALWAYS"
            },
            label: { content: "标题" },
            anchor: {}
          }],
        })
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var address = addressRes.result.formatted_addresses.recommend;
            console.log(address)
            wx.setStorage({
              key: 'releases',
              data: address
            })
            // 返回上一页
            wx.navigateBack({
              
            })
            // wx.navigateTo({
            //   url: '/pages/addsite/addsite',
            // });
          }
        })
        /* 把发布信息异步存储到缓存当中 */
      },
    })
  },

  // 选择位置
  selectedClick: function () {
    // 设置权限
    wx.openSetting({
      success: function (res) {
        console.log(res);

        // 选择位置
        wx.chooseLocation({
          success: function (res) {
            console.log(res);
            console.log(res.address);
            wx.setStorage({
              key: 'releases',
              data: res.address
            })
            wx.navigateBack({
              delta: 1
            })
            // wx.navigateTo({
            //   url: '/pages/addsite/addsite',
            // })
            // 打开位置
            // wx.openLocation({
            //   latitude: res.latitude,
            //   longitude: res.longitude,
            //   name: res.name,
            //   address: res.address,
            // })
          },

        })
      }
    })
  },

    // 改变中心点位置
  regionChange: function (res) {
    if (res.type == "end") {
      var thisBlock = this;
      this.mapCtx = wx.createMapContext("centerChange");
      this.mapCtx.getCenterLocation({
        success: function (res) {
          console.log(res);
          thisBlock.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            markers: [{
              iconPath: "/images/_1.png",
              id: 0,
              latitude: res.latitude,
              longitude: res.longitude,
              width: 35,
              height: 35,
              title: "当前位置",
              callout: {
                padding: 10,
                content: "当前位置",
                bgColor: "#DC143C",
                color: "#FFFF00",
                display: "ALWAYS"
              },
              label: { content: "标题" },
              anchor: {}
            }],
          })
        }
      })
    }
  },

  // 回到当前位置
  controlClick: function (res) {
    console.log(res);
    var thisBlock = this;

    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        console.log(res);

        thisBlock.setData({
          latitude: res.latitude,
          longitude: res.longitude,

          markers: [{
            iconPath: "/images/_1.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 35,
            height: 35,
            title: "当前位置",
            callout: {
              padding: 10,
              content: "当前位置",
              bgColor: "#DC143C",
              color: "#FFFF00",
              display: "ALWAYS"
            },
            label: { content: "标题" },
            anchor: {}
          }],
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前位置
    var thisBlock = this;
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        console.log(res);
        thisBlock.setData({
          latitude: res.latitude,
          longitude: res.longitude,
       
          markers: [{
            iconPath: "/images/_1.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 35,
            height: 35,
            title: "当前位置",
            callout: {
              padding: 10,
              content: "当前位置",
              bgColor: "#DC143C",
              color: "#FFFF00",
              display: "ALWAYS"
            },
            label: { content: "标题" },
            anchor: {}
          }],
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            radius: 10,
            strokeWidth: 2,
            fillColor: "#FAFAD2",
            color: "#90EE90"
          }],
          controls: [{
            id: 1001,
            position: { left: 10, top: 10, width: 35, height: 35 },
            iconPath: "/images/_1.png",
            clickable: true
          }],
        })
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            // console.log(address.result)
            var address = addressRes.result.formatted_addresses.recommend;
            console.log(address)
            /* 把发布信息异步存储到缓存当中 */
            // wx.setStorage({
            //   key: 'releases',
            //   data: address,
            // })
            // // 返回上一页
            // wx.navigateTo({
            //   url: '/pages/addsite/addsite',
            // });
          }
        })
       
        // qqmapsdk.reverseGeocoder({  
        //   location: {
        //     latitude: res.latitude,
        //     longitude: res.longitude
        //   },
        //   success: function (res) {
        //     console.log(res)  //获取成功
        //     console.log(res.result.address)  //获取当前位置信息
        //   }
        // })
      },
    })
  }
})