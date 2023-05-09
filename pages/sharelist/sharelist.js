const app = getApp()
const util = require('../../utils/util.js')
const db = wx.cloud.database({
  env: 'tipsapp-4g4e3qbv29f41b1c'
});

Page({
  data: {
    userOpenId: "",
    intemInfoArray: [],
    itemCloudItem: [],
    // *1000代表有多少秒
    time: 3 * 1000,
    activeKey: 0,
    itemOwer: '',//用于记录该清单的创建者
    itemAdd: [],//用于记录该清单的加入者
    itemId:'',//用于记录共享清单的Id
    listName:''//用于记录清单名称

  },

  ontimeChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },

  //获取初始OpenId和基本信息
  onLoad: function (options) {
    var that = this
    db.collection('itemList').where({
      listId:this.data.listId
    }).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      this.setData({
        intemInfoArray: res.data
      })
    })

    // db.collection('homelist')
    //   .where({
    //     homeid: options.name,
    //   }).get({
    //     success: (res) => {
    //       console.log(res.data[0]);
    //       //记录拥有者
    //       var itemOwer = res.data[0].owner.username
    //       var itemAdd = res.data[0].guest
    //       // 清单编号
    //       var itemId = res.data[0]._id
    //       // 清单名称
    //       var listName = res.data[0].homeid

    //       let now = util.formatTime(new Date()).split(' ')[0].split('/')[2]
    //       let tem = res.data[0].info.info.map(element => {
    //         let past = parseInt(element.date2.split('/')[2])
    //         element.counts = past - now
    //         return element
    //       });
    //       console.log(tem);
    //       this.setData({
    //         intemInfoArray: tem,
    //         itemOwer: itemOwer,
    //         itemAdd: itemAdd,
    //         itemId:itemId,
    //         listName:listName
    //       })
    //     }
    //   })



  },


  //下拉刷新
  onPullDownRefresh: function () {
    var that = this
    db.collection('userToken')
      .where({
        token: db.command.in([app.globalData.cloudID]),
      })
      .get()
      .then(res => {
        console.log(res.data)
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
        this.setData({
          intemInfoArray: res.data
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
    //  Notify({ type: 'primary', message: '通知内容' });
    db.collection('userToken')
      .where({
        token: db.command.in([app.globalData.cloudID]),
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

  // 查看谁加入了这个清单,带参跳转
  lookPeopleList() {
    var that = this
    console.log(that.data.itemOwer);
    wx.navigateTo({
      url: '../itemUserList/itemUserList?itemObj=' + JSON.stringify({
        'owe': that.data.itemOwer,
        'add': that.data.itemAdd,
        'itemId':that.data.itemId
      }),
    })
  },

  // 删除
  deleteMyItem(e) {
    var that = this
    var index = e.target.dataset.idx
    this.data.intemInfoArray.splice(index, 1)
    var newInfo = this.data.intemInfoArray
    var itemId = this.data.itemId
    console.log(itemId);
    console.log(this.data.intemInfoArray);
    db.collection('homelist').doc(itemId).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        info: db.command.set(newInfo),
      },
      success: function (res) {
        console.log('删除成功！');
      }
    })
    //  更新视图
    this.setData({
      intemInfoArray: that.data.intemInfoArray
    })

  },

  //编辑（带参跳转到添加页面）
  editMyItem(e){
    var that = this
    var index = e.target.dataset.idx
    // 获取该item的信息
    var Info = this.data.intemInfoArray
    var listName = this.data.listName
    var thisItemInfo = Info[index]
    console.log('输出本次点击的物品信息');
    console.log(thisItemInfo);
    wx.redirectTo({
      url: '../add/add?itemObj=' + JSON.stringify({
        'item': thisItemInfo,
        'listName':listName,
        'flag':1 ,//用于在add页面判断是否是更新，还是重新录入,
        'listId':this.data.itemId,//用于更新的时候确定更新哪一个列表
        'itemIndex':index,//用于更新的时候确定更新哪一条信息，
        'allListItem':Info//用于更新数组（这个实现方式并不好，但是目前没有想到更好的办法）
      }),
    })

  }
})