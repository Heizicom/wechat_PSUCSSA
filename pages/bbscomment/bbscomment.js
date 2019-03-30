// pages/bbscomment/bbscomment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    creatingcomment:'',
    detail:{},
    comment: [],
    recordid: '',
    userid:'',
    title: '评论'
  },

  //获取内容详情
  getDetail: function (id, index) {
    var that = this;
    var recordID = id; //章节id
    var objects = { recordID };

    let tableID = 42827

    let list = new wx.BaaS.TableObject(tableID)

    list.get(recordID).then(res => {
      // success
      console.log(res.data)
      that.setData({ comment: res.data.comment })
      //that.setData({ recordID: res.data.recordID })
      that.setData({
        detail: {
          recordId: res.data.id,
          created_by: res.data.created_by,
          title: res.data.title
        }

      })

      wx.hideLoading()
    }, err => {
      // err
    })
  },

  bindcreateComment(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingcomment: value
    })
  },

  createBook(e) {
    var that = this
    const recordid = e.currentTarget.dataset.recordid;
    that.setData({
      recordid,
    });

    let userid = getApp().getUserId()
    let comment = this.data.creatingcomment
    let tableID = '42827' // 从知晓云后台的数据表中获取到的对应数据表的 ID
    //let recordID = that.data.recordID
    let commentable = new wx.BaaS.TableObject(tableID)
    let Mycomment = commentable.getWithoutData(recordid)
    console.log(userid)

    if (comment == null || comment == '' || comment == undefined) {
      wx.showModal({
        title: '出错啦',
        content: '评论内容不能为空',
        showCancel: false,
        confirmText: '我去改'
      })
      return;
    }

    Mycomment.append('comment', [comment])
    Mycomment.append('comment_by', [userid])
    Mycomment.update().then(res => {
      // success
      wx.showModal({
        title: '提交成功',
        content: '恭喜你～～～提交成功～～～',
        showCancel: false,
        confirmText: '朕知道了',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
            })
            that.getDetail(recordid)
          }
        }

      })
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
    this.getDetail(options.recordID,Number(options.index))
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