// pages/login/login.js
Page({

  wechatLogin:function(){
    console.log("微信登录");
  },
  doubanLogin:function(){
    console.log("豆瓣登录");
  },
  agreementClick:function(){
    wx.navigateTo({
      url: '/pages/agreement/agreement',
    });
  }
})