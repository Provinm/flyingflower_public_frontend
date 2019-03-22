// pages/asr/asr.js

const recordingMgr = wx.getRecorderManager()
const app = getApp()

// 发送录音文件到 server
// src 是临时的录音文件
function sendAudioData(src) {
  let host = app.globalData.host;
  var file_options = {
    url: host + "asr/",
    filePath: src,
    name: "file",
    success: function display_info(result) {
      wx.hideLoading({
        success: function () {
          console.log("get result", result)
          var data = JSON.parse(result.data);
          var msg = "";

          // asr 成功或失败
          if ("result" in data) {
            msg = data.result;
            wx.navigateTo({
              url: '../info?msg='+msg,
            })
          } else {
            msg = data.msg;
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
          // var cur_page = getCurrentPages()[0];
          // cur_page.setData({ msg: msg })

        }
      })
      
    },
    fail: function display_error(error) {
      wx.hideToast({
        success: function () {
          wx.navigateBack({
            "delta": 1
          })
        }
      })
      console.log("error happended");
    }
  }

  wx.uploadFile(file_options)
};

function playInnerAudio(src) {
  const innerAudio = wx.createInnerAudioContext();
  innerAudio.src = src;
  innerAudio.autoplay = true;
}

// 注册停止播放的回调
recordingMgr.onStop(res => {
  // playInnerAudio(res.tempFilePath);
  wx.showLoading({
    title: '正在加载',
    success: function () {
      sendAudioData(res.tempFilePath)
      // playInnerAudio(res.tempFilePath)
    }
  })
})

Page({

  /**
   * Page initial data
   */
  data: {
    pivot: ""
  },

  // recording
  start_recording: function () {
    // var ReMgr = that.recordingMgr;
    console.log("start recording")
    const options = {
      sampleRate: 16000,
      format: "mp3",
    };
    recordingMgr.start(options);
  },

  stop_recording: function () {
    console.log("stop recording")
    recordingMgr.stop();
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      pivot: options.p
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})