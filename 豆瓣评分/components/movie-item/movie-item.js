// components/movie-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    movie:{
      type: Object,
      value: null,
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail: function(){
      console.log('详情');
      //一下两种方式均可以获取数据
      // const title = this.properties.movie.title;
      // const title = this.data.movie.title;
      const moiveJson = encodeURIComponent(JSON.stringify(this.data.movie));
      wx.navigateTo({
        url: `/pages/detail/detail?moive=${moiveJson}`,
      });
        
    },
  }
})
