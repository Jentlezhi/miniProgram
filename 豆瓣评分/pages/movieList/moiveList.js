// pages/movieList/moiveList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    title:''
  },
  onLoad: function(options){
    console.log(options);
    const element = JSON.parse(decodeURIComponent(options.element));
    this.setData({
      movies:element.movies,
      title: options.title,
    });
    // wx-wx.setNavigationBarTitle({
    //   title: options.title,
    // })
  }
})