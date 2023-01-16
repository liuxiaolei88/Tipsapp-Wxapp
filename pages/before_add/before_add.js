Page({
  data: {
    show: true,
    actions: [
      {
        name: '选项',
      },
      {
        name: '选项',
      },
      {
        name: '选项',
        subname: '描述信息',
        openType: 'share',
      },
    ],
  },

  onClose() {
    this.setData({ show: true });
  },

  onSelect(event) {
    console.log(event.detail);
  },
});