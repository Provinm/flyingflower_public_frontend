//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || []
    let app_this = this
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  globalData: {
    userInfo: null,
    host: "http://127.0.0.1:8000/ebrose/",
    cookie: "",
    pivot: ""
  }
})
