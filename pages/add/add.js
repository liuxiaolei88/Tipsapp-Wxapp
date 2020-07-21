Page({
  data:{
    show:false,
    arr:[
      {name:" 食品"},
      {name:" 药品"},
      {name:" 化妆品护肤品"}
    ],
    value:""
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
    wx.showToast({
      title: '成功',
    })

  }
});
