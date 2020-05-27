import {
  utils
} from '../../js/utils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookingDataByDay: [],
    date: '',
    dayMoney: {
      shouru: 0,
      zhichu: 0
    },
    //开始日期 - 结束日期
    dateRange: {
      start: '',
      end: ''
    },
    //本月的收入-支出
    monthMoney: {
      shouru: 0,
      zhichu: 0,
      jieyu: 0,
      decimaljieyu: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onload');
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
    // console.log('onshow');
    this.getBookingDataByDay();
    this.getDateRange();
    this.getBookingDataByDateRange();
  },
  //日期补零
  formatCurrentDate: function () {
    //获取今天的日期
    let date = new Date().toLocaleDateString().split('/');
    // console.log('date ==> ', date);
    for (let i = 0; i < date.length; i++) {
      date[i] = date[i] >= 10 ? date[i] : '0' + date[i];
    }
    return date;
  },
  getBookingData: function (date) {
    //date: 查询日期
    wx.showLoading({
      title: '加载中...'
    })
    wx.cloud.callFunction({
      name: 'get_booking_byday',
      data: {
        date: date.join('-')
      },
      success: res => {
        wx.hideLoading();
        // console.log(res);
        let o = {
          shouru: 0,
          zhichu: 0
        };
        //统计当天的收入和支出
        res.result.data.forEach(v => {
          let money = Number(v.money);
          o[v.typeTitle.type] += money;
          v.money = utils.thousandthPlace(money.toFixed(2));
        })

        this.setData({
          bookingDataByDay: res.result.data,
          date: date[1] + '月' + date[2] + '日',
          dayMoney: {
            shouru: utils.thousandthPlace(o.shouru.toFixed(2)),
            zhichu: utils.thousandthPlace(o.zhichu.toFixed(2))
          }
        })
      },
      fail: err => {
        wx.hideLoading();
        console.log('出错了 err ==> ', err);
      }
    })
  },

  //按当月的某日查询
  getBookingDataByDay: function () {  
    let date = this.formatCurrentDate();
    this.getBookingData(date);
  },

  //处理时间范围
  getDateRange: function () {
    //获取当前日期
    let date = this.formatCurrentDate();
    // console.log(date);
    this.setData({
      dateRange: {
        start: date.slice(0, 2).concat(['01']).join('-'),
        end: date.join('-')
      }
    })
    // console.log('this.data.dateRange ==> ', this.data.dateRange);
  },

  //切换查询日期
  toggleDate: function (e) {
    // console.log('e', e);
    let date = e.detail.value.split('-');
    this.setData({
      date: date[1] + '月' + date[2] + '日'
    })
    this.getBookingData(date);
  },

  //按照日期范围查询记账数据
  getBookingDataByDateRange: function () {
    // console.log('this.data.dateRange ', this.data.dateRange);
    this.setData({
      monthMoney: {
        shouru: 0,
        zhichu: 0,
        jieyu: 0,
        decimaljieyu: ''
      }
    })
    //加载提示
    wx.showLoading({
      title: '加载中...'
    })
    wx.cloud.callFunction({
      name: 'get_booking_bydaterange',
      data: this.data.dateRange,
      success: res => {
        wx.hideLoading();
        // console.log('日期范围查询记账数据', res);
        res.result.data.forEach(v => {
          this.data.monthMoney[v.typeTitle.type] += Number(v.money);
        })
        let jieyu = (this.data.monthMoney.shouru - this.data.monthMoney.zhichu).toFixed(2).split('.');
        this.setData({
          monthMoney: {
            shouru: utils.thousandthPlace(this.data.monthMoney.shouru.toFixed(2)),
            zhichu: utils.thousandthPlace(this.data.monthMoney.zhichu.toFixed(2)),
            jieyu: utils.thousandthPlace(jieyu[0]),
            decimaljieyu: jieyu[1]
          }
        })
      },
      fail: err => {
        wx.hideLoading();
        console.log('err ==> ', err);
      }
    })
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