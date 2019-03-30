// pages/建议及反馈/建议及反馈.js
import utils from '../../utils/index'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '建议及反馈',
    tableID: 42736,
    bookList: [],
    item: [],
    index: 0,
    creatingAge: '',
    creatingName: '',
    creatingcomment: '',
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.BaaS.login(false).then(() => {
      this.setData({
        profile: wx.BaaS.storage.get('userinfo')
      })
    })
  
  },

  // 绑定添加书目的输入框事件，设置添加的数目名称
  bindCreateAgeInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingAge: value
    })
  },
  bindCreateNameInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingName: value
    })
  },
  bindCreatecommentInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingcomment: value
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },


  createBook(e) {
    let Name = this.data.creatingName
    let comment = this.data.creatingcomment
    let Age = this.data.creatingAge // 缓存在 data 对象中的输入框输入的书名
    let tableID = '42736' // 从知晓云后台的数据表中获取到的对应数据表的 ID
    let Books = new wx.BaaS.TableObject(tableID) //实例化对应 tableID 的数据表对象
    let book = Books.create() // 创建一条记录

    let rec = {
      Age: Age,
      Name: Name,
      comment: comment,
    }

    book.set(rec).save().then(res => { }, err => { })

    wx.showToast({
      title: "提交成功"
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
   *
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