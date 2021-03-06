// miniprogram/pages/mybooking/mybooking.js
import {
  utils
} from '../../js/utils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBookingData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBookingDataByUser();
  },

  //获取我的记账数据
  getBookingDataByUser: function () {
    wx.showLoading({
      title: '加载中...'
    })
    wx.cloud.callFunction({
      name: 'get_booking_byuser',
      success: res => {
        wx.hideLoading();
        res.result.data.forEach(v => {
          v.money = utils.thousandthPlace(Number(v.money).toFixed(2));
        })
        res.result.data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        this.setData({
          myBookingData: res.result.data
        })
      },
      fail: err => {
        wx.hideLoading();
      }
    })
  },

  //删除我的记账
  removeMybooking: function (e) {
    //加载提示
    wx.showLoading({
      title: '加载中...'
    })

    wx.cloud.callFunction({
      name: 'remove_booking_byid',
      data: {
        id: e.currentTarget.dataset.id
      },
      success: res => {
        wx.hideLoading();
        // 
        if (res.result.stats.removed == 1) {
          this.data.myBookingData.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            myBookingData: this.data.myBookingData
          })
        } else {
          //提示用户删除失败
          wx.showToast({
            title: '删除失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: err => {
        wx.hideLoading();
      }
    })
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
  onShareAppMessage: function () {

  }
})