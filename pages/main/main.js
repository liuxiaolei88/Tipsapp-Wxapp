// pages/main/main.js
//const db = wx.cloud.database();

const db = wx.cloud.database({ env: 'daytips-rr1wj' });
Page({

  data: {

  },

  onPullDownRefresh: function () {
    var that = this;
    db.collection('userToken')
      .where({
        token: db.command.in(["111aaaa"])
      })
      .get()
      .then(console.log)
  },

  onSearch() {
    //调用云函数
    wx.cloud.callFunction({
      name: "find"
    }).then(console.log)
  },

  
  //分类查询
  onChange(event) {
    var that = this
    var sortName = event.detail.title
    console.log(sortName)//名字
     db.collection('userToken')
        .where({
          token: db.command.in(["111aaaa"]),
          sort: db.command.in([sortName])
        })
        .get()
        .then(console.log)
  
  },

})