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
    allItem: [], //用于存整个list的所有，但每次只更新对呀index的物品
    itemIndex: 0, //用于存储下标
    photoURL: '',
    listId: '', //用于更新列表,
    addList: '' ,//用于记录添加的清单名称
    photoUrlList:[],//用来存储上传以后变成永久链接的图片url
    nickName:'',
    itemId:''
  },

  onLoad: function (options) {
    wx.getStorage({
      key: 'nickName',
      success: res => {
        this.setData({
          nickName:res.data
        })
      }
    })
    // 在这里接一下参数
    let params = JSON.parse(options.itemObj)
    console.log(params);
    // var photoList = []
    // photoList.push({
    //   url: params.item.photourl
    // })
    // console.log(photoList);
   
    this.setData({
      flag: params.flag,
      itemSort: params.item.itemSort, //种类
      valuehome: params.listId,
      date1: params.item.startDate,
      show1: false,
      date2: params.item.endDate,
      show2: false,
      fileList: params.item.photoUrlList, //图片url
      remark: params.item.itemRemark, //备注
      itemName: params.item.itemName, //物品名称
      number: params.item.itemCount, //数量
      itemIndex: params.itemIndex, //下标
      allItem: params.allListItem, //整个清单
      photoURL: params.item.photourl, //图片URL，不是key-value形式
      listId: params.listId ,//更新清单的id
      photoUrlList:[],//用来存储上传以后变成永久链接的图片url
      itemId:params.item._id//用来标识itemList里的每一条数据
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
          name: app.globalData.nickName
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

  // 上传照片调用
  afterRead: function (event) {
    const {file} = event.detail;
    const {fileList = []} = this.data;
    // 因为每次添加图片都会触发一次这个函数，所以初始化数据的时候需要初始化data的数据，不然会重置
    var photoUrlList = this.data.photoUrlList
    fileList.push({
      url: file.path
    });
    this.setData({
      fileList
    })

    //转换成永久链接
    wx.cloud.uploadFile({
      cloudPath: "img/" + new Date().getTime() + '.png',
      filePath: file.path, // 小程序临时文件路径
    }).then(res =>{
        this.data.photoUrlList.push({
        url:res.fileID
        })
        console.log(res.fileID);
    })
    this.setData({
      photoUrlList
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

  // 获取物品名称信息
 
  
  onChangeName(event){
    console.log(event.detail);
    this.setData({
      itemName: event.detail
    })
  },

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
    this.setData({
      itemSort: res.detail.name
    })
  },
  onSelecthome(res) {
    this.setData({
      addList: res.detail.name,
      valuehome: res.detail.name
    })
  },
  getDiffDay(date_1, date_2) {
    // 计算两个日期之间的差值
    let totalDays,diffDate
    let myDate_1 = Date.parse(date_1)
    let myDate_2 = Date.parse(date_2)
    // 将两个日期都转换为毫秒格式，然后做差
    diffDate = Math.abs(myDate_1 - myDate_2) // 取相差毫秒数的绝对值
   
    totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整
    // console.log(totalDays)    
   
    return totalDays    // 相差的天数
  },


  // 提交
  onClick() {
    // flag=1是更新列表
    if (this.data.flag === 1) {
      var itemCount = this.data.number
      var startDate = this.data.date1
      var endDate = this.data.date2
      var itemName  = this.data.itemName
      var itemRemark = this.data.remark
      var itemSort = this.data.itemSort
      var allList = this.data.allItem
      var index = this.data.itemIndex
      console.log('更新数据');
      db.collection('itemList').doc(this.data.itemId).update({
        data: {
          itemCount:itemCount,//数量
          startDate:startDate,//生产日期
          endDate:endDate,//过期日期
          itemName:itemName,//名称
          itemRemark:itemRemark,//评论
          itemSort:itemSort,//类别
          listId:listId,//清单名称
        },
        success: function(res) {
          console.log(res.data)
        }
      })
      // console.log(itemCount);
      // console.log(itemName);
      // allList[index].count = itemCount
      // allList[index].date1 = startDate
      // allList[index].date2 = endDate
      // allList[index].name = itemName
      // allList[index].remark = itemRemark
      // allList[index].sort = itemSort
      // allList[index].photourl = this.data.photoURL
      // allList[index].token = app.globalData.cloudID

      // db.collection('homelist').doc(this.data.listId).update({
      //   data: {
      //     info: db.command.set({
      //       info: allList
      //     })
      //   },
      //   success: function (res) {
      //     console.log('更新成功')
      //     console.log(allList);
      //   }
      // })
    }
    // flag=0是直接加入列表，默认=0
    else {
      var that = this
      var itemCount = this.data.number
      var startDate = this.data.date1
      var endDate = this.data.date2
      // 增加一个计算生产日期到过期日期的计算逻辑
      let totalDays,diffDate
      let myDate_1 = Date.parse(startDate)
      let myDate_2 = Date.parse(endDate)
      // 将两个日期都转换为毫秒格式，然后做差
      diffDate = Math.abs(myDate_1 - myDate_2) // 取相差毫秒数的绝对值
      totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整
      console.log(totalDays);


      var itemName  = this.data.itemName
      var itemRemark = this.data.remark
      var itemSort = this.data.itemSort
      var listId = this.data.valuehome
      var photoUrlList = this.data.photoUrlList
      var nickName=this.data.nickName
      

      

      db.collection('itemList').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          itemCount:itemCount,
          startDate:startDate,
          endDate:endDate,
          itemName:itemName,
          itemRemark:itemRemark,
          itemSort:itemSort,
          photoUrlList:photoUrlList,
          listId:listId,
          Intervals:totalDays,
          nickName:nickName

        },
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log("上传itemList成功");
          console.log(res)
        }
      })

      // wx.cloud.uploadFile({
      //   cloudPath: "img/" + new Date().getTime() + '.png',
      //   filePath: this.data.fileList[0].url, // 小程序临时文件路径
      // }).then(res => {
      //   // 提交的数据
      //   this.clouddata = {
      //     count: itenCount,
      //     date1: startDate,
      //     date2: endDate,
      //     name: itemName,
      //     remark: itemRemark,
      //     sort: itemSort,
      //     photourl: res.fileID,
      //     token: app.globalData.cloudID
      //   }
      //   // 这里需要判断是更新还是添加
      //   // flag=1的时候是更新

      //   var infoo = []

        

      //   // 放到对应清单
      //   db.collection('homelist').where({
      //       homeid: this.data.addList
      //     })
      //     .get().then((res) => {
      //       infoo = res.data[0]
      //       console.log('这里是info');
      //       console.log(infoo);
      //       infoo.info.info.push(this.clouddata)
      //       console.log(infoo)
      //     })
      //     .then(() => {
      //       db.collection('homelist').doc(infoo._id).update({
      //         data: {
      //           info: infoo.info
      //         }
      //       }).then((res) => {
      //         console.log(res)
      //       })
      //     })
      // }).catch(error => {
      //   // handle error
      //   console.log('出错')
      //   console.log(error)
      //   console.log(cloudPath)
      //   console.log(filePath)
      // })
    }

    wx.showToast({
      title: '提交啦!!',
    })
    setTimeout(()=>{
      this.setData({
        itemSort: "类别",
        valuehome: "选择空间",
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
        itemName: '',
        number: 0,
      })
    },2000)
  
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
  },
  
});
