// app.js
App({
  onLaunch() {
    this.initToast();
    this.getSystemInfo();
  },
  getSystemInfo(){
    wx.systemInfo = {};
    const systemInfo = wx.getSystemInfoSync();
    wx.systemInfo.statusBarHeight = systemInfo.statusBarHeight;
    //根据平台设置导航的高度 iOS-44px Android-48px
    if(systemInfo.platform == 'android'){
      wx.systemInfo.navBarHeight = 48;
    }else{
      wx.systemInfo.navBarHeight = 44;
    }
  },
  initToast(){
    //全局toast
    wx.db = {};
    wx.db.toast = (message, duration=1500)=>{
      wx.showToast({
        title: message,
        icon: 'none',
        duration: duration,
        mask: false,
      });
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
