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

  },
  
  data1: {
    date1: '',
    show1: false,
  
  },
  onTap1(){
    this.setData({
      show1:true
    })

  },

  onDisplay1() {
    this.setData({ show1: true });
  },
  onClose1() {
    this.setData({ show1: false });
  },
  formatDate1(date1) {
    date1 = new Date(date1);
    return `${date1.getMonth() + 1}/${date1.getDate()}`;
  },
  onConfirm1(res) {
    console.log(res.detail.date1)
    this.setData({
      show1: false,
      date1: this.formatDate1(res.detail.date1),
    });
  },

  data2: {
    date2: '',
    show2: false,
  
  },
  onTap2(){
    this.setData({
      show2:true
    })

  },

  onDisplay2() {
    this.setData({ show2: true });
  },
  onClose2() {
    this.setData({ show2: false });
  },
  formatDate2(date2) {
    date2 = new Date(date2);
    return `${date2.getMonth() + 1}/${date2.getDate()}`;
  },
  onConfirm2(res) {
    console.log(res.detail.date2)
    this.setData({
      show2: false,
      date2: this.formatDate1(res.detail.date2),
    });
  },
  
  
  data3: {
    date3: '',
    show3: false,
  
  },
  onTap3(){
    this.setData({
      show3:true
    })

  },

  onDisplay3() {
    this.setData({ show3: true });
  },
  onClose3() {
    this.setData({ show3: false });
  },
  formatDate3(date3) {
    date3 = new Date(date3);
    return `${date3.getMonth() + 1}/${date3.getDate()}`;
  },
  onConfirm3(res) {
    console.log(res.detail.date3)
    this.setData({
      show3: false,
      date3: this.formatDate3(res.detail.date3),
    });
  },
  data4: {
    date4: '',
    show4: false,
  
  },
  onTap4(){
    this.setData({
      show4:true
    })

  },

  onDisplay4() {
    this.setData({ show4: true });
  },
  onClose4() {
    this.setData({ show4: false });
  },
  formatDate4(date4) {
    date4 = new Date(date4);
    return `${date4.getMonth() + 1}/${date4.getDate()}`;
  },
  onConfirm4(res) {
    console.log(res.detail.date4)
    this.setData({
      show4: false,
      date4: this.formatDate4(res.detail.date4),
    });
  },
  

});
