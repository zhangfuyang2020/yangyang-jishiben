// miniprogram/pages/my/my.js
//获取小程序实例
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      url: '',
      nickName: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.getUserInfo();
    }, 600)
  },
  //查看我的记账
  viewMyBookingData: function () {
    wx.navigateTo({
      url: '../mybooking/mybooking'
    })
  },
  //获取用户授权信息
  getUserInfo: function () {
    if (app.globalData.isAuth) {
      //如果授权，则获取用户信息
      wx.getUserInfo({
        success: res => {
          this.setData({
            userInfo: {
              url: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName
            }
          })
        }
      })
    }
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