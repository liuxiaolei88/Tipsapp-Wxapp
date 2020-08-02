Page({
  data:{

   
    show:false,
    arr:[
      {name:" 食品"},
      {name:" 药品"},
      {name:" 化妆品护肤品"}
    ],
    value:"",
    fileList: [],
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
  },

  afterRead:function(event){
    console.log(event);
    const { file } = event.detail;
    const{fileList=[]} = this.data;
    fileList.push({url:file.path});
    this.setData({fileList})
    console.log(fileList)
    },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
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

  
  /*onTap1(){
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
    return `${date2.getYear() +1900}/${date2.getMonth() + 1}/${date2.getDate()}`;
  },
  onConfirm2(res) {
    console.log(res.detail.date2)
    this.setData({
      show2: false,
      date2: this.formatDate1(res.detail),
    });
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
    return `${date3.getYear() +1900}/${date3.getMonth() + 1}/${date3.getDate()}`;
  },
  onConfirm3(res) {
    console.log(res.detail.date3)
    this.setData({
      show3: false,
      date3: this.formatDate3(res.detail),
    });
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
    return `${date4.getYear() +1900}/${date4.getMonth() + 1}/${date4.getDate()}`;
  },
  onConfirm4(res) {
    console.log(res.detail.date4)
    this.setData({
      show4: false,
      date4: this.formatDate4(res.detail),
    });
  },*/
  

});


