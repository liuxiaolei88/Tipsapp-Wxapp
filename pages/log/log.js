<<<<<<< HEAD
//index.js
//获取应用实例
=======
<<<<<<< HEAD
//index.js
//获取应用实例
=======
// index.js
// 获取应用实例
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
const app = getApp()

Page({
  data: {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
    motto: '欢迎来到云保质期管家',
    userInfo: {},
    itemList:'',//物品清单
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
<<<<<<< HEAD
=======
=======
    motto: 'Daytips',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      
  
      




    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
   // var that = this
    //var itemList = this.data.itemList
    wx.cloud.callFunction({
      name: "openId"
    }).then( res =>{
       console.log(res.result.openid)
      wx.setStorage({//存储到本地
        key: "userOpenId",
        data: res.result.openid
      })
      this.setData({
        itemList: res.result.openid
       })
      },
      
      
    ) ,

   
<<<<<<< HEAD
=======
=======
  onLoad() {
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
      success: (res) => {
        console.log(res)
        console.log('kS')
        wx.reLaunch({
          url: '/pages/main/main' 
        })
        console.log('kS')
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
          
        })
       
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    app.globalData.userInfo=e.detail.cloudID
    app.globalData.avatarUrl=e.detail.userInfo.avatarUrl
    app.globalData.nickName=e.detail.userInfo.nickName

    // console.log(app.globalData.userInfo)
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
 
    setTimeout(function () {


      wx.reLaunch({
        url: '/pages/main/main?openid ='  ,
<<<<<<< HEAD
=======
=======
    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/main/main' ,
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
      })
    }, 3000);
  }
})
