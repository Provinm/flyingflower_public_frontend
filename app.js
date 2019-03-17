//app.js
var Util = require('./utils/util.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || []
    let app_this = this
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     let encryptdata = {}
    //     encryptdata["code"] = res["code"]
    //     wx.getUserInfo({
    //       success: res => {
    //         encryptdata['encrypteddata'] = res['encryptedData']
    //         encryptdata['iv'] = res['iv']
    //         let edata = Util.json2Form(encryptdata)
    //         console.log('加密信息', edata)
    //         wx.request({
    //           url: app_this.globalData.host + 'login/',
    //           method: 'POST',
    //           data: edata,
    //           header: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //             // "content-type": "application/json"
    //           },
    //           success: res => {
    //             // cookie = res["cookie"]
    //             console.log("get login res = ", res)
    //             res = res["data"]
    //             if (res["ret"] == 0) {
    //               wx.setStorage({
    //                 key: 'cookie',
    //                 data: res["data"]["cookie"]
    //               })
    //               app_this.cookie = res["data"]["cookie"]
    //             } else {
    //               console.log("cannot login")
    //             }
    //           },
    //           fail: res => {
    //             console.log('请求服务器失败')
    //             // wx.navigateTo({
    //             //   url: '../error/error?errorinfo=' + '请求服务器失败',
    //             // })
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

  globalData: {
    userInfo: null,
    host: "http://127.0.0.1:8000/riverland/",
    cookie: "",
    pivot: ""
  }
})