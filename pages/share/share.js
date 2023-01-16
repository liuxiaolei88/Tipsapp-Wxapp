const app = getApp()
const db = wx.cloud.database({
  env: 'daytips-rr1wj'
});

Page({

  data: {
    show: false,
    homevalue: '',
    joinvalue: '',
    joinvalue1: '',
    home_list: {},
    createshow: false,
    joinshow: false
  },
  to_list(e){
    wx.navigateTo({
      url: '../sharelist/sharelist?name='+e.currentTarget.dataset.home,
    })
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  createhome() {
    this.setData({
      show: true,
      createshow: true,
      joinshow: false
    })
  },
  joinhome() {
    this.setData({
      show: true,
      createshow: false,
      joinshow: true
    })
  },
  submit() {
    // 如果邀请加入
    if (this.data.joinshow) {
      console.log(app.globalData.cloudID)
      db.collection('homelist').where({
        homeid: this.data.joinvalue1
      }).update({
        data: {
          guest: db.command.push(
            app.globalData.cloudID
          ),
        },
        success: function (res) {
          console.log(res)
        }
      })
    }

    //如果创建
    if (this.data.createshow) {
      console.log(this.data.homevalue),
        db.collection('homelist')
        .add({
          // data 字段表示需新增的 JSON 数据
          data: {
            homeid: this.data.homevalue,
            owner: {
              id: app.globalData.cloudID,
              username: app.globalData.nickName,
            },
            guest: [],
            info:[],
          }
        })
        .then(() => {
          this.getHomeList()
        })
    }
  },
  getHomeList() {
    db.collection('homelist').where(db.command.or([{
        owner: {
          id: app.globalData.cloudID,
          username: app.globalData.nickName
        }
      },
      {
        guest: db.command.all([app.globalData.cloudID])
      }
    ])).get().then(
      res => {
        this.setData({
          home_list: res.data
        })
        console.log(res)
      },
      reason=>{
        console.log(reason)
      }
      )
  },
  //获取初始OpenId和基本信息
  onLoad: function (options) {
    console.log(app.globalData.cloudID)
    this.getHomeList()
  },

})