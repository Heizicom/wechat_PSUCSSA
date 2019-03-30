// pages/reserve/reserve.js
import utils from '../../utils/index'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    dataLoadFinish: false,
    index: 0,
    tableID: 42788,
    item: [],
    creatingName: '',
    creatingAddress: '',
    creatingPhone: '',
    seeAllGoods: false,
    btnMsg: '查看全部',
    temp: 4,
    phone: '123-456-7890',
  
  },

  goodsmore(event) {
    const that = this;
    let msg = '查看全部';
    if (that.data.seeAllGoods) {
      msg = '查看全部';
    } else {
      msg = '收起';
    }
    that.setData({
      btnMsg: msg,
      seeAllGoods: !that.data.seeAllGoods,
    })
  },
  callPhone(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  //获取内容详情
  getDetail: function (id, index) {
    var that = this;
    var recordID = id; //章节id
    var objects = { recordID };

    let tableID = 42789

    let reserve = new wx.BaaS.TableObject(tableID)

    reserve.get(recordID).then(res => {
      // success
      console.log(res.data)
      that.setData({ cover: res.data.cover })
      that.setData({ index: index + 1 })
      that.setData({
        detail: {
          title: res.data.Name,  //章节标题 
          address: res.data.address,
          index: index + 1,  //章节索引
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


  bindCreateNameInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingName: value
    })
  },
  bindCreateAddressInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingAddress: value
    })
  },
  bindCreatePhoneInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingPhone: value
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },


  createBook(e) {
    let index = this.data.index
    let Name = this.data.creatingName
    let Phone = this.data.creatingPhone
    let Address = this.data.creatingAddress// 缓存在 data 对象中的输入框输入的书名
    let tableID = '42788' // 从知晓云后台的数据表中获取到的对应数据表的 ID
    let Books = new wx.BaaS.TableObject(tableID) //实例化对应 tableID 的数据表对象
    let book = Books.create() // 创建一条记录

    let rec = {
      Name: Name,
      Phone: Phone,
      Address: Address,
      index: index,
    }

    book.set(rec).save().then(res => { }, err => { })

    wx.showToast({
      title: "预约成功"
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