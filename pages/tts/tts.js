
// pages/tts/tts.js

const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()

var play = function (path) {
  innerAudioContext.src = path
  innerAudioContext.play()
}

var split_sentence = function (sentence, pivot) {
  var s = sentence.split("。")
  s = s.filter(function (i) {
    return Boolean(i)
  })
  var target = ""
  var i
  for (i = 0; i < s.length; i++) {
    var item = s[i]
    if (item.includes(pivot)) {
      target = item
      break
    }
  }
  return [target, s]
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
          console.log(res)
          console.log(res.tempFilePath)
          play(res.tempFilePath)
        } else {
          wx.showModal({
            title: "异常",
            content: "网络错误",
            showCancel: false,
            confirmText: "返回首页",
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 0
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
              wx.navigateBack({
                delta: 0
              })
            }
          }
        })
      }

    })
  },

  user_turn: function () {
    wx.navigateTo({
      url: '../asr/asr',
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var result = split_sentence(options.text, app.globalData.pivot)
    console.log(result)
    this.setData({
      text: result[1],
      author: options.author,
      title: options.title,
      sentence: result[0]
    })
  },

})