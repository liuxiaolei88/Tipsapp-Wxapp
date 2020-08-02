//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'test-daytips'
    })
   // 云函数端
  },
  globalData: {
    userInfo: null
  }
})