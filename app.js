//app.js
App({
  onLaunch: function() {
    let that = this

    // 引入 BaaS SDK
    require('./utils/sdk-v1.4.0')

    // 完成BaaS的验证和登录
    let clientId = this.globalData.clientId

    wx.BaaS.init(clientId)
    const userId = this.getUserId()

    if (!userId) {
      wx.BaaS.login(false)
        .then(res => {
          console.log('BaaS is logined...')
        }).catch(err => {
          console.log(err)
        })
    }
    
  },

  globalData: {
    clientId: '2ab8ed842c8a220c9bb1', // 从 BaaS 后台获取 ClientID
    tableId: '40995', // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取
    userInfo: {},
    getit: false,
  },

  getUserId() {
    if (this.userId) {
      return this.userId
    }

    const userId = wx.BaaS.storage.get('uid')
    this.userId = userId

    return userId
  },



  //根据条件查询
  findData: function (tableID, condition, conditionCon, cb, cbType, dataGroup, moreCondition, moreConditionCon, isAnd) {
    //tableID指被查询数据表的ID，moreCondition判断两个查询条件还是一个查询条件，moreConditionCon组合查询数据值是一个数组，isAnd判断是or查询还是and查询，condition指条件查询字段名，conditionCon指条件查询字段值，cb指查询成功后所做的处理,cbType判断cb是更新数据函数还是新增数据函数，dataGroup更新/新增数据值(类型为数组或者对象,若为数组则数组元素为对象，每一个对象代表一组需更新的数据键值对)

    // 应用查询对象
    var Product = new wx.BaaS.TableObject(tableID)
    if (moreCondition == true) { //组合查询 支持两个查询条件的这查询
      var firstCondition = Object.keys(moreConditionCon[0])[0]  //组合查询的第一项键
      var firstConditionCon = moreConditionCon[0][firstCondition]
      var secondCondition = Object.keys(moreConditionCon[1])[0]  //组合查询的第二项键
      var secondConditionCon = moreConditionCon[1][secondCondition]
      // 实例化查询对象
      var query1 = new wx.BaaS.Query()  //3本书计划的
      var query2 = new wx.BaaS.Query()   //加入自助计划的
      // 设置查询条件（比较、字符串包含、组合等）
      query1.contains(firstCondition, firstConditionCon)
      query2.contains(secondCondition, secondConditionCon)
      if (isAnd == true) {  //and查询
        var query = wx.BaaS.Query.and(query1, query2)
      } else {  // or 查询
        var query = wx.BaaS.Query.or(query1, query2)
      }

    } else {
      // 实例化查询对象
      var query = new wx.BaaS.Query()
      if (Object.prototype.toString.call(conditionCon).slice(8, -1) == 'RegExp') {  //正则表达式
        // 设置查询条件（比较、字符串包含、组合等）
        query.matches(condition, conditionCon)
      } else if (conditionCon == null) {
        // 设置查询条件（比较、字符串包含、组合等）
        query.isNotNull(condition)
      } else {
        // 设置查询条件（比较、字符串包含、组合等）
        query.contains(condition, conditionCon)
      }
    }

    Product.setQuery(query).find().then((res) => {
      // success
      console.log(res.data.objects)
      if (cbType == 'update') {
        cb && cb(res.data.objects, Product, dataGroup);
        return;
      }
      if (cbType == 'add') {
        cb && cb(res.data.objects, Product, dataGroup);
        return
      }
      cb && cb(res.data.objects, conditionCon, Product)        //日期的正则查询添加的第二个参数 第三个参数是指应用对象实例
    }, (err) => {
      // err
    })
  },
  //更新数据
  updateData: function (data, ProductName, updateData, cb) {
    //ProductName指应用名，data指需要更新的数据，updataField指更新数据组  最多更新两组数据
    var that = this;
    var product = ProductName.getWithoutData(data[0].id)
    var firstKey = Object.keys(updateData[0])[0]  //第一个对象的键
    product.set(firstKey, updateData[0][firstKey])
    product.update().then((res) => {
      // success
      console.log(res)
      if (updateData.length > 1) {
        var secondKey = Object.keys(updateData[1])[0]  //第二个对象的键
        product.set(secondKey, updateData[1][secondKey])
        product.update().then((res) => {
          // success
          console.log(res)

        }, (err) => {
          // err
        })
      }

      /**if (cb) {  //书城 收藏/移除自助计划时更新页面信息
        cb();
      }**/

    }, (err) => {
      // err
    })
  },
})


