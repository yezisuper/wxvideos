var app = getApp()
import utils from '../utils/util.js';
var that;
Page({
  data: {
    pagenum: 0,
    customer_id: 0,
    loading: true,
    bootomtxt: false,
    covershow: true,
    coverhide: true,
    playshow: false,
    nowledgehide: true,
    tipsAnimation: {},
    showshare: false,
    nowledge: '',
    autoplay: false,
    scrollTop: 0,
    nowledgescroll: true,
    playIndex: null,
    nowledgepd: false,
    videos:[
      { 
        id: "13", 
        coursename: "可怕的大数据",
        thumb: "http://test.xiaoyingyang.com.cn/video_image_2018-08-22_5b7d31729f230.jpg", 
        share_url: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-22/crop_5b7d31777ba48.jpg",
        share_name: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-22/5b7d31777ba48.jpg",
        autoplay:"false",
        clickrate:'0',
        introduction:'哼哼唧唧军军军',
        is_click:"0",
        is_collect:0,
        readnum:0,
        video:"http://style.aotemen.com/wyf/videos/bg.mp4",
        video_avinfo:"207.572000"

      },
      { 
        id: "11", 
        coursename: "美女来跳舞", 
        thumb: "http://test.xiaoyingyang.com.cn/video_image_2018-08-22_5b7d2687cfb0f.jpg", 
        share_url: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-22/crop_5b7d2687d8500.jpg", 
        share_name: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-22/5b7d2687d8500.jpg",
        autoplay: "false",
        clickrate: '0',
        introduction: '哼哼唧唧军军军',
        is_click: "0",
        is_collect: 0,
        readnum: 0,
        video: "http://style.aotemen.com/wyf/videos/bg.mp4",
        video_avinfo: "207.572000"
      },
      { 
        id: "2", 
        coursename: "羽衣甘蓝羽衣甘蓝羽衣甘蓝羽衣甘蓝羽衣甘蓝", 
        thumb: "http://test.xiaoyingyang.com.cn/vidoe_image_2018-08-12_5b6ff796096c2.jpg", 
        share_url: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-12/crop_5b6ff79615933.jpg", 
        share_name: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-12/5b6ff79615933.jpg",
        autoplay: "false",
        clickrate: '0',
        introduction: '哼哼唧唧军军军',
        is_click: "0",
        is_collect: 0,
        readnum: 0,
        video: "http://style.aotemen.com/wyf/videos/bg.mp4",
        video_avinfo: "207.572000"
      },
      { 
        id: "12",
        coursename: "猜题", 
        thumb: "http://test.xiaoyingyang.com.cn/video_image_2018-08-22_5b7d2e20af642.jpg", 
        share_url: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-22/crop_5b7d2e20c54e8.jpg", 
        share_name: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-22/5b7d2e20c54e8.jpg",
        autoplay: "false",
        clickrate: '0',
        introduction: '哼哼唧唧军军军',
        is_click: "0",
        is_collect: 0,
        readnum: 0,
        video: "http://style.aotemen.com/wyf/videos/bg.mp4",
        video_avinfo: "207.572000"
      },
      { id: "10",
        coursename: "偷黄豆", 
        thumb: "http://style.aotemen.com/wyf/dist/images/touxiang.jpg", 
        share_url: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-22/crop_5b7cd0942ac36.jpg", 
        share_name: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-22/5b7cd0942ac36.jpg",
        autoplay: "false",
        clickrate: '0',
        introduction: '哼哼唧唧军军军',
        is_click: "0",
        is_collect: 0,
        readnum: 0,
        video: "http://style.aotemen.com/wyf/videos/bg.mp4",
        video_avinfo: "207.572000"
      },
      { 
        id: "9", 
        coursename: "人才培训", 
        thumb: "http://test.xiaoyingyang.com.cn/video_image_2018-08-22_5b7ccfca53d3f.jpg", 
        share_url: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-22/crop_5b7ccfcc19eb6.jpg", 
        share_name: "https://workstation.test.anmeicare.com/Public/videocard/2018-08-22/5b7ccfcc19eb6.jpg",
        autoplay: "false",
        clickrate: '0',
        introduction: '哼哼唧唧军军军',
        is_click: "0",
        is_collect: 0,
        readnum: 0,
        video: "http://style.aotemen.com/wyf/videos/bg.mp4",
        video_avinfo: "207.572000"
      },
    ]
  },
  onLoad: function (options) {
    that = this;
    this.tipsheight = parseInt(wx.getSystemInfoSync().windowWidth / 750 * 400);
    this.tipsAnimation = wx.createAnimation({
      duration: 500,
    })
    // if(that.data.nowledge !=''){

    // }
  },
  onReady: function () {  //创建视频上下文对象
    this.videoContextplay = wx.createVideoContext('myVideo')
  },
  playvideo(e) {
    var videoindex = e.currentTarget.dataset.index;
    var videoid = e.currentTarget.dataset.videoid;
    that.setData({
      playIndex: videoindex,
      videoid: videoid,
      videonum: e.currentTarget.dataset.videonum,
      heightclick: parseInt(e.detail.y),
      videosrc: e.currentTarget.dataset.videosrc
    })
    this.tipsAnimation.translateY(-this.tipsheight).step();
    this.setData({
      tipsAnimation: this.tipsAnimation.export()
    })
    // 检查网络状态
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == '4g' || res.networkType == '3g' || res.networkType == '2g') {
          that.setData({
            playshow: true,
            jxplay: false,
          })
          // console.log('4G网络')
        } else if (res.networkType == "none" || res.networkType == "unknown") {
          wx.showToast({
            title: '您的网络有问题',
            icon: 'none',
            duration: 1500
          })
          // console.log('您的网络有问题')
        } else {
          var obj = 'videos[' + videoindex + '].readnum';
          that.setData({
            autoplay: true,
            [obj]: parseInt(that.data.videonum) + 1,
            jxplay: false,
            playshow: false
          })
          /* console.log('jxplay111',that.data.jxplay)*/
          // console.log("返回wifi状态111") 
        }
      }
    })
  },
  playvideoll(e) {
    var videoindex = e.currentTarget.dataset.index;
    var videoid = e.currentTarget.dataset.videoid;
    var obj = 'videos[' + videoindex + '].readnum';
    // let videoContextCurrent  = wx.createVideoContext('myVideo-'+videoindex +'')  
    that.setData({
      playIndex: videoindex,
      videoid: videoid,
      playshow: false,
      autoplay: true,
      videonum: e.currentTarget.dataset.videonum,
      [obj]: parseInt(that.data.videonum) + 1,
      jxplay: false,
      Network: 1,
      videosrc: e.currentTarget.dataset.videosrc
    })
    // videoContextCurrent.play()
    if (that.data.jxplay == false) {
      that.videoContextplay.play()
    }
  },
  /* 播放量 */
  hplay() {
    this.setData({
      playshow: false,
    })
    that.videoContextplay.play()
    // this.readnum();
  },
  end() {
    that.setData({
      playIndex: null,
      videosrc: ''
    })
    that.videoContext.exitFullScreen();
  },
  /* 视频播放中监测网络状态 */
  update(e) {
    // return;
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == 'none' && !that.data.jcnet) {
          that.setData({
            jcnet: 1
          })
          wx.showToast({
            title: '您的网络有问题',
            icon: 'none',
            duration: 1500
          })
        } else if ((res.networkType == '4g' || res.networkType == '3g' || res.networkType == '2g') && that.data.Network != 1) {
          // let videoContextCurrent  = wx.createVideoContext('myVideo')  
          that.setData({
            jxplay: true,
            // playshow: true
          })
          that.videoContextplay.pause()
          /* console.log("4g网络") */
        } else {
          that.setData({
            jxplay: false,
            playshow: false
          })
          /*  console.log('jxplay',that.data.jxplay)
           console.log("返回wifi状态") */
        }
      }
    })
  },
  /* 滚动页面 */
    onPageScroll: function (e) {
      if (e.scrollTop < 0) {
        return;
      }
       that.setData({
        scrollTop: e.scrollTop,
        nowledgehide:true
      }) 
      var Index=utils.Round(that.data.scrollTop/that.data.videoH)
      var scrollTopH=that.data.scrollTop
      if(that.data.scrollTop>=that.data.heightclick+100 || that.data.heightclick-that.data.scrollTop>=that.data.videoH3+that.data.videoH2){
        if (that.data.sssss==1){
            that.setData({
              playIndex: that.data.playIndex
            })
        }else{
          that.setData({
            playIndex: null
          })
        }
        console.log('that.data.heightclick - that.data.scrollTop', that.data.heightclick - that.data.scrollTop)
        console.log('that.data.videoH3+that.data.videoH2', that.data.videoH3 + that.data.videoH2)
      }else{
        return;
      }
      
    },
    changescreen(e){
      console.log(2222)
      console.log(e)
      if (e.detail.direction == "horizontal"){
        that.setData({
          playIndex: that.data.playIndex,
          sssss:1
        })
      }else{
        that.setData({
          playIndex: that.data.playIndex,
          sssss: ''
        })
      }
    }
})
