// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allMovies:[
      {
        title:'影院热映',
        tag:'热门',
        movies:[],
      },
      {
        title:'豆瓣热门',
        tag:'热映',
        movies:[],
      },
      {
        title:'经典大片',
        tag:'大片',
        movies:[],
      },
      {
        title:'热播电视剧',
        tag:'电视剧',
        movies:[],
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("页面加载完成");
    // wx.db.toast('提示');
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#66B961',
    });
    this.loadCity(this.loadData);
  },

  loadDataFromNetwork: function(city){
    // confirm.log("网络请求");
    //改进-网络请求
    for (let index = 0; index < this.data.allMovies.length; index++) {
      const tag = this.data.allMovies[index].tag;
      const title = this.data.allMovies[index].title;
      this.loadMovieList(tag,city,(movies) => {
        if(movies != null){
          //缓存数据
        const cacheKey = 'home' + title;
        wx.setStorage({
          key: cacheKey,
          data: movies,
        });
        }
        //赋值
        this.data.allMovies[index].movies = movies;
        this.setData(this.data);
      });
    }
  },

  loadLocalData: function(){
    //改进-加载本地数据
    for (let index = 0; index < this.data.allMovies.length; index++) {
      const element = this.data.allMovies[index];
      const title = this.data.allMovies[index].title;
      const cacheKey = 'home' + title;
      element.movies = wx.getStorageSync(cacheKey);
      console.log(element.movies);
    }
    this.setData(this.data);
  },

  loadData: function(city) {
    this.loadLocalData();
    this.loadDataFromNetwork(city);
    //热映
    //热门
    //电视剧
    //大片
    // this.loadMovieList('热门',city,(movies)=>{
    //   this.data.allMovies[0].movies = movies;
    //   this.setData(this.data);
    // });

    // this.loadMovieList('热映',city,(movies)=>{
    //   this.data.allMovies[1].movies = movies;
    //   this.setData(this.data);
    // });

    // this.loadMovieList('大片',city,(movies)=>{
    //   this.data.allMovies[2].movies = movies;
    //   this.setData(this.data);
    // });

    // this.loadMovieList('电视剧',city,(movies)=>{
    //   this.data.allMovies[3].movies = movies;
    //   this.setData(this.data);
    // });

    // //缓存中取值

    // //改进-网络请求
    // for (let index = 0; index < this.data.allMovies.length; index++) {
    //   const tag = this.data.allMovies[index].tag;
    //   const title = this.data.allMovies[index].title;
    //   this.loadMovieList(tag,city,(movies) => {
    //     //缓存数据
    //     const cacheKey = 'home' + title;
    //     wx.setStorage({
    //       key: cacheKey,
    //       data: movies,
    //     });
    //     //赋值
    //     this.data.allMovies[index].movies = movies;
    //     this.setData(this.data);
    //   });
    // }
    
    //https://movie.douban.com/j/search_subjects?type=movie&tag=%E6%9C%80%E6%96%B0&sort=recommend&page_limit=10&page_start=0
    // wx.request({
    //   url: 'https://movie.douban.com/j/search_subjects',
    //   data: { city: city,type:'movie',tag:'热门','sort':'recommend','page_limit':'10','page_start':0,},
    //   header: {'content-type':'json'},
    //   success: (res) => {
    //     let movies = res.data.subjects;
    //     for (let index = 0; index < movies.length; index++) {
    //       const movie = movies[index];
    //       this.updateMovieStar(movie);
    //     }
    //     this.data.allMovies[0].movies = movies;
    //     this.setData(this.data);
    //     // this.setData(
    //     //   {
    //     //     movies:movies,
    //     //   }
    //     // );
    //     console.log(res.data.subjects);
    //   },
    //   fail: () => {
    //     wx.db.toast('获取热映失败');
    //   }
    // });
  },
  loadCity: function(success){
    wx.getLocation({
      success:(res)=>{
        // console.log("latitude:"+res.latitude);
        // console.log("longitude:"+res.longitude);
        let url = "https://api.map.baidu.com/reverse_geocoding/v3/";
        //ak=9y2aGpRawyiwx2sxaobVsxtIlPcOuo2K
        //output=json
        //coordtype=wgs84ll
        //location={{res.latitude}},{{res.longitude}}";
        var reqTask = wx.request({
          url: url,
          data: {
            'ak':'9y2aGpRawyiwx2sxaobVsxtIlPcOuo2K',
            'output':'json',
            'coordtype':'wgs84ll',
            // 'location':res.latitude+','+res.longitude
            //es6语法
            'location':`${res.latitude},${res.longitude}`
          },
          success: (res) => {
            // console.log(res);
            // console.log(res.data.result.addressComponent.city);
            let cityName = res.data.result.addressComponent.city;
            cityName = cityName.substr(0,cityName.length-1);
            // console.log("cityName:"+cityName);
            // success(cityName);
            //优雅的写法
            success && success(cityName);
          },
        });
      },
      fail:()=>{
        console.log("获取位置失败");
        wx.db.toast('获取位置失败');
        success && success('');
      }
    });
  },
  loadMovieList: function(tag, city, success){
    //https://movie.douban.com/j/search_subjects?type=movie&tag=%E6%9C%80%E6%96%B0&sort=recommend&page_limit=10&page_start=0
    wx.request({
      url: 'https://movie.douban.com/j/search_subjects',
      data: { city: city,type:'movie',tag:tag,'sort':'recommend','page_limit':'10','page_start':0,},
      header: {'content-type':'json'},
      success: (res) => {
        let movies = res.data.subjects;
        for (let index = 0; index < movies.length; index++) {
          const movie = movies[index];
          this.updateMovieStar(movie);
        }
        
        ///回调movie数据
        success && success(movies);
        // this.data.allMovies[0].movies = movies;
        // this.setData(this.data);
        // this.setData(
        //   {
        //     movies:movies,
        //   }
        // );
        // console.log(res.data.subjects);
      },
      fail: () => {
        console.log(movies);
        wx.db.toast('获取热映失败');
      }
    });
  },
  updateMovieStar: function(movie){
    // movie.rate = 7.1;
    let intValue = parseInt(movie.rate);
    let value = parseFloat(movie.rate);
    movie.starValues = [];
    let loopOn = parseInt(intValue/2);
    for (let index = 0; index < loopOn; index++) {
      movie.starValues.push(1);
    }
    let loopHalf = value - intValue > 0 ? 1 : 0;
    if(loopHalf > 0){
      movie.starValues.push(0.5);
    }
    let loopOff = 5 - loopOn - loopHalf;
    for (let index = 0; index < loopOff; index++) {
      movie.starValues.push(0);
    }
  },
  viewMore: function(event){
    // console.log(event);
    const index = event.currentTarget.dataset.index;
    const element = this.data.allMovies[index];
    const title = element.title;
    const tag = element.tag;
    const elementJson = encodeURIComponent(JSON.stringify(element));
    wx.navigateTo({
      url: `/pages/movieList/moiveList?title=${title}&tag=${tag}&element=${elementJson}`,
    });
  },
})