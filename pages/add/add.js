const db = wx.cloud.database();
const todos = db.collection('userToken');
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)

Page({
  data:{
    show:false,
    arr:[
      {name:" 食品"},
      {name:" 药品"},
      {name:" 化妆品护肤品"}
    ],
    value:"",
<<<<<<< HEAD
=======
=======
var _sort='';
const app = getApp();
Page({
  data: {
    show: false,
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
    value: "",
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
    name:'',
    remark:'',
    count:'',
   
  },
  afterRead: function (event) {
    console.log(event);
    const { file } = event.detail;
    const { fileList = [] } = this.data;
    fileList.push({ url: file.path });
    this.setData({ fileList })
    console.log(fileList)
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
  
    })},

//获取物品名称信息
  onChangeName(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
   
  
<<<<<<< HEAD
=======
=======
    name: '',
    remark: '',
    count: '',
    username: '',
    number:0,
  },
  afterRead: function (event) {
    // console.log(event);
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
    console.log(fileList)
   
    wx.getFileSystemManager().readFile({
      filePath: this.data.fileList[0].url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      complete: (res) => {
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
          url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=24.17950b62b6376407c24b16fa3b403afc.2592000.1635080413.282335-21434170",
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


>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
  },
  //获取物品备注信息

  onChangeRemark(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
<<<<<<< HEAD
    var that = this
    this.setData({

=======
<<<<<<< HEAD
    var that = this
    this.setData({

=======
    this.setData({
      remark:event.detail
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
    })
  },
  //获取物品数量信息
  onChangeCount(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    var that = this
    this.setData({
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)

    })
  },
  
  onTap(){
    this.setData({
      show:true
    })

  },
  onClose(){
    this.setData({
      show:false
    })
  },
  onSelect(res){
    console.log(res.detail.name)
    this.setData({
      value:res.detail.name
    })
    

  },
  onClick(){
// userToken.add({
//   data:{
//     infoName : 
//   }
// })
<<<<<<< HEAD
=======
=======
      number:event.detail
    })
  },

  onTap() {
    this.setData({
      show: true
    })

  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onSelect(res) {
    _sort=res.detail.name
    console.log(res.detail.name)
    this.setData({
      value: res.detail.name
    })


  },
  onClick() {
    // userToken.add({
    //   data:{
    //     infoName : 
    //   }
    // })

    console.log(this.data.remark)
    this.clouddata = {
      count: this.data.number,
      data1: this.data.data1,
      // data2: this.data.data2,
      name: this.data.username,
      remark: this.data.remark,
      sort: _sort,
      photourl: this.data.fileList[0].url,
      date1:this.data.date1,
      date2:this.data.date2,
      token:app.globalData.cloudID
    }
    console.log(JSON.stringify(this.data))
    todos.add({
      data:this.clouddata,
      success: () => console.log("成功了"),
      error: res => console.log(res)
    })

>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
    wx.showToast({
      title: '已经成功提交啦！',
    })

  },
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
  
  onTap1(){
    this.setData({
      show1:true
<<<<<<< HEAD
=======
=======

  onTap1() {
    this.setData({
      show1: true
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
    })

  },

  onDisplay1() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
    this.setData({ show1: true });
  },
  onClose1() {
    this.setData({ show1: false });
<<<<<<< HEAD
=======
=======
    this.setData({
      show1: true
    });
  },
  onClose1() {
    this.setData({
      show1: false
    });
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
  },
  formatDate1(date1) {
    date1 = new Date(date1);
    return `${date1.getYear() +1900}/${date1.getMonth() + 1}/${date1.getDate()}`;
<<<<<<< HEAD
    
=======
<<<<<<< HEAD
    
=======

>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
  },
  onConfirm1(res) {
    //console.log(res.detail.date1)
    this.setData({
      show1: false,
      date1: this.formatDate1(res.detail),
    });
    console.log(res.detail)
  },

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
  
  onTap2(){
    this.setData({
      show2:true
<<<<<<< HEAD
=======
=======

  onTap2() {
    this.setData({
      show2: true
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
    })

  },

  onDisplay2() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
    this.setData({ show2: true });
  },
  onClose2() {
    this.setData({ show2: false });
<<<<<<< HEAD
=======
=======
    this.setData({
      show2: true
    });
  },
  onClose2() {
    this.setData({
      show2: false
    });
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
  
  
  
  onTap3(){
    this.setData({
      show3:true
<<<<<<< HEAD
=======
=======



  onTap3() {
    this.setData({
      show3: true
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
    })

  },

  onDisplay3() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
    this.setData({ show3: true });
  },
  onClose3() {
    this.setData({ show3: false });
<<<<<<< HEAD
=======
=======
    this.setData({
      show3: true
    });
  },
  onClose3() {
    this.setData({
      show3: false
    });
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
  
  onTap4(){
    this.setData({
      show4:true
<<<<<<< HEAD
=======
=======

  onTap4() {
    this.setData({
      show4: true
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
    })

  },

  onDisplay4() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> afc57f7 (new version)
    this.setData({ show4: true });
  },
  onClose4() {
    this.setData({ show4: false });
<<<<<<< HEAD
=======
=======
    this.setData({
      show4: true
    });
  },
  onClose4() {
    this.setData({
      show4: false
    });
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
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
<<<<<<< HEAD
  

});
=======
<<<<<<< HEAD
  

});
=======


});
>>>>>>> 486e2a0 (Initial Commit)
>>>>>>> afc57f7 (new version)
