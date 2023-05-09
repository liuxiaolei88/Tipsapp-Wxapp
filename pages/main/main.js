// pages/main/main.js
//const db = wx.cloud.database();
import Notify from '../../dist/notify/notify';
const util = require('../../utils/util')
const app = getApp()
const db = wx.cloud.database({
  env: 'tipsapp-4g4e3qbv29f41b1c'
});

Page({
  data: {
    userOpenId: "",
    intemInfoArray: [],
    itemCloudItem: [],
    nickName:'',
    // *1000代表有多少秒
    time: 1 * 1000,
    activeKey: 0,
  },

  // 搜索框
  onSearch: function (options) {
    var that = this
    var search_token = options.detail
    db.collection('itemList')
      .where({
        nickName:this.data.nickName,
        itemName:search_token 
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
    var nickName = '' //用于记录缓存里的用户名称
    var cloudId = ''

    wx.getStorage({
      key: 'nickName',
      success: res => {
        this.setData({
          nickName:res.data
        })
       db.collection('itemList').where({
            nickName:res.data
          }).get()
          .then(res =>{
            this.setData({
              intemInfoArray: res.data
            })
          })
      }
    })
  // },



    // wx.getStorage({
    //     key: 'cloudId',
    //     success: res => {
    //       cloudId = res.data
    //       console.log(res.data);
    //       // db.collection('itemList').where({
    //       //   cloudId:cloudId
    //       // }).get({
    //       //   success:function(res){
    //       //     console.log('我是item');
    //       //     console.log(res);
    //       //   }
    //       // })
    //     }
    //   }),
    
    
      // // 先查询用户拥有的list
      // db.collection('homelist').where(db.command.or([{
      //     owner: {
      //       username: app.globalData.nickName
      //     }
      //   },
      //   {
      //     guest: {
      //       name: app.globalData.nickName
      //     }
      //   }
      // ])).get({
      //   success: (res) => {
      //     console.log(res)
      //     let item = []
      //     for (let i of res.data) {
      //       db.collection('itemList').where({
      //         listId: i.homeid
      //       }).get({
      //         success: function (res) {
      //           console.log(res)
      //           for(let i of res.data){
      //             item.push(i)
      //           }
      //           console.log('item');
      //           console.log(item)
      //           this.setData({
      //             intemInfoArray:item
      //           })
      //           // this.setData({
      //           //   intemInfoArray:item
      //           // })
      //           // for(var i in res.data){
      //           //   console.log(i)
      //           //   // item.push(res.data[i]) 
      //           // }
      //           // console.log('item');
      //           // console.log(item);
      //           // this.data({
      //           //   intemInfoArray:item
      //           // })
      //         }
      //       })
      //     }
          
      //   }
      // })



    // db.collection('homelist')
    // .where({}).get().then(res=>{
    //   var allListItem = res.data
    //   console.log(allListItem);
    //   var showAllItem = []
    //   for(var index in allListItem){
    //     var eachItem = allListItem[index]
    //     // 判断是否为该清单的拥有者
    //     if(eachItem.owner.username===nickName){
    //       for(var idx in eachItem.info.info){
    //         showAllItem.push(eachItem.info.info[idx])
    //       }
    //       continue
    //     }

    //     var isGuestFlag = 0 //设置一个flag，遍历所有清单的guest
    //     var eachItemGuest = eachItem.guest

    //     // 判断是否为该清单的加入者
    //     for(var idxx in eachItemGuest){
    //       if(eachItemGuest[idxx].name===nickName){
    //           isGuestFlag=1
    //       }
    //     }
    //     if(isGuestFlag=1){
    //       for(var idx in eachItem.info.info){
    //         showAllItem.push(eachItem.info.info[idx])
    //       }
    //     }


    //   }
    //   console.log('这是要展示的');
    //   console.log(showAllItem);
    //   let now = util.formatTime(new Date()).split(' ')[0].split('/')[2]
    //   let tem =showAllItem.map(element => {
    //       let past = parseInt(element.date2.split('/')[2])
    //       element.count = past - now
    //       return element
    //     });
    //     console.log('tem');
    //     console.log(tem);
    //     this.setData({
    //       intemInfoArray: tem,
    //     })


    // })

    // db.collection('userToken')


    //   .where({
    //     token: db.command.in([app.globalData.cloudID]),
    //   })
    //   .get()
    //   .then(res => {
    //     let now = util.formatTime(new Date()).split(' ')[0].split('/')[2]
    //     let tem = res.data.map(element => {
    //       let past = parseInt(element.date2.split('/')[2])
    //       element.count = past - now
    //       return element
    //     });
    //     console.log('tem');
    //     console.log(tem);
    //     this.setData({
    //       intemInfoArray: tem,
    //     })
    //   })




  },


  //下拉刷新
  onPullDownRefresh: function () {
    wx.getStorage({
      key: 'nickName',
      success: res => {
       db.collection('itemList').where({
            nickName:res.data
          }).get()
          .then(res =>{
            this.setData({
              intemInfoArray: res.data
            })
          })
      }
    })
    // Notify({ type: 'primary', message: '通知内容' });
    // var that = this
    // db.collection('userToken')
    //   .where({
    //     token: db.command.in([app.globalData.cloudID]),
    //   })
    //   .get()
    //   .then(res => {
    //     let now = util.formatTime(new Date()).split(' ')[0].split('/')[2]
    //     let tem = res.data.map(element => {
    //       let past = parseInt(element.date2.split('/')[2])
    //       element.count = past - now
    //       return element
    //     });
    //     this.setData({
    //       intemInfoArray: tem,
    //     })
    //   })
  },

  //分类查询
  onChange(event) {
    var that = this
    var sortName = event.detail.title
    // var userOpenId = this.data.userOpenId
    // wx.getStorage({
    //   key: 'userOpenId',
    //   success: function (res) {
    //     that.setData({ //拿到缓存中的数据并渲染到页面
    //       userOpenId: res.data
    //     })
    //   }
    // })
    // wx.getStorage({
    //   key: 'nickName',
    //   success: res => {
    //    this.setData({
    //      nickName:res.data
    //    })
    //   }
    // })

    db.collection('itemList')
      .where({
        nickName:this.data.nickName,
        itemSort:sortName,
      })
      .get()
      .then(res => {
        console.log(res);
        this.setData({
          intemInfoArray: res.data,
        })
      })

  },
  onShow(){
    var that = this
    var nickName = '' //用于记录缓存里的用户名称
    var cloudId = ''

    wx.getStorage({
      key: 'nickName',
      success: res => {
       db.collection('itemList').where({
            nickName:res.data
          }).get({
            success:function(res){
              console.log('itemList');
              console.log(res.data);
              this.setData({
                intemInfoArray: res.data
              })
            }
          })
      }
    })
  },

   // 删除列表物品
   deleteMyItem(e) {
    var that = this
    var index = e.target.dataset.idx
    console.log(index);
    var itemList = this.data.intemInfoArray
    var id = itemList[index]._id
    this.data.intemInfoArray.splice(index, 1)
    var newItemList = this.data.intemInfoArray
    db.collection('itemList').where({
      _id:id
    }).remove({
      success:res=> {
        console.log(res.data)
        this.setData({
          intemInfoArray: newItemList
        })
      }
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
  // onShow(){
  //   var that = this
  //   var nickName = '' //用于记录缓存里的用户名称
  //   wx.getStorage({
  //       key: 'nickName',
  //       success: function (res) {
  //         nickName = res.data
  //       }
  //     }),
  //     // 先查询用户拥有的list
  //     db.collection('homelist').where(db.command.or([{
  //         owner: {
  //           username: app.globalData.nickName
  //         }
  //       },
  //       {
  //         guest: {
  //           name: app.globalData.nickName
  //         }
  //       }
  //     ])).get({
  //       success: (res) => {
  //         console.log(res)
  //         let item = []
  //         for (let i of res.data) {
  //           db.collection('itemList').where({
  //             listId: i.homeid
  //           }).get({
  //             success: function (res) {
  //               console.log(res)
  //               for(let i of res.data){
  //                 item.push(i)
  //               }
  //               // for(var i in res.data){
  //               //   console.log(i)
  //               //   // item.push(res.data[i]) 
  //               // }
  //               // console.log('item');
  //               // console.log(item);
  //               // this.data({
  //               //   intemInfoArray:item
  //               // })
  //             }
  //           })
  //         }
  //         console.log('item');
  //         console.log(item)
  //         this.setData({
  //           intemInfoArray:item
  //         })
  //       }
  //     })
  // }
  // onShow() {
  //   db.collection('userToken')
  //     .where({
  //       token: db.command.in([app.globalData.cloudID]),
  //     })
  //     .get()
  //     .then(res => {
  //       let now = util.formatTime(new Date()).split(' ')[0].split('/')[2]
  //       let tem = res.data.map(element => {
  //         let past = parseInt(element.date2.split('/')[2])
  //         element.counts = past - now
  //         return element
  //       });
  //       this.setData({
  //         intemInfoArray: tem,
  //       })
  //       // console.log(this.data.intemInfoArray)
  //     })
  // },
})