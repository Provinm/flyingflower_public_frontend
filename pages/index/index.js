//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pivot: "花",
    modalVisible: false,
    loadingSpin: false,
    failVisible: false
  },

  river_start: function(){
    wx.navigateTo({
      url: '../asr/asr?p=' + this.data.pivot,
    })
  },
  start: function(){
    let that = this;
    let pivot = that.data.pivot;
    let host = app.globalData.host;
    let cookie = app.globalData.cookie
      // 显示弹窗
    that.data.loadingSpin = true
    wx.request({
      url: host+"pivot",
      data: {
        "pivot": pivot,
      },
      success: res => {
        console.log(res);
        // 把申请的 cookie 赋值到全局
        that.data.loadingSpin = false
        app.globalData.cookie = res.cookie;
        app.globalData.pivot = pivot
        wx.navigateTo({
          url: '../asr/asr', 
        })
      },
      fail: res => {
        console.log(res);
        that.data.loadingSpin = false;
        that.data.failVisible = true
      }
    })
  },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
