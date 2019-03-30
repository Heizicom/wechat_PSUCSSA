// page/nsbook/nsbook.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '欢迎',
    categories: [],
    list:[],
    profile: {},
  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.BaaS.login(false).then(() => {
      this.setData({
        profile: wx.BaaS.storage.get('userinfo')
      })
    })
    wx.hideLoading()

    const categories = [
      { id: 1530083507057677 },
    ]

    const list= [
      {
        id: '101',
        icon: "/image/201.png",
        icon2: "/image/21.png",
        name: '我的',
        open: false,
        recordID:"5b27c020d177561103b07f51",
        pages: ['我的会员卡','已报名的活动','已预约的餐厅','我发布的帖子'],
        link:['mine']
      },{
        id: '103',
        icon: "/image/202.png",
        icon2: "/image/22.png",
        name: '新生手册',
        open: false,
        pages: ['新生手册'],
        link: ['nsbook']
      }, {
        id: '102',
        icon: "/image/203.png",
        icon2: "/image/203.png",
        name: '客服服务',
        open: false,
        pages: ['客服', '客服说明'],
        link:['service','servguide']
      },{
        id: '104',
        name: '相关',
        icon: "/image/204.png",
        icon2: "/image/204.png",
        open: false,
        pages: ['使用说明', '关于我们', '建议及反馈'],
        link: ['guide', 'aboutus']
      },
    ]

    this.setData({categories, list})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '努力加载中...',
      icon: 'loading',
      duration: 2000
    })


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})