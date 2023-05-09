// pages/itemUserList.js
const db = wx.cloud.database({
  env: 'tipsapp-4g4e3qbv29f41b1c'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listOwn:'',
    listAdd:[],
    listId:'',//用来标识homelist的id
    value1: 0,
    value2: 'a',
    ownerPickerIsShow: false,
    ownerAuth:'读写',
    nowIndex:'',
    nickName:'',//记录用户昵称
    showRefuse:false,//展示不是清单拥有者的弹窗
    actions: [
      {
        name: '读写',
      },
      {
        name: '只读',
      },
    ],
  },
  showPopup() {
    this.setData({ showRefuse: true });
  },

  onClosePopup() {
    this.setData({ showRefuse: false });
  },
  // 控制点击其他其他地方关闭picker
  onClose() {
    this.setData({ ownerPickerIsShow: false });
  },

  onSelect(event) {
    console.log(event);
    var index = this.data.nowIndex
    var string_idx = String(index)
    console.log(index);
    this.data.listAdd[index].aut =event.detail.name
    var updateText = event.detail.name
    db.collection('homelist').doc(this.data.listId).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        'guest':{
          [`${string_idx}`]:{
            'aut':updateText 
        }
      }},
      success: function(res) {
        console.log('成功')
      }
    })
    this.setData({
        listAdd:this.data.listAdd
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: "清单人员"
    })
    wx.getStorage({
      key: 'nickName',
      success: res => {
        this.setData({
          nickName:res.data
        })
      }
    })
    let params = JSON.parse(options.itemObj)
    console.log(params);
    this.setData({
      listOwn:params.owe,
      listAdd:params.add,
      listId:params.itemId
    })
  },
  submitInfo(){

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  changePicker(e){
    if(this.data.nickName===this.data.listOwn){
      console.log(e.currentTarget.dataset.idx)
      this.setData({
        ownerPickerIsShow: true,
        nowIndex:e.currentTarget.dataset.idx
      });
    }else{
      this.setData({
        showRefuse:true
      })
    }
    
  }
})
