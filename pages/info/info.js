// pages/info/info.js
const app = getApp()

var split_sentence = function (sentence, pivot) {
  var s = sentence.split("。")
  s = s.filter(function(i){
    return Boolean(i)
  })
  var target = ""
  var i
  for (i=0; i<s.length; i++) {
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
          wx.navigateTo({
            url: '../tts/tts?text=' + ele.text + '&author=' + ele.author + '&title=' + ele.title,
          })
        } else {
          var msg = resp.msg;
          wx.showModal({
            title: "异常",
            content: msg,
            showCancel: false,
            confirmText: "返回首页",
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 2
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
              wx.navigateBack({
                delta: 2
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
    var result = split_sentence(options.text, app.globalData.pivot)

    this.setData({
      text: result[1],
      author: options.author,
      title: options.title,
      sentence: result[0]
    })
  },
})