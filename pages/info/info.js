// pages/info/info.js
const app = getApp()
var Utils = require("../../utils.js")

Page({

  /**
   * Page initial data
   */
  data: {
    text: [],
    author: "",
    title: "",
    sentence: "",
    bt_text: "答得很棒，让AI接招"
  },
  ai_turn: function(){
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.globalData.host + 'tts',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        token: app.globalData.cookie
      },
      success: res => {
        wx.hideLoading()
        console.log(res)
        var resp = res.data
        if ("data" in resp) {
          var ele = resp.data;
          wx.redirectTo({
            url: '../tts/tts?text=' + ele.text + '&author=' + ele.author + '&title=' + ele.title,
          })
        } else {
          var msg = resp.msg;
          wx.showModal({
            title: "提示",
            content: msg,
            showCancel: false,
            confirmText: "返回首页",
            success: function (res) {
              if (res.confirm) {
                // wx.navigateBack({
                //   delta: 2
                // })
                wx.redirectTo({
                  url: '../index/index',
                })
              }
            }
          })
        }
      },
      fail: res => {
        console.log("请求网络失败")
        wx.hideLoading()
        wx.showModal({
          title: "异常",
          content: msg,
          showCancel: false,
          confirmText: "返回首页",
          success: function (res) {
            if (res.confirm) {
              // wx.navigateBack({
              //   delta: 2
              // })
              wx.redirectTo({
                url: '../index/index',
              })
            }
          }
        })
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // var result = split_sentence()
    var result = Utils.beautify_poetry(options.text, app.globalData.pivot)

    this.setData({
      text: result[1],
      author: Utils.handle_author(options.author),
      title: Utils.handle_title(options.title),
      sentence: result[0]
    })
  },
})