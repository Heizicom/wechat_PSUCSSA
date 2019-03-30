let getBBS = (ctx, cb) => {
  let tableId = 42827,
      bbstype = ctx.data.bbsType,
    BBS = new wx.BaaS.TableObject(tableId)

  let query1 = new wx.BaaS.Query()
  let query2 = new wx.BaaS.Query()
  query1.exists('title')
  query2.compare('Index','=',bbstype)
  let andQuery = wx.BaaS.Query.and(query1, query2)

  // 以 created_at 字段升序
  BBS.orderBy('-created_at')

  BBS.setQuery(andQuery)
    .find()
    .then(res => cb(res))
    .catch(err => console.dir(err))

}

let getBBSDetail = (ctx, cb) => {
  let tableId = 42827,
    recordId = ctx.data._id,
    BBS = new wx.BaaS.TableObject(tableId)

  BBS.get(recordId)
    .then(res => cb(res))
    .catch(err => console.dir(err))
}


let getMybbs = (ctx, cb) => {
  // 实例化查询对象
  let tableId = 42827,
      userid = getApp().getUserId(),
      Mybbs = new wx.BaaS.TableObject(tableId)

  let query1 = new wx.BaaS.Query()
  let query2 = new wx.BaaS.Query()
  query1.exists('title')
  query2.compare('created_by', '=', userid)
  let andQuery = wx.BaaS.Query.and(query1, query2)

  // 以 created_at 字段升序
  Mybbs.orderBy('-created_at')

  Mybbs.setQuery(andQuery)
    .find()
    .then(res => cb(res))
    .catch(err => console.dir(err))

}

let getAll = (ctx, cb) => {
  let tableId = 42827,
       BBS = new wx.BaaS.TableObject(tableId)

  let query = new wx.BaaS.Query()
  query.exists('title')

  // 以  字段升序
  //BBS.orderBy(['-priority'])
  BBS.orderBy(['-created_at'])

  BBS.setQuery(query)
    .find()
    .then(res => cb(res))
    .catch(err => console.dir(err))

}


let getMyhd = (ctx, cb) => {
  // 实例化查询对象
  let tableId = 40995,
    userid = getApp().getUserId(),
    Mybbs = new wx.BaaS.TableObject(tableId)

  let query1 = new wx.BaaS.Query()
  let query2 = new wx.BaaS.Query()
  query1.exists('Name')
  query2.compare('created_by', '=', userid)
  let andQuery = wx.BaaS.Query.and(query1, query2)

  // 以 created_at 字段升序
  Mybbs.orderBy('-created_at')

  Mybbs.setQuery(andQuery)
    .find()
    .then(res => cb(res))
    .catch(err => console.dir(err))

}

let getComment = (ctx, cb) => {
  // 实例化查询对象
  let tableId = 43401,
    //userid = getApp().getUserId(),
    recordId = ctx.data.recordid,
    Mycomment = new wx.BaaS.TableObject(tableId)

  let query1 = new wx.BaaS.Query()
  let query2 = new wx.BaaS.Query()
  query1.exists('comment')
  query2.compare('recordid', '=', recordId)
  let andQuery = wx.BaaS.Query.and(query1, query2)

  // 以 created_at 字段升序
  Mycomment.orderBy('-created_at')

  Mycomment.setQuery(andQuery)
    .find()
    .then(res => cb(res))
    .catch(err => console.dir(err))

}

let getMycard = (ctx, cb) => {
  // 实例化查询对象
  let tableId = 50776,
    userid = getApp().getUserId(),
    Mybbs = new wx.BaaS.TableObject(tableId)

  let query1 = new wx.BaaS.Query()
  let query2 = new wx.BaaS.Query()
  query1.exists('auth')
  query2.compare('created_by', '=', userid)
  let andQuery = wx.BaaS.Query.and(query1, query2)

  // 以 created_at 字段升序
  Mybbs.orderBy('-created_at')

  Mybbs.setQuery(andQuery)
    .find()
    .then(res => cb(res))
    .catch(err => console.dir(err))

}

let getAlumni = (ctx, cb) => {
  let tableId = 60352,
    Mybbs = new wx.BaaS.TableObject(tableId)

  let query = new wx.BaaS.Query()
  query.exists('name')
  Mybbs.orderBy(['-created_at'])

  Mybbs.setQuery(query)
    .find()
    .then(res => cb(res))
    .catch(err => console.dir(err))

}

module.exports = {
  getBBS,
  getBBSDetail,
  getMybbs,
  getAll,
  getMyhd,
  getComment,
  getMycard,
  getAlumni,
}