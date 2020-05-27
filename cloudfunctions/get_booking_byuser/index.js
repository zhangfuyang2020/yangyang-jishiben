// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('booking').where(event).get();
  } catch (err) {
    console.log('云函数调用失败 err ==> ', err);
  }
}