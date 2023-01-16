//app.js
App({
  onLaunch: function () {
    // 云开发初始化
    wx.cloud.init({
      env: "daytips-rr1wj",
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