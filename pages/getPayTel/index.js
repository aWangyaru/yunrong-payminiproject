var api = require('../../utils/request.js').default
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telDialogShow: false,
    platform: '',
    outTradeNo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('手机号',wx.getStorageSync('tel'))
    this.setData({
      platform: options.platform,
      outTradeNo: options.outTradeNo
    })
    this.getOpenId()
    if (!wx.getStorageSync('tel')) {
      this.setData({
        telDialogShow: true
      })
    }
  },
  getOpenId: function (res) {
    wx.login({
      success: res => {
        const {
          code
        } = res
        const params = {
          code
        }
        api.getOpenId(params).then(res => {
          if (res.data.flag) {
            const temp = res.data.object
            wx.setStorageSync('openId', temp.openid)
            wx.setStorageSync('sessionkey', temp.session_key)
          }
        })
      }
    })
  },

  /**
   * 授权手机号成功回调
   */
  getPhoneNumber(e) {
    let _t = this
    this.setData({
      telDialogShow: false
    })
    if (e.detail.errMsg === "getPhoneNumber:fail user deny") {
      console.log('拒绝获取手机号')
    } else {
      let params = {
        openid: wx.getStorageSync('openId'),
        sessionKey: wx.getStorageSync('sessionkey'),
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      }
      api.getUserTel(params).then(res => {
        if (res.data.flag) {
          let temp = {
            outTradeNo: this.data.outTradeNo,
            phone: res.data.object.phoneNumber
          }
          wx.setStorageSync('tel', res.data.object.phoneNumber)
          api.repository(temp).then(res => {
            if (res.data.flag) {
            }
          })
        }
      })
    }
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
    // wx.setStorageSync('tel', '')
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