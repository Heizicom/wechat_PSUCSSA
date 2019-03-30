//index.js
//获取应用实例
import utils from '../../utils/index'
var app = getApp()

Page({
  data: {
    title: '立即报名',
    tableID: app.globalData.tableId,
    bookList: [],
    item: [],
    creatingBookName: '', 
    editingBookName: '',
    creatingName: '', 
    editingName: '',
    creatingCampus:'',
    creatingAge: '',
    editingAge: '',
    creatingTeam: '',
    sectitle:'',
  },

  onLoad(options) {

    this.getDetail(options.richTextID, Number(options.index))
  },
  
  getDetail: function (id, index) {
    var that = this;
    var richTextID = id; //章节id
    var objects = { richTextID };
    wx.BaaS.getContent(objects).then((res) => {
      // success
      console.log(res.data)
      that.setData({ sectitle: res.data.title})

      //渲染富文本
      wxParser.parse({
        bind: 'richText',
        html: that.data.detail.content,
        target: that
      });
      //文本显示
      that.setData({
        dataLoadFinish: true
      })
      wx.hideLoading()
    }, (err) => {
      // err
    });
  },

  // 绑定添加书目的输入框事件，设置添加的数目名称
  bindCreateBookNameInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingBookName: value
    })
  },
  bindCreateNameInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingName: value
    })
  },
  bindCreateCampusInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingCampus: value
    })
  },
  bindCreateAgeInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingAge: value
    })
  },
  bindCreateTeamInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingTeam: value
    })
  },


  createBook(e) {
    let index = this.data.sectitle
    let Name = this.data.creatingName
    let Campus = this.data.creatingCampus
    let Age = this.data.creatingAge
    let Team = this.data.creatingTeam
    let bookName = this.data.creatingBookName // 缓存在 data 对象中的输入框输入的书名
    let tableID = '40995' // 从知晓云后台的数据表中获取到的对应数据表的 ID
    let Books = new wx.BaaS.TableObject(tableID) //实例化对应 tableID 的数据表对象
    let book = Books.create() // 创建一条记录

    let rec = {
      bookName: bookName,
      Name: Name,
      Age: Age,
      index: index,
      Team: Team,
      Campus: Campus,
    }

    if (bookName == null || bookName == '' || bookName == undefined) {
      wx.showModal({
        title: '出错啦',
        content: '微信号不能为空',
        showCancel: false,
        confirmText: '我去改'
      })
      return;
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
    if (Campus == null || Campus == '' || Campus == undefined) {
      wx.showModal({
        title: '出错啦',
        content: '校区不能为空',
        showCancel: false,
        confirmText: '我去改'
      })
      return;
    }

    book.set(rec).save().then(res => { }, err => { })

    wx.showModal({
      title: '提交成功',
      content: '恭喜你～～～报名成功～～～',
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

  // 绑定每一行书目的“编辑”按钮点击事件，控制输入框和文本显示
  editBookButtonClicked(e) {
    let that = this
    let activeIndex = e.currentTarget.dataset.index
    let bookList = this.data.bookList

    bookList.forEach((elem, idx) => {
      if (activeIndex == idx) {
       elem.isEditing = true
      } else {
        elem.isEditing = false
      }
    })

    that.setData({
      bookList
    })
  },

  // 绑定每一行书目的输入框事件，设定当前正在编辑的书名
  bindEditBookNameInput(e) {
    let bookName = e.detail.value
    this.setData({
      editingBookName: bookName,
    })
  },

  // 绑定修改书目的提交按钮点击事件，向服务器发送数据
  updateBook(e) {

    this.setData({
      curRecordId: e.target.dataset.bookId,
    })

    utils.updateBook(this, (res) => {
      this.fetchBookList()
      this.setData({curRecordId: ''})
    })
  },

  // 删除当前行的书目
  deleteBook(e) {
    this.setData({
      curRecordId: e.target.dataset.bookId,
    })
    utils.deleteBook(this, (res) => {
      this.fetchBookList()
      this.setData({curRecordId: ''})
    })
  },

})