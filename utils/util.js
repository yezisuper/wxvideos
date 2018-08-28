// 验证登录状态
function userlogin() {
  if (!getApp().globalData.customer_id) {
    wx.navigateTo({
      url: '/pages/login/login'
    })
    return false;
  }
}
const isEmptyObject = obj => {
  var name;
  for (name in obj) {
    return false;
  }
  return true;
}
// 中英文验证
function checkChineseLen(name_pd){
  if(name_pd.length < 1 ){
    wx.showToast({
        title: '没有输入昵称，请重新填写',
        icon: "none",
        duration: 2000
    })
    return false;
  }else if(name_pd.length > 16){
    wx.showToast({
        title: '最多可输入16个字符的昵称',
        icon: "none",
        duration: 2000
    })
    return false;
  } else if (!/^[^<>/\x22]{1,16}$/i.test(name_pd)) {
    wx.showToast({
      title: '请不要输入特殊字符',
      icon: "none",
      duration: 2000
    })
    return false;
  }
  return true;
}

/*保存到相册*/
function savePicToAlbum(tempFilePath) {
  let that = this;
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success(res) {
                wx.showToast({
                  title: '保存成功'
                });
              }
            })
          },
          fail() {
            // 用户拒绝授权,打开设置页面
            wx.openSetting({
              success: function (data) {
                wx.saveImageToPhotosAlbum({
                  filePath: tempFilePath,
                  success(res) {
                    wx.showToast({
                      title: '保存成功',
                    });
                  }
                })
              }
            });
          }
        })
      } else {
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
            });
          }
        })
      }
    }
  })
}
var Round = function (num) {
  return Math.round(num)
}
/* 点赞 */
function likeFn (e) {
  var that = getCurrentPages()[getCurrentPages().length - 1];//获取当前page实例
  var videoid = e.currentTarget.dataset.videoid;
  var isadd = e.currentTarget.dataset.isadd;
  var index = e.currentTarget.dataset.index;
  var num = e.currentTarget.dataset.num;
  if (isadd == 1) {
    that.setData({
      clickindex: index
    })
  } else {
    that.setData({
      clickindex: null
    })
  }
  wx.request({
    url: getApp().Api_url + '/index.php/index/videoclick',
    method: 'POST',
    data: {
      customer_id: that.data.customer_id,
      video_id: videoid,
      is_add: isadd
    },
    header: that.data.header,
    success: function (res) {
      if (res.data.status == 1) {
        var obj = 'myvideos[' + index + '].is_click';
        var obj1 = 'myvideos[' + index + '].clickrate';
        if (isadd == 1) {
          that.setData({
            [obj]: isadd,
            [obj1]: parseInt(num) + 1
          })
          if (getApp().globalData.cancellike.indexOf(videoid) != -1){
            getApp().globalData.cancellike.splice(getApp().globalData.cancellike.indexOf(videoid),1)
          }
          getApp().globalData.pushlike.push(videoid)
        } else {
          that.setData({
            [obj]: isadd,
            [obj1]: parseInt(num) - 1
          })
          if (getApp().globalData.pushlike.indexOf(videoid) != -1) {
            getApp().globalData.pushlike.splice(getApp().globalData.pushlike.indexOf(videoid), 1)
          }
          getApp().globalData.cancellike.push(videoid)
        }
      }
    }
  })
}

/* 取消收藏 */
function collectFn (e) {
  var that = getCurrentPages()[getCurrentPages().length - 1];//获取当前page实例
  var indexv = e.currentTarget.dataset.index;
  var video_id = e.currentTarget.dataset.videoid;
  wx.showModal({
    title: '',
    content: '您要取消收藏的内容吗？',
    success: function (res) {
      if (res.confirm) {
        wx.request({
          url: getApp().Api_url + '/index.php/index/videocollect',
          method: 'POST',
          data: {
            customer_id: that.data.customer_id,
            video_id: video_id,
            is_add: 0
          },
          header: that.data.header,
          success: function (res) {
            var data = that.data.myvideos;
            data.splice(indexv, 1);
            if (that.data.MBIndex == indexv) {
              that.setData({
                MBIndex: null
              })
            }
            that.setData({
              myvideos: data
            })
            getApp().globalData.cancelcol.push(video_id);
            if (that.route == 'pages/videoplay/videoplay') {
              that.setData({
                item0: that.data.myvideos[that.data.videobool]
              })
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2];
              var obj = prevPage.data.myvideos;
              for (var i = 0; i < obj.length; i++) {
                if (obj[i].id == e.currentTarget.dataset.videoid) {
                  obj.splice(i, 1)
                  prevPage.setData({
                    myvideos: obj
                  })
                }
              }
              if(data.length <= 0){
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          }
        })
      }
    }
  })
}
module.exports = {
  userlogin: userlogin,
  checkChineseLen:checkChineseLen,
  savePicToAlbum: savePicToAlbum,
  likeFn: likeFn,
  collectFn: collectFn,
  savePicToAlbum: savePicToAlbum,
  Round:Round
}
