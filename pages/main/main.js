// pages/main/main.js
//const db = wx.cloud.database();
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
const app = getApp()
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
const db = wx.cloud.database({ env: 'daytips-rr1wj' });
Page({

  data: {
    userOpenId: "",
    intemInfoArray: [],
    itemCloudItem: [],
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    time: 30 * 60 * 60 * 1000
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
  },



//获取初始OpenId和基本信息
  onLoad: function (options) {
   var that = this
    //var intemInfoArray = that.data.intemInfoArray
    db.collection('userToken')
      .where({
<<<<<<< HEAD
        token: db.command.in(["oyjR95bgAwWj71RBtH1fSLurYqBQ"]),
=======
<<<<<<< HEAD
        token: db.command.in(["oyjR95bgAwWj71RBtH1fSLurYqBQ"]),
=======
        token: db.command.in([app.globalData.cloudID]),
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
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
<<<<<<< HEAD
        token: db.command.in(["oyjR95bgAwWj71RBtH1fSLurYqBQ"]),
=======
<<<<<<< HEAD
        token: db.command.in(["oyjR95bgAwWj71RBtH1fSLurYqBQ"]),
=======
        token: db.command.in([app.globalData.cloudID]),
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
      })
      .get()
      .then(res => {
        console.log(res.data)
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        wx.cloud.getTempFileURL({
  fileList: [{
    fileID: 'a7xzcb',
    maxAge: 60 * 60, // one hour
  }]
}).then(res => {
  // get temp file URL
  console.log(res.fileList)
}).catch(error => {
  // handle error
})
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
        this.setData({
          intemInfoArray: res.data
        })
      })
  },




  //分类查询
  onChange(event) {
    var that = this
    var sortName = event.detail.title
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
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
<<<<<<< HEAD
=======
=======
    var userOpenId = this.data.userOpenId
    wx.getStorage({
      key: 'userOpenId',
      success: function (res) {
        that.setData({//拿到缓存中的数据并渲染到页面
          userOpenId: res.data
        })
      }
    })
    console.log(sortName)//名字
   console.log(userOpenId)
    db.collection('userToken')
      .where({
        token: db.command.in([app.globalData.cloudID]),
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
        sort: db.command.in([sortName]),
      })
      .get()
      .then(res => {
        console.log(res.data)
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
          
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
        this.setData({
          intemInfoArray: res.data
        })
      })

  },

})