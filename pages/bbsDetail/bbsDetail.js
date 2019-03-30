// pages/bbsDetail/bbsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    cloudList: [],
    isPopping: false,//是否已经弹出
    animPlus: {},//旋转动画
    animBack: {},//item位移,透明度
    animTranspond: {},//item位移,透明度
    animInput: {},//item位移,透明度
    shareData: {
      title: '快来看看这个帖子！',
      desc: '我在CSSA论坛发现了一个好帖子，快来看看！',
      path: '/pages/bbsDetail/bbsDetail'
    }
  
  },

  //获取内容详情
  getDetail: function (id, index) {
    var that = this;
    var recordID = id; //章节id
    var objects = { recordID };

    let tableID = 42827

    let allist = new wx.BaaS.TableObject(tableID)

    allist.get(recordID).then(res => {
      // success
      console.log(res.data)
      that.setData({ cloudList: res.data.cloudList})
      that.setData({
        detail: {
          recordId: res.data.id,
          title: res.data.title, 
          content: res.data.content,
          category: res.data.category,
        }

      })

      wx.hideLoading()
    }, err => {
      // err
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.cloudList 
    })
  },



  //点击弹出
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },

  back: function () {
    console.log("back")
  },


  //弹出动画
  popp: function () {
    //plus顺时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationBack = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(180).step();
    animationBack.translate(-40, -90).rotateZ(360).opacity(1).step();
    animationTranspond.translate(-80, -40).rotateZ(360).opacity(1).step();
    animationInput.translate(-80, 40).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animBack: animationBack.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },

  //收回动画
  takeback: function () {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationBack = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationBack.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animBack: animationBack.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return this.data.shareData
  }
})