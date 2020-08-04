//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎来到云保质期管家',
    userInfo: {},
    itemList:'',//物品清单
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
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

   
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
 
    setTimeout(function () {


      wx.reLaunch({
        url: '/pages/main/main?openid ='  ,
      })
    }, 3000);
  }
})
