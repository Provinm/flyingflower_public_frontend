
// pages/tts/tts.js

const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()

var Utils = require("../../utils.js")

var play = function (path) {
  innerAudioContext.src = path
  innerAudioContext.play()
}


Page({

  /**
   * Page initial data
   */
  data: {
    text: [],
    author: "",
    title: "",
    sentence: ""
  },

  start_tts: function () {
    var text = this.data.sentence
    wx.showLoading({
      title: '正在加载',
    })
    var tts_url = app.globalData.host + "speech?" + "sentence=" + text + "&token=" + app.globalData.cookie
    console.log(tts_url)
    wx.downloadFile({
      url: tts_url,
      success: res => {
        wx.hideLoading()
        if (res.statusCode === 200) {
          // console.log(res)
          // console.log(res.tempFilePath)
          play(res.tempFilePath)
        } else {
          wx.showModal({
            title: "异常",
            content: "网络错误",
            showCancel: false,
            confirmText: "返回首页",
            success: function (res) {
              if (res.confirm) {
                // wx.navigateBack({
                //   delta: 0
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
        wx.hideLoading()
        wx.showModal({
          title: "异常",
          content: "网络错误",
          showCancel: false,
          confirmText: "返回首页",
          success: function (res) {
            if (res.confirm) {
              // wx.navigateBack({
              //   delta: 0
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

  user_turn: function () {
    wx.redirectTo({
      url: '../asr/asr',
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var result = Utils.beautify_poetry(options.text, app.globalData.pivot)
    console.log(result)
    this.setData({
      text: result[1],
      author: Utils.handle_author(options.author),
      title: Utils.handle_title(options.title),
      sentence: result[0]
    })
  },

})