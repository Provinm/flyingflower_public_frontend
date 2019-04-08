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
  getPivot: function(e) {
    let p = e.detail.value
    this.setData({
      pivot: p
    })
  },

  river_start: function(){
    wx.navigateTo({
      // url: '../asr/asr?p=' + this.data.pivot,
      url: "../info/info?msg=床前明月光，疑是地上霜&author=李白&title=静夜思" 
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
        let data = res.data
        if (data.ret == 0) {
          // 把申请的 cookie 赋值到全局
          app.globalData.cookie = res.data.token;
          app.globalData.pivot = pivot
          wx.navigateTo({
            url: '../asr/asr?p=' + pivot,
          })
        } else {
          wx.showModal({
            title: '错误',
            content: data.msg,
            showCancel: false,
            confirmText: "返回首页",
            success(res) {
              if (res.confirm){
                wx.navigateBack({
                  delta:1
                })
              }
            }
          })
        }
      },
      fail: res => {
        console.log(res);
        wx.showModal({
          title: '错误',
          content: "网络出现错误",
          showCancel: false,
          confirmText: "返回首页",
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
    })
  },
})
