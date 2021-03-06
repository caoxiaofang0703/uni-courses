// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
// get wx context
function get_wx_context(event, context) {
      // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
      const wxContext = cloud.getWXContext()
      return new Promise(function(resolve, reject) {
            // return the result
            resolve({
                  event,
                  openid: wxContext.OPENID,
                  appid: wxContext.APPID,
                  unionid: wxContext.UNIONID,
                  test:"test"
            })
      })
}

/**
 * get user info
 */
function get_user_info(data) {
      // 可执行其他自定义逻辑
      const db = cloud.database({
            env: 'uni-courses-59eab4'
      })

      console.log("get_user_info");
      console.log(data)
      return new Promise((resolve, reject) => {
            console.log("=============" + data.openid)
            db.collection('users').where({
                  open_id: data.openid // 填入当前用户 openid
            }).get()
      })
}

exports.main = (event, context) => {
      const wxContext = cloud.getWXContext()
      return {
            event,
            openid: wxContext.OPENID,
            appid: wxContext.APPID,
            unionid: wxContext.UNIONID,
      }
}