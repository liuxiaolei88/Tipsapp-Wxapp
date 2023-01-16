// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    motto: 'Welcomed to Date Minder ！',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    wx.cloud.callFunction({
      name: 'openId',
      complete: res => {
        console.log('callFunction test result: ', res)
        app.globalData.cloudID=res.result.openid
      }
    })
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (e) => {
        console.log(e)
        app.globalData.userInfo=e.cloudID
        app.globalData.avatarUrl=e.userInfo.avatarUrl
        app.globalData.nickName=e.userInfo.nickName
        // console.log(app.globalData.userInfo)
        this.setData({
          userInfo: e.userInfo,
          hasUserInfo: true
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/main/main' ,
          })
        }, 3000);
      }
    })
  },
})
