Page({
  data: {
    value: '',
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onClick(){
    wx.showToast({
      title: '感谢您的反馈',
    })

  }
});