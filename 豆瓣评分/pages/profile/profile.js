// pages/profile/profile.js
Page({

  data:{
    items:[
      {
        'icon':'ic_cat_movie.png',
        'title':'观影分析',
        'count':0,
        'countDesc':'看过',
        'mark':'标记10部分电影\n开启观影分析',
      },
      {
        'icon':'ic_cat_book.png',
        'title':'读书分析',
        'count':0,
        'countDesc':'读过',
        'mark':'标记10本书\n开启读书分析',
      },
      {
        'icon':'ic_cat_movie.png',
        'title':'音乐分析',
        'count':0,
        'countDesc':'听过',
        'mark':'标记10张唱片\n开启音乐分析',
      },
    ]
  },
  begin: function(evt){
    const btnIndex = evt.currentTarget.dataset.index;
    console.log(btnIndex);
    if(btnIndex == 0){
      console.log('观影');
    }else if(btnIndex == 1){
      console.log('读书');
    }else{ 
      console.log('音乐');
    }
  },
  login: function(event){
    console.log("登录");
    wx.navigateTo({
      url: '/pages/login/login',
    });
      
  }
})