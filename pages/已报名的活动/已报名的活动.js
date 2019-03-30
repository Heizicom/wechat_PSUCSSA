// pages/已报名的活动/已报名的活动.js

import bbsUtils from '../../utils/bbs'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    hdData: [],
    hasMore: true,
    index: 0,
    userid: '',

  },

  //
  getDetail() {
    bbsUtils.getMyhd(this, (res) => {
      // 数组，每个成员为BBS的对象
      let hdData = res.data.objects

      this.setData({
        hdData,
      })
      // 获取merchants数据后，将数据
      // 格式化到Markers
      this.setMarkers(hdData)
      wx.hideToast()

    })
  },

  setMarkers(hdData) {

    let markers = []

    hdData.forEach((item) => {
      let marker = {
        id: item.id,
        Name: item.Name,
        Age: item.Age,
        index: item.index,  
      }
      markers.push(marker)
    })

    this.setData({
      markers,
      hasMore:false,
      dataLoadFinish: true,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',

    })

    wx.BaaS.login(false).then(() => {
      this.setData({
        profile: wx.BaaS.storage.get('userinfo')
      })

    })

    this.getDetail()
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