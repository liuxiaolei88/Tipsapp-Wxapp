// 链接数据库
const db = wx.cloud.database({
  env: 'tipsapp-4g4e3qbv29f41b1c'
});
// 链接表
const todos = db.collection('userToken');
var _sort = '';
const app = getApp();

Page({
  data: {
    show: false,
    showhome: false,
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
    arrhome: [{
      name: "选择空间"
    }],
    itemSort: "类别",
    valuehome: "清单",
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
    itemName: '', //物品名称
    identifySort: '', //识别出来的物品类别
    number: 0,
    realptotopath: '',
    // 预定义一些物品名称，目的是自动填写物品类别
    foodItem: ['蛋糕', '咖啡', '巧克力', '面包', '果冻'],
    makeUpItem: ['口红', '粉底液', '眼影'],
    medicinalItem: ['风油精', '碘酒', '酒精', '三金 桂林西瓜霜喷剂 3.5g'],
    flag: 0, //用于判断是否是更新还是添加
    allItem:[],//用于存整个list的所有，但每次只更新对呀index的物品
    itemIndex:0,//用于存储下标
    photoURL:'',
    listId:'',//用于更新列表,
    addList:''//用于记录添加的清单名称

  },

  onLoad: function (options) {
    // 在这里接一下参数
    let params = JSON.parse(options.itemObj)
    console.log(params);
    var photoList = []
    photoList.push({
      url: params.item.photourl
    })
    console.log(photoList);
    this.setData({
      flag: params.flag,
      itemSort: params.item.sort, //种类
      valuehome: params.listName,
      date1: params.item.date1,
      show1: false,
      date2: params.item.date2,
      show2: false,
      fileList: photoList, //图片url
      remark: params.item.remark, //备注
      itemName: params.item.name, //物品名称
      number: params.item.count, //数量
      itemIndex:params.itemIndex, //下标
      allItem:params.allListItem,//整个清单
      photoURL:params.item.photourl,//图片URL，不是key-value形式
      listId:params.listId//更新清单的id
    })
  },
  onShow: function () {
    this.getHomeList()
  },
  // 查询清单信息
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
    ])).get({
      success: (res) => {
        let rest = []
        for (let i of res.data) {
          rest.push({
            name: i.homeid
          })
        }
        this.setData({
          arrhome: rest
        })
      }
    })
  },
  afterRead: function (event) {
    const {
      file
    } = event.detail;
    const {
      fileList = []
    } = this.data;
    fileList.push({
      url: file.path
    });
    this.setData({
      fileList
    })

    // 照片1:对第一张照片进行主体识别
    if (fileList.length === 1) {
      console.log('第一张照片');
      // 对第一张照片进行主体识别
      wx.getFileSystemManager().readFile({
        filePath: this.data.fileList[0].url,
        // ocrFilePath: this.data.fileList[1].url,//返回传到ocr里的路径
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

        // 请求图像识别
        success: res => {
          wx.request({
            url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=24.a8587cf1fbe9d34dbe721317b65d2311.2592000.1684552128.282335-21434170",
            data: {
              image: res.data,
              image_type: "BASE64"
            },
            method: 'POST',
            dataType: "json",
            header: {
              'Content-type': 'application/x-www-form-urlencoded'
            },
            // 回调成功以后
            success: res => {
              console.log(res)
              var name = res.data.result[0].keyword
              var sort = res.data.result[0].root.split('-')[1]
              var remark = ''
              // 判断预制识别的物品在不在预制类中，以自动填写类别
              if (this.data.foodItem.indexOf(name) != -1) {
                sort = '食物',
                  remark = '要加速吃哦！'
              } else if (this.data.makeUpItem.indexOf(name) != -1) {
                sort = '化妆品护肤品',
                  remark = '要加速使用哦！'
              } else if (this.data.medicinalItem.indexOf(name) != -1) {
                sort = '药品',
                  remark = '要记得这里还有这个药物哦！'
              }

              this.setData({
                itemName: name, //物品的名称
                identifySort: sort, //模型识别的类别，还没有转换成自己的类别
                itemSort: sort,
                remark: remark,
                number: 1 // 数量填写默认=1
              })

            }
          })
        }
      })
    }
    // 照片2:对第二张照片进行OCR识别
    else {
      wx.getFileSystemManager().readFile({
        filePath: this.data.fileList[1].url,
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

        // 请求OCR识别
        success: res => {
          wx.request({
            // url:'https://api.xf-yun.com/v1/private/sf8e6aca1',
            url: "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=24.dd274e7ac70e470557632df41a591ea2.2592000.1684573066.282335-32621704",
            data: {
              image: res.data,
              image_type: "BASE64"
            },
            method: 'POST',
            dataType: "json",
            header: {
              'Content-type': 'application/x-www-form-urlencoded'
            },
            // 回调成功以后
            success: res => {
              console.log(res);
              var ocrWordList = res.data.words_result
              for (var item of ocrWordList) {
                var itemWord = item['words']
                // 判断识别的都是String，有些为undefined
                if (typeof (itemWord) === 'string') {
                  if (itemWord.indexOf('生产日期') !== -1) {
                    console.log(itemWord);
                    console.log(itemWord.split('：'));
                    var birthDate = itemWord.split('：')[1]
                    console.log(birthDate);
                  }
                  if (itemWord.indexOf('保质期') !== -1) {
                    var outDate = itemWord.split('：')[1]
                    console.log(outDate);
                    // 判断是否是月份形式
                    if (outDate.indexOf('个月') !== -1) {
                      var monthNum = parseInt(outDate.split('个月'))
                      console.log(monthNum);
                      var year = monthNum / 12
                      console.log(year);
                      var birthDaterYear = parseInt(birthDate.split('/')[0])
                      var outDateYear = birthDaterYear + year
                      console.log(outDateYear);
                      var outDateMonth = parseInt(birthDate.split('/')[1])
                      console.log(outDateMonth);
                      var outDateDay = parseInt(birthDate.split('/')[2])
                      console.log(outDateDay);
                      birthDate = birthDaterYear + '/' + outDateMonth + '/' + outDateDay
                      var outDateFin = outDateYear + '/' + outDateMonth + '/' + outDateDay
                      console.log(outDateFin);
                    } else {
                      console.log('');
                    }
                  }
                }

              }
              this.setData({
                date1: birthDate,
                date2: outDateFin
              })

            }
          })
        }
      })
    }


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
      remark: event.detail
    })
  },
  //获取物品数量信息
  onChangeCount(event) {
    var that = this
    this.setData({
      number: event.detail
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
    _sort = res.detail.name
    console.log(typeof (res.detail.name))
    this.setData({
      itemSort: res.detail.name
    })


  },
  onSelecthome(res) {
    this.setData({
      addList:res.detail.name,
      valuehome: res.detail.name
    })
  },

  // 提交
  onClick() {
    // flag=1是更新列表
    if (this.data.flag === 1) {
      var allList = this.data.allItem
      var index = this.data.itemIndex
      console.log('输出更新前的');
      console.log(allList);
      allList[index].count=this.data.number
      allList[index].date1=this.data.date1
      allList[index].date2=this.data.date2
      allList[index].name=this.data.itemName
      allList[index].remark=this.data.remark
      allList[index].sort=_sort
      allList[index].photourl=this.data.photoURL
      allList[index].token=app.globalData.cloudID
      console.log('输出更新后的');
      console.log(allList);
      

      db.collection('homelist').doc(this.data.listId).update({
         data: {
           info: db.command.set({
             info: allList
           })
       },
         success: function (res) {
           console.log('更新成功')
         }
       })
    }
    // flag=0是直接加入列表，默认=0
    else {
      var that = this
      wx.cloud.uploadFile({
        cloudPath: "img/" + new Date().getTime() + '.png',
        filePath: this.data.fileList[0].url, // 小程序临时文件路径
      }).then(res => {
        console.log('触发回掉')
        console.log(res)
        // get resource ID
  
        // 提交的数据
        this.clouddata = {
          count: this.data.number,
          date1: this.data.date1,
          date2: this.data.date2,
          name: this.data.itemName,
          remark: this.data.remark,
          sort: _sort,
          photourl: res.fileID,
          token: app.globalData.cloudID
        }
        // 这里需要判断是更新还是添加
        // flag=1的时候是更新
       
        todos.add({
          data: this.clouddata,
          // success: () => console.log("成功了"),
          error: res => console.log(res)
        })
        var infoo = []

        // 放到对应清单
        db.collection('homelist').where({
            homeid: this.data.addList
          })
          .get().then((res) => {
            infoo = res.data[0]
            console.log('这里是info');
            console.log(infoo);
            infoo.info.info.push(this.clouddata)
            console.log(infoo)
          })
          .then(() => {
            db.collection('homelist').doc(infoo._id).update({
              data: {
                info: infoo.info
              }
            }).then((res) => {
              console.log(res)
            })
          })
  
      }).catch(error => {
        // handle error
        console.log('出错')
        console.log(error)
        console.log(cloudPath)
        console.log(filePath)
      })
    }
    // 提交以后更新，编辑界面变白
    // this.setData({
    //   itemSort: "类别",
    //   valuehome: "选择空间",
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
    //   itemName: '',
    //   number: 0,
    // })
    wx.showToast({
      title: '提交啦!!',
    })
   
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