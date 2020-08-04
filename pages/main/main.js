// pages/main/main.js
//const db = wx.cloud.database();

const db = wx.cloud.database({ env: 'daytips-rr1wj' });
Page({

  data: {
    userOpenId: "",
    intemInfoArray: [],
    itemCloudItem: [],
  },



//获取初始OpenId和基本信息
  onLoad: function (options) {
   var that = this
    //var intemInfoArray = that.data.intemInfoArray
    db.collection('userToken')
      .where({
        token: db.command.in(["oyjR95bgAwWj71RBtH1fSLurYqBQ"]),
 })
      .get()
      .then(res =>{
        console.log(res.data)
        this.setData({
          intemInfoArray:res.data
       })
      })
      
       


  },


//下拉刷新
  onPullDownRefresh: function () {
    var that = this
    // var userOpenId = this.data.userOpenId
    // wx.getStorage({
    //   key: 'userOpenId',
    //   success: function (res) {
    //     that.setData({//拿到缓存中的数据并渲染到页面
    //       userOpenId: res.data
    //     })
    //   }
    // })
    // console.log(userOpenId)
    db.collection('userToken')
      .where({
        token: db.command.in(["oyjR95bgAwWj71RBtH1fSLurYqBQ"]),
      })
      .get()
      .then(res => {
        console.log(res.data)
        this.setData({
          intemInfoArray: res.data
        })
      })
  },




  //分类查询
  onChange(event) {
    var that = this
    var sortName = event.detail.title
    // var userOpenId = this.data.userOpenId
    // wx.getStorage({
    //   key: 'userOpenId',
    //   success: function (res) {
    //     that.setData({//拿到缓存中的数据并渲染到页面
    //       userOpenId: res.data
    //     })
    //   }
    // })
    // console.log(sortName)//名字
  //  console.log(userOpenId)
    db.collection('userToken')
      .where({
        token: db.command.in(["oyjR95bgAwWj71RBtH1fSLurYqBQ"]),
        sort: db.command.in([sortName]),
      })
      .get()
      .then(res => {
        console.log(res.data)
        this.setData({
          intemInfoArray: res.data
        })
      })

  },

})