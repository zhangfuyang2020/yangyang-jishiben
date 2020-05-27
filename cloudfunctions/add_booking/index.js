// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 获取数据库引用
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log('event ==> ',event);
  try{
    return await db.collection('booking').add({
      data: event
    });
  } catch(err) {
    console.log('云函数调用失败err ==> ',err);
  }
}