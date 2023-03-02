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
    },

    ontimeChange(e) {

        this.setData({
            timeData: e.detail,

        });
    },
    //获取初始OpenId和基本信息
    onLoad: function (options) {

        var that = this
        //var intemInfoArray = that.data.intemInfoArray
        db.collection('homelist')
            .where({
                homeid: options.name,
            }).get({
                success: (res) => {
                    // console.log(res.data[0].info)
                    let temp = res.data[0].info
                    let now = util.formatTime(new Date()).split(' ')[0].split('/')[2]
                    let tem = res.data[0].info.map(element => {
                        let past = parseInt(element.date2.split('/')[2])
                        element.counts = past - now
                        return element
                    });
                    console.log(tem);
                    this.setData({
                        intemInfoArray: tem
                    })
                }
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


})