// pages/我的会员卡/我的会员卡.js
import bbsUtils from '../../utils/bbs'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    profiel:{},
    markers: [],
    bbsData: [],
    recordidList: [],
    tableID: '',
    recordid: '',
    hasMore: true,
    index: 0,
    userid: '',   
    auth: false,
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

  getDetail() {
    bbsUtils.getMycard(this, (res) => {
      // 数组，每个成员为BBS的对象
      let bbsData = res.data.objects

      this.setData({
        bbsData,
      })
      // 获取数据后，将数据
      // 格式化到Markers
      this.setMarkers(bbsData)
      wx.hideToast()

    })
  },

  setMarkers(bbs) {

    let markers = []
    let recordidList = []
    let Name =''
    let Team =''
    let Year =''
    let auth =''
    var that = this
    console.log(bbs)

    /**that.setData({ Name: bbs.Name })
    that.setData({ Team: bbs.Team })
    that.setData({ auth: bbs.auth })**/

    bbs.forEach((item) => {
      /**let marker = {
        recordID: item.recordID,
        auth: item.auth,
        Name: item.Name,
        Team: item.Team,
      }
      markers.push(marker)**/
      that.setData({ Name: item.Name })
      that.setData({ Team: item.Team })
      that.setData({ Year: item.Year })
      that.setData({ auth: item.auth })
    })
    /**bbs.forEach((item) => {
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
    })**/

  },


  // 绑定添加书目的输入框事件，设置添加的数目名称
  bindCreateTeamInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingTeam: value
    })
  },
  bindCreateNameInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingName: value
    })
  },
  bindCreateYearInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingYear: value
    })
  },
  bindCreateInviteInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingInvite: value
    })
  },

  createBook(e) {
    var that = this
    let Name = this.data.creatingName
    let Team = this.data.creatingTeam
    let Invite = this.data.creatingInvite
    let Year = this.data.creatingYear
    let tableID = '50776' // 从知晓云后台的数据表中获取到的对应数据表的 ID
    let Books = new wx.BaaS.TableObject(tableID) //实例化对应 tableID 的数据表对象
    let book = Books.create() // 创建一条记录

    let rec = {
      Name: Name,
      Team: Team,
      Year: Year,
      auth: 'true',
    }

    if (Name == null || Name == '' || Name == undefined) {
      wx.showModal({
        title: '出错啦',
        content: '姓名不能为空',
        showCancel: false,
        confirmText: '我去改'
      })
      return;
    }
    if (Team == null || Team == '' || Team == undefined) {
      wx.showModal({
        title: '出错啦',
        content: '部门不能为空',
        showCancel: false,
        confirmText: '我去改'
      })
      return;
    }
    if (Year == null || Year == '' || Year == undefined) {
      wx.showModal({
        title: '出错啦',
        content: '年度不能为空',
        showCancel: false,
        confirmText: '我去改'
      })
      return;
    }
    if (Invite != '082396620' || Invite == undefined) {
      wx.showModal({
        title: '出错啦',
        content: '邀请码错误',
        showCancel: false,
        confirmText: '我去改'
      })
      return;
    }

    book.set(rec).save().then(res => { }, err => { })

    wx.showModal({
      title: '提交成功',
      content: '恭喜你～～～申请成功～～～',
      showCancel: false,
      confirmText: '朕知道了',
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack({
            
          })
        }
      }

    })
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