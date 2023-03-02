const db = wx.cloud.database({
  env: 'tipsapp-4g4e3qbv29f41b1c'
});
const todos = db.collection('userToken');
var _sort='';
const app = getApp();
Page({
  data: {
    show: false,
    showhome:false,
    arr: [{
        name: "食品"
      },
      {
        name: "药品"
      },
      {
        name: "化妆品护肤品"
      }
    ],
    arrhome:[{
      name: "选择空间"
    }],
    value: "类别",
    valuehome:"清单",
    date1: '',
    show1: false,
    date2: '',
    show2: false,
    date3: '',
    show3: false,
    date4: '',
    show4: false,
    minDate: new Date(2019, 0, 1).getTime(),
    maxDate: new Date(2050, 0, 31).getTime(),
    fileList: [],
    name: '',
    remark: '',
    count: '',
    username: '',
    number:0,
    realptotopath:''
  },
  onLoad: function (options) {
  },
  onShow:function(){
    this.getHomeList()
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
    ])).get({
      success: (res) => {
        let rest = []
        for(let i of res.data){
          rest.push({
            name:i.homeid
          })
        }
        this.setData({
          arrhome:rest
        })
      }
    })
  },
  afterRead: function (event) {
    const {file} = event.detail;
    const {fileList = []} = this.data;
    fileList.push({url: file.path});
    this.setData({fileList})


    wx.getFileSystemManager().readFile({
      filePath: this.data.fileList[0].url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      complete: (res) => {
        console.log(res)
        console.log('comp')
      },
      success: (res) => {
        console.log(res.data)
      },
      fail: (err) => {
        console.log(err)
      },
      success: res => {
        wx.request({
          url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=24.2f63c2c2a4286d7c14a8d8bc988462a1.2592000.1680336750.282335-21434170",
          data: {
            image: res.data,
            image_type: "BASE64"
          },
          method: 'POST',
          dataType: "json",
          header: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            console.log(res)
            this.setData({
              username: res.data.result[0].keyword
            })

          }
        })
      }
    })
  },

  formSubmit: function (data) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

  },

  //获取物品名称信息
  onChangeName(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);


  },
  //获取物品备注信息

  onChangeRemark(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({
      remark:event.detail
    })
  },
  //获取物品数量信息
  onChangeCount(event) {
    var that = this
    this.setData({
      number:event.detail
    })
  },

  onTap() {
    this.setData({
      show: true
    })

  },
  onTaphome() {
    this.setData({
      showhome: true
    })

  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onClosehome() {
    this.setData({
      showhome: false
    })
  },
  onSelect(res) {
    _sort=res.detail.name
    // console.log(res.detail.name)
    this.setData({
      value: res.detail.name
    })


  },
  onSelecthome(res) {
    this.setData({
      valuehome: res.detail.name
    })
  },
  onClick() {
    var that = this
    console.log('触发click事件')
    wx.cloud.uploadFile({
      // cloudPath:'example.png',
      cloudPath: "img/" + new Date().getTime()+'.png',
      // filePath:'http://tmp/6xPefYkamSFA281c52ee03d14b17596ec13131b0d3a5.png'
      filePath: this.data.fileList[0].url, // 小程序临时文件路径
         
    }).then(res => {
      console.log('触发回掉')
      console.log(res)
      // get resource ID

      this.clouddata = {
        count: this.data.number,
        data1: this.data.data1,
        // data2: this.data.data2,
        name: this.data.username,
        remark: this.data.remark,
        sort: _sort,
        photourl: res.fileID,
        date1:this.data.date1,
        date2:this.data.date2,
        token:app.globalData.cloudID
      } 
      todos.add({
        data:this.clouddata,
        // success: () => console.log("成功了"),
        error: res => console.log(res)
      })
      var infoo=[]
      db.collection('homelist').where({
        homeid: this.data.valuehome
      })
      .get().then((res)=>{
        infoo = res.data[0]
        infoo.info.push(this.clouddata)
        console.log(infoo)
      })
      .then(()=>{
        db.collection('homelist').doc(infoo._id).update({
          data:{
            info:infoo.info
          }
        }).then((res)=>{
          console.log(res)
        })
      })
      
      this.setData({
        value: "类别",
        valuehome:"选择空间",
        date1: '',
        show1: false,
        date2: '',
        show2: false,
        date3: '',
        show3: false,
        date4: '',
        show4: false,
        minDate: new Date(2019, 0, 1).getTime(),
        maxDate: new Date(2050, 0, 31).getTime(),
        fileList: [],
        name: '',
        remark: '',
        count: '',
        username: '',
        number:0,
      })
      wx.showToast({
        title: '提交啦!!',
      })
  

    }).catch(error => {
      // handle error
      console.log('出错')
      console.log(error)
      console.log(cloudPath)
      console.log(filePath)
    })
    // this.clouddata = {
    //   count: this.data.number,
    //   data1: this.data.data1,
    //   // data2: this.data.data2,
    //   name: this.data.username,
    //   remark: this.data.remark,
    //   sort: _sort,
    //   photourl: this.data.fileList[0].url,
    //   date1:this.data.date1,
    //   date2:this.data.date2,
    //   token:app.globalData.cloudID
    // }
    // console.log(this.clouddata)

    // todos.add({
    //   data:this.clouddata,
    //   // success: () => console.log("成功了"),
    //   error: res => console.log(res)
    // })
    // var infoo=[]
    // db.collection('homelist').where({
    //   homeid: this.data.valuehome
    // })
    // .get().then((res)=>{
    //   infoo = res.data[0]
    //   infoo.info.push(this.clouddata)
    //   console.log(infoo)
    // })
    // .then(()=>{
    //   db.collection('homelist').doc(infoo._id).update({
    //     data:{
    //       info:infoo.info
    //     }
    //   }).then((res)=>{
    //     console.log(res)
    //   })
    // })
    
    // this.setData({
    //   value: "类别",
    //   valuehome:"选择空间",
    //   date1: '',
    //   show1: false,
    //   date2: '',
    //   show2: false,
    //   date3: '',
    //   show3: false,
    //   date4: '',
    //   show4: false,
    //   minDate: new Date(2019, 0, 1).getTime(),
    //   maxDate: new Date(2050, 0, 31).getTime(),
    //   fileList: [],
    //   name: '',
    //   remark: '',
    //   count: '',
    //   username: '',
    //   number:0,
    // })
    // wx.showToast({
    //   title: '提交啦！',
    // })

  },

  onTap1() {
    this.setData({
      show1: true
    })

  },

  onDisplay1() {
    this.setData({
      show1: true
    });
  },
  onClose1() {
    this.setData({
      show1: false
    });
  },
  formatDate1(date1) {
    date1 = new Date(date1);
    return `${date1.getYear() +1900}/${date1.getMonth() + 1}/${date1.getDate()}`;

  },
  onConfirm1(res) {
    //console.log(res.detail.date1)
    this.setData({
      show1: false,
      date1: this.formatDate1(res.detail),
    });
    console.log(res.detail)
  },


  onTap2() {
    this.setData({
      show2: true
    })

  },

  onDisplay2() {
    this.setData({
      show2: true
    });
  },
  onClose2() {
    this.setData({
      show2: false
    });
  },
  formatDate2(date2) {
    date2 = new Date(date2);
    return `${date2.getYear() +1900}/${date2.getMonth() + 1}/${date2.getDate()}`;
  },
  onConfirm2(res) {
    console.log(res.detail.date2)
    this.setData({
      show2: false,
      date2: this.formatDate1(res.detail),
    });
  },



  onTap3() {
    this.setData({
      show3: true
    })

  },

  onDisplay3() {
    this.setData({
      show3: true
    });
  },
  onClose3() {
    this.setData({
      show3: false
    });
  },
  formatDate3(date3) {
    date3 = new Date(date3);
    return `${date3.getYear() +1900}/${date3.getMonth() + 1}/${date3.getDate()}`;
  },
  onConfirm3(res) {
    console.log(res.detail.date3)
    this.setData({
      show3: false,
      date3: this.formatDate3(res.detail),
    });
  },

  onTap4() {
    this.setData({
      show4: true
    })

  },

  onDisplay4() {
    this.setData({
      show4: true
    });
  },
  onClose4() {
    this.setData({
      show4: false
    });
  },
  formatDate4(date4) {
    date4 = new Date(date4);
    return `${date4.getYear() +1900}/${date4.getMonth() + 1}/${date4.getDate()}`;
  },
  onConfirm4(res) {
    console.log(res.detail.date4)
    this.setData({
      show4: false,
      date4: this.formatDate4(res.detail),
    });
  },
  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    });
  }

});