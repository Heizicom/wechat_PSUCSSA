// pages/bbs/bbs.js
import bbsUtils from '../../utils/bbs'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    bbsData: [],
    category: ['未分类','二手', '租房', '一起拼', '情感', '其他'],
    hasMore: true,
    index: 0,
    //type: null,
    //tab:['0','1','2','3','4','5'],
    bbsType: 'all',

  },

  getAll(bbsType){
    bbsUtils.getAll(this, (res) => {
      let bbsData = res.data.objects

      this.setData({
        bbsData,

      })

      this.setMarkers(bbsData)
      wx.hideToast()

    })
  },


  // 获取分类下的所有数据
  getCategory(bbstype) {
    bbsUtils.getBBS(this, (res) => {
      // 数组，每个成员为BBS的对象
      let bbsData = res.data.objects
      let bbsType = bbstype
      this.setData({
        bbsData,
        bbsType,
      })
      // 获取merchants数据后，将数据
      // 格式化到Markers
      this.setMarkers(bbsData)
      wx.hideToast()

    })
  },

  setMarkers(bbs) {

    let markers = []

    bbs.forEach((item) => {
      let marker = {
        created_at: item.created_at,
        recordID: item.recordID,
        title: item.title,
        content: item.content,
        Index: item.Index,
        cloudList: item.imageList,
        iconPath: '/image/logo.png',
      }
      markers.push(marker)
    })

    this.setData({
      markers,
    })

    this.setData({
      dataLoadFinish: true,
      hasMore: false
    })

  },

  changeTab(e) {
    // TODO: stop previous request
    wx.showLoading({
      title: '加载中',
    })
    const self = this;
    const bbsType = e.currentTarget.dataset.type;
    self.setData({
      bbsType,
    });
    this.getCategory(bbsType);
    wx.hideLoading()
  },

  loadTab(e) {
    // TODO: stop previous request
    wx.showLoading({
      title: '加载中',
    })
    const self = this;
    const bbsType = e.currentTarget.dataset.type;
    self.setData({
      bbsType,
    });
    this.getAll(bbsType);
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '正在加载中',
      icon: 'loading',
    })

    let bbsType = this.data.bbsType
    this.getAll(bbsType)

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
      title: '努力加载中',
    })
    this.getCategory()
  
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