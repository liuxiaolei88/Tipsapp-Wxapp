const app = getApp()
const db = wx.cloud.database({
  env: 'tipsapp-4g4e3qbv29f41b1c'
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

  // 加入分组
  submit() {
    if (this.data.joinshow) {
      console.log(app.globalData.cloudID)
      db.collection('homelist').where({
        homeid: this.data.joinvalue1
      }).update({
        data: {
          guest: db.command.push(
          {
            aut:'读写',
            name:app.globalData.nickName
          }
          ),
        },
        success: function (res) {
          console.log("成功加入分组")
        }
      })
    }

    //创建分组
    if (this.data.createshow) {
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
            info:{info:[]},
          }
        })
        .then(() => {
          this.getHomeList()
        })
    }
  },
  // 获取全部清单
  getHomeList() {
    db.collection('homelist').where(db.command.or([{
        owner: {
          username: app.globalData.nickName
        }
      },
      {
        guest: {
            name:app.globalData.nickName
        }
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
    this.getHomeList()
  },

})