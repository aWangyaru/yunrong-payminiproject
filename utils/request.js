import apiList from './api'
// 自定义参数
const apiRequest = (url, method, data, header) => { 
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data ? data : null,
      method: method,
      header: header ? header : { 'content-type':'application/json'},
      success: function (res) {
        wx.hideLoading();
        //接口调用成功
        resolve(res);
      },
      fail: function (res) {
        wx.hideLoading();
        // fail调用接口失败
        reject({ errormsg: '网络错误,请稍后重试', code: -1 });
      }
    })
  });
  return promise;
}

// 微信授权登录获取openId及token
let getOpenId = (data)=>{
  return new Promise((resolve, reject) => {
    resolve (apiRequest(apiList.getOpenId, 'get', data))
  })
}

// 获取用户手机号
let getUserTel = (query)=>{
  return new Promise((resolve, reject) => {
    resolve (apiRequest(apiList.getUserTel, 'get', query))
  })
}

let repository = (query)=>{
  return new Promise((resolve, reject) => {
    resolve (apiRequest(apiList.repository, 'get', query))
  })
}

export default {
  getOpenId,
  getUserTel,
  repository
}