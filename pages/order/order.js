// pages/order/order.js
// 获取录音管理器
const recordingMgr = wx.getRecorderManager()


// 发送录音文件到 server
// src 是临时的录音文件
function sendAudioData(src) {
  var file_options = {
    url: "http://127.0.0.1:8000/ebrose/asr/",
    filePath: src,
    name: "file",
    success: function display_info(result) {
      console.log("get result", result)
      var data = JSON.parse(result.data);
      var msg = "";
      if ("result" in data){
        msg = data.result;
      };
      var cur_page = getCurrentPages()[0];
      cur_page.setData({msg: msg})
    },
    fail: function display_error(error) {
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
  playInnerAudio(res.tempFilePath);
})


Page({

  /**
   * 页面的初始数据
   */
  data: {
    causeText: "花",
  },
  // recording
  start_recording: function(){
    // var ReMgr = that.recordingMgr;
    console.log("start recording")
    const options = {
      sampleRate: 16000,
      format: "mp3",
    };
    recordingMgr.start(options);
  },

stop_recording: function(){
  console.log("stop recording")
  recordingMgr.stop();
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})