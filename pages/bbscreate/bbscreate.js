// pages/bbscreate/bbscreate.js
import utils from '../../utils/index'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '发帖',
    tableID: 42736,
    bookList: [],
    item: [],
    category: ['请选择分类','二手','租房','一起拼','情感','其他'],
    index: 0,
    creatingtitle: '',
    creatingName: '',
    creatingcontent: '',
    imageList: [],
    cloudList: '',
    countIndex: 8,
    count: ['1','2','3','4','5','6','7','8','9'],
    status: '',
    choosecode: 0,
  
  },
  bindCreatetitleInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingtitle: value
    })
  },
  bindCreateNameInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingName: value
    })
  },
  bindCreatecontentInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingcontent: value
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  countChange: function (e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage: function(){
    var that = this
    var cloudList = this.data.cloudList
    wx.chooseImage({
      count: this.data.count[this.data.countIndex],
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function(res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths,
          //cloudList: res.data.path
        })
      },
    })


  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  delImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var imageList = this.data.imageList;
    var cloudList = this.data.cloudList;
    if (index < imageList.length) {
      imageList.splice(index, 1);
    }
    this.setData({
      imageList: imageList,
    })
  },




  createBook(e) {
    let Name = this.data.creatingName
    let content = this.data.creatingcontent
    let Index = this.data.index
    let title = this.data.creatingtitle 
    let imageList = this.data.imageList
    let cloudList = this.data.cloudList
    let status = this.data.status
    let newid = this.data.newid
    let tableID = '42827' // 从知晓云后台的数据表中获取到的对应数据表的 ID
    let Books = new wx.BaaS.TableObject(tableID) //实例化对应 tableID 的数据表对象
    let book = Books.create() // 创建一条记录

    if (title == null || title == '' || title == undefined) {
      wx.showModal({
        title: '出错啦',
        content: '标题不能为空',
        showCancel: false,
        confirmText: '我去改'
      })
      return;
    }
    if (content == null || content == '' || content == undefined) {
      wx.showModal({
        title: '出错啦',
        content: '内容不能为空',
        showCancel: false,
        confirmText: '我去改'
      })
      return;
    }
    if (Index == 0 || Index == '' || Index == undefined) {
      wx.showModal({
        title: '出错啦',
        content: '分类不能为空',
        showCancel: false,
        confirmText: '我去改'
      })
      return;
    }

    let rec = {
      title: title,
      Name: Name,
      content: content,
      Index: Index,
    }
    book.set(rec).save().then(res => { 
      console.log(res)
      wx.BaaS.wxReportTicket(e.detail.formId)
     
      let Product = new wx.BaaS.TableObject('42827')
      let newbook = Product.getWithoutData(res.data.id)
      console.log(res.data.id)

      for (var i = 0; i < imageList.length; i++) {
        let localFilePath = { filePath: imageList[i] }
        let MyFile = new wx.BaaS.File()
        MyFile.upload(localFilePath).then(res => {
          console.log(res)
          cloudList = res.data.path
          status = res.data.status

          newbook.append('cloudList', [cloudList])
          newbook.update().then(res => { }, err => { })

          console.log(cloudList)
          console.log(status)
          if (status != 'ok') {
            wx.showModal({
              title: '出错啦',
              content: '图片上传失败',
              showCancel: false,
              confirmText: '重试一下'
            })
            return;
          }
        })
      }
    }, err => { })
    

    wx.showModal({
      title: '提交成功',
      content: '恭喜你～～～提交成功～～～',
      showCancel: false,
      confirmText: '朕知道了',
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/bbs/bbs',
          })
        }
      }

    })
  },

  //bbsubmit: function(e){
    

  //},

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