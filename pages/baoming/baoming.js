const wxParser = require('../../wxParser/index');
var app = getApp() //小程序实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    iList:[],
    item:[],
    dataLoadFinish: false,
    index: 0,
    showSelect: false,
  },

  //获取内容详情
  getDetail: function (id, index) {
    var that = this;
    var richTextID = id; //章节id
    var objects = { richTextID };
    wx.BaaS.getContent(objects).then((res) => {
      // success
      console.log(res.data)
      that.setData({
        detail: {
          title: res.data.title,  //章节标题
          description: res.data.description,
          content: res.data.content, //章节内容 富文本
          index: index + 1,  //章节索引
          richTextID: richTextID,  //章节id
          //recordID: res.data.recordID,
          cover: res.data.cover,
          disabled: res.data.disabled,
          status: res.data.status,
        }
      })
      //渲染富文本
      wxParser.parse({
        bind: 'richText',
        html: that.data.detail.content,
        target: that
      });
      //文本显示
      that.setData({
        dataLoadFinish: true
      })
      wx.hideLoading()
      console.log(that.data.time)
      that.data.timer = setInterval(function () {
        that.data.time++;
      }, 1000)
    }, (err) => {
      // err
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })

    this.getDetail(options.richTextID, Number(options.index))
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
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      console.log(res.target)
    }
    return {
      title: this.data.detail.title,
    }

  }
})