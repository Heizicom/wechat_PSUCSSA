// pages/buslist/buslist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iList: [],
    name: [],
    cover: [],
    index: 0,
    detail: {},
    hasMore: true
  
  },

  //获取内容详情
  getDetail: function (id, index) {
    var that = this;
    var recordID = id; //章节id
    var objects = { recordID };

    let tableID = 42005

    let allist = new wx.BaaS.TableObject(tableID)

    allist.get(recordID).then(res => {
      // success
      console.log(res.data)
      that.setData({ iList: res.data.iList })
      that.setData({ name: res.data.item })
      that.setData({ index: index + 1 })
      that.setData({ cover: res.data.cover })
      that.setData({
        detail: {
          title: res.data.listname,  //章节标题
          index: index + 1,  //章节索引
          time: res.data.created_at,
        }

      })

      //文本显示
      that.setData({
        dataLoadFinish: true,
        hasMore: false
      })

      wx.hideLoading()
    }, err => {
      // err
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })

    this.getDetail(options.recordID, Number(options.index))

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
    console.log('onPullDownRefresh', new Date())
  
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