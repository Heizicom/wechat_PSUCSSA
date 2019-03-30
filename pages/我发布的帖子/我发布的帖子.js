// pages/我发布的帖子/我发布的帖子.js
import bbsUtils from '../../utils/bbs'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    bbsData: [],
    recordidList: [],
    tableID: '',
    recordid: '',
    category: ['未分类', '二手', '租房', '一起拼', '情感', '其他'],
    hasMore: true,
    index: 0,
    userid: '',
    title: '我发的帖子'
  },
  //
  getDetail(){
    bbsUtils.getMybbs(this,(res) => {
      // 数组，每个成员为BBS的对象
      let bbsData = res.data.objects

      this.setData({
        bbsData,
      })
      // 获取merchants数据后，将数据
      // 格式化到Markers
      this.setMarkers(bbsData)
      wx.hideToast()

    })
  },

  setMarkers(bbs) {

    let markers = []
    let recordidList = []

    bbs.forEach((item) => {
      let marker = {
        recordID: item.recordID,
        title: item.title,
        content: item.content,
        Index: item.Index,
        //iconPath: '/image/logo.png',
      }
      markers.push(marker)
    })
    bbs.forEach((item) => {
      let recordid = {
        recordID: item.recordID,
      }
      recordidList.push(recordid)
    })

    this.setData({
      markers,
      recordidList,
      hasMore: false,
      dataLoadFinish: true,
    })

  },

  delbbs(e){
    var that = this
    wx.showModal({
      title: '删除帖子',
      content: '一旦删除不可恢复，你确定吗',
      confirmText: '俺确定',
      showCancel: true,
      success: function(res){
        if(res.cancel){
          console.log('用户canel')
        }
        else if(res.confirm){
          let tableID = 42827
          //const self = this;
          const recordid = e.currentTarget.dataset.recordid;
          that.setData({
            recordid,
          });

          let Product = new wx.BaaS.TableObject(tableID)
          console.log(recordid)
          Product.delete(recordid).then(res => {
            wx.showModal({
              title: '删除成功',
              content: '帖子已经删除成功',
              showCancel: false,
              confirmText: '俺知道啦',
              success:function(res){
                if(res.confirm){
                  that.getDetail()
                }
              }
            })
            // success
          }, err => {
            // err
          })
          
        }
      }
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