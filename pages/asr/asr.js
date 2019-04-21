// pages/asr/asr.js

const recordingMgr = wx.getRecorderManager()
const app = getApp()

// 发送录音文件到 server
// src 是临时的录音文件
function sendAudioData(src) {
  let host = app.globalData.host;
  var file_options = {
    url: host + "asr/",
    formData:{
      token: app.globalData.cookie
    },
    filePath: src,
    name: "file",
    formData:{
      token: app.globalData.cookie
    },
    success: function display_info(result) {
      wx.hideLoading({
        success: function () {
          console.log("get result", result)
          var data = JSON.parse(result.data);
          var msg = "";

          // asr 成功或失败
          if ("data" in data) {
            var ele = data.data;
            wx.redirectTo({
              url: '../info/info?text='+ele.text + '&author=' + ele.author + '&title=' + ele.title,
            })
          } else {
            msg = data.msg;
            wx.showModal({
              title: "提示",
              content: msg,
              showCancel: false,
              confirmText: "重新挑战",
              // success: function (res) {
              //   if (res.confirm) {
              //     wx.navigateBack({
              //       delta: 1
              //     })
              //   }
              // }
            })
          }
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
    pivot: "",
    recoding_prompt: "按住 录音"
  },

  // recording
  start_recording: function () {
    // var ReMgr = that.recordingMgr;
    // console.log("start recording")
    this.setData({
      recoding_prompt: "松开 结束"
    })
    wx.showLoading({
      title: '录音中',
    })
    const options = {
      sampleRate: 16000,
      format: "mp3",
      frameSize: 50,
      numberOfChannels: 1
    };
    recordingMgr.start(options);
  },

  stop_recording: function () {
    // console.log("stop recording")
    this.setData({
      recoding_prompt: "按住 录音"
    })
    recordingMgr.stop();
    wx.hideLoading()
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      pivot: app.globalData.pivot
    })
  }
})