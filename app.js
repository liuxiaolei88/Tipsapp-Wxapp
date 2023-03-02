//app.js
App({
  onLaunch: function () {
    // 云开发初始化
    wx.cloud.init({
      env: "tipsapp-4g4e3qbv29f41b1c",
      traceUser: true
    })
  },
  globalData: {
    homelist:[],
    userInfo: null,
    cloudID:'',
    avatarUrl:'',
    nickName:''
  }
})