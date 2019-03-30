//const fetch = require('../../utils/fetch.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categories2: [],
    categories3: [],
    categories4: [],
    categories5: [],
    categories6: [],
    categories7: [],
    iList: [],
    iList0: [],
    rcdList: [],
    name:[],
    index:0,
    index0: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{}
  },

  //获取内容详情
  getDetail: function (id, index) {
    var that = this;
    var recordID = id; //章节id
    var objects = { recordID };

    let tableID = 42005

    let home = new wx.BaaS.TableObject(tableID)

    home.get(recordID).then(res => {
      // success
      console.log(res.data)
      that.setData({ iList: res.data.iList })
      that.setData({ iList0: res.data.iList0 })
      that.setData({ name: res.data.item })
      that.setData({ rcdList: res.data.rcdList })
      that.setData({ index: index + 1 })
      //that.setData({ index0: index0 + 1 })

      that.setData({
        detail: {
          title: res.data.listname,  //章节标题
          //oldID: res.data.id,
          //index: index + 1,  //章节索引
          time: res.data.created_at,
        }

      })

      //文本显示
      that.setData({
        dataLoadFinish: true
      })

      wx.hideLoading()
    }, err => {
      // err
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
      

      this.getDetail('5b32ee58dbde6213a72b5876', 0)

     const categories = [
       { icon: '/image/011.png', text: '全部活动', id: '5b3246a3201a370c7b38e957'}, 
       { icon: '/image/012.png', text: '娱乐活动', id: '5b320d91171b871193acc172' },
       { icon: '/image/013.png', text: '学术讲座', id: '5b32467d201a370c8138e9b4' },
    
     ]

     const categories2 = [
       { icon: '/image/014.png', text: 'CSSA服务', id: '5b3486ec5b7c810c4487dc63' },
     ]

     const categories3 = [
       { icon: '/image/015.png', text: '校园地图', id: '5b37319c69e4563378cb3729' },
     ]
     const categories4 = [
       { icon: '/image/016.png', text: '公交信息', id: '5b3ed03ba155000e5dcc6b70' },

     ]

     const categories5 = [
       { icon: '/image/020.png', text: 'CSSA论坛', id: '5b3c6e7e1e390120707ca5c4' }
     ]

     /**const categories6 = [
       { icon: '/image/game.png', text: '今天吃啥', id: 42789 }
     ]**/


     const categories7 = [
       { icon: '/image/017.png', text: '联系我们', id: 1530002900711698 },
       { icon: '/image/018.png', text: '超市购物', id: 1530152335055146 },
       { icon: '/image/019.png', text: '更多', id: 1530076828017280 }
     ]

    const categories8 = [
      { icon: '/image/204.png', text: 'CSSA Alumni', id: 60352 }
    ]

     this.setData({ categories, categories2, categories3,categories4,categories5,categories7,categories8})

    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      console.log('update_fail')
      // 新版本下载失败
    })


  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
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
    this.onLoad()

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
  onPullDownRefresh: function (options) {
    wx.showLoading({
      title: '努力加载中...',
      icon: 'loading',
      duration: 2000
    })
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
    if (res.from === 'menu') {
      console.log(res.target)
    }
    return {
      title: '宾州州立生活助手！'
    }

  }
})