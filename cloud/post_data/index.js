const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  return await db.collection('todos').add({
    data: {
      description: event.description,
      due: event.due
    }
  })
}
