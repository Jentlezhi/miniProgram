// pages/home/home.js
Page({
  onLoad: function() {
    this.loadCity(this.loadData);
  },
  loadData: function(city) {
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters',
      data: { city: city },
      header: {'content-type':'json'},
      success: (res) => {
        console.log(res);
      },
      fail: () => {
        wx.db.toastError('获取热映失败');
      }
    });
  },
  loadCity: function(success) {
    // 获取经纬度
    wx.getLocation({
      success: (res) => {
        // 逆地理编码
        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3',
          data: {
            output: 'json',
            coordtype: 'wgs84ll',
            ak: '9zTl9xXSCCA8FTnsqQA9Ro8B1mO85v4W',
            location: `${res.latitude},${res.longitude}`
            // location: res.latitude + ',' + res.longitude
          },
          success: (res) => {
            let city = res.data.result.addressComponent.city;
            city = city.substring(0, city.length - 1);
            success && success(city);
          },
          fail: () => {
            wx.db.toastError('获取城市失败');
          }
        });
      },
      fail: () => {
        wx.db.toastError('获取位置失败');
      }
    });
  }
})