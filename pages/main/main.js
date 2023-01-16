// pages/main/main.js
//const db = wx.cloud.database();
import Notify from '../../dist/notify/notify';
const util = require('../../utils/util')
const app = getApp()
const db = wx.cloud.database({
  env: 'daytips-rr1wj'
});
Page({

  data: {
    userOpenId: "",
    intemInfoArray: [],
    itemCloudItem: [],
    // *1000代表有多少秒
    time: 1 * 1000,
    activeKey: 0,
  },

  onSearch: function (options) {
    var that = this
    var search_token = options.detail
    console.log('j', search_token)
    db.collection('userToken')
      .where({
        token: db.command.in([app.globalData.cloudID]),
        name: db.command.in([search_token]),
      })
      .get()
      .then(res => {
        console.log(res.data)
        this.setData({
          intemInfoArray: res.data
        })
      })
  },
  ontimeChange(e) {
    this.setData({
      timeData: e.detail,
    });
    Notify({
      type: 'primary',
      message: '您有物品过期了哦！',
      color: 'white',
      background: '#B0C4DE',
      duration: 10 * 1000,
    });
  },
  //获取初始OpenId和基本信息
  onLoad: function (options) {

    var that = this
    //var intemInfoArray = that.data.intemInfoArray
    db.collection('userToken')
      .where({
        token: db.command.in([app.globalData.cloudID]),
      })
      .get()
      .then(res => {
        let now = util.formatTime(new Date()).split(' ')[0].split('/')[2]
        let tem = res.data.map(element => {
          let past = parseInt(element.date2.split('/')[2])
          element.count = past - now
          return element
        });
        this.setData({
          intemInfoArray: tem,
        })
      })




  },


  //下拉刷新
  onPullDownRefresh: function () {
    // Notify({ type: 'primary', message: '通知内容' });
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
      token: db.command.in([app.globalData.cloudID]),
    })
    .get()
    .then(res => {
      let now = util.formatTime(new Date()).split(' ')[0].split('/')[2]
      let tem = res.data.map(element => {
        let past = parseInt(element.date2.split('/')[2])
        element.count = past - now
        return element
      });
      this.setData({
        intemInfoArray: tem,
      })
    })
  },

  //分类查询
  onChange(event) {
    var that = this
    var sortName = event.detail.title
    var userOpenId = this.data.userOpenId
    wx.getStorage({
      key: 'userOpenId',
      success: function (res) {
        that.setData({ //拿到缓存中的数据并渲染到页面
          userOpenId: res.data
        })
      }
    })
    console.log(sortName) //名字
    console.log(userOpenId)

    db.collection('userToken')
      .where({
        token: db.command.in([app.globalData.cloudID]),
        sort: db.command.in([sortName]),
      })
      .get()
      .then(res => {
        let now = util.formatTime(new Date()).split(' ')[0].split('/')[2]
        let tem = res.data.map(element => {
          let past = parseInt(element.date2.split('/')[2])
          element.counts = past - now
          return element
        });
        this.setData({
          intemInfoArray: tem,
        })
      })

  },
  onShow(){
    db.collection('userToken')
      .where({
        token: db.command.in([app.globalData.cloudID]),
      })
      .get()
      .then(res => {
        let now = util.formatTime(new Date()).split(' ')[0].split('/')[2]
        let tem = res.data.map(element => {
          let past = parseInt(element.date2.split('/')[2])
          element.counts = past - now
          return element
        });
        this.setData({
          intemInfoArray: tem,
        })
        console.log(this.data.intemInfoArray)
      })
  },
})