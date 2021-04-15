// components/nav-bar/nav-bar.js
/*
<nav-bar title="登录" showBack="true" showHome="true" statusBarBackgroundColor="#42BD55" navBarBackgroundColor="#42BD55" titleColor="#fff"></nav-bar>
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String,
      value: '',
    },
    statusBarBackgroundColor:{
      type: String,
      value: '#fff'
    },
    navBarBackgroundColor:{
      type: String,
      value: '#fff'
    },
    showBack:{
      type: Boolean,
      value: false
    },
    showHome:{
      type: Boolean,
      value: false
    },
    titleColor:{
      type: String,
      value:"#000"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarStyle:'',
    navBarStyle:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back:function(){
      wx.navigateBack({});
    },
    home: function(){
      wx.navigateBack({delta:999});
    },
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    ///该方法每个页面都会调用，获取设备信息的方法只需要一次，故写在app.json全局中
    attached: function () { 
      const statusBarStyle = 
      `height:${wx.systemInfo.statusBarHeight}px;
      background-color:${ this.data.statusBarBackgroundColor };
      `;
      const navBarStyle = 
      `height:${wx.systemInfo.navBarHeight}px;
      background-color:${ this.data.navBarBackgroundColor };
      `;
      // this.setData({
      //   statusBarStyle: statusBarStyle,
      //   navBarStyle: navBarStyle,
      // });
      //es6语法：key和value一致的情况下
      this.setData({
        statusBarStyle,navBarStyle,
      });
    },
  },
})
