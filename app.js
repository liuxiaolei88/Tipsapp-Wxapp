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
<<<<<<< HEAD
    userInfo: null
=======
<<<<<<< HEAD
    userInfo: null
=======
    userInfo: null,
    cloudID:'',
    avatarUrl:'',
    nickName:''
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
  }
})