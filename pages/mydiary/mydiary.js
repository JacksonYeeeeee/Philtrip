var app = getApp()
Page({
  data: {
    //图片
    imgStore: [],

    diarys:[],
    hiddenModal:true
  },


  //显示缓存数据
  onShow: function () {
    var that = this
    var data = []
    wx.getStorage({
      key: 'note_diary',
      success: function (res) {
        data = res.data;
        that.setData({
          diarys: res.data
        })
      }
    })
  },

  onLoad: function (options) {
    this.setData({
      imgStore: wx.getStorageSync('note_diary_photo')
    });
  },

  //清空指定缓存
  clear: function () {

    this.setData({
      hiddenModal: !this.data.hiddenModal
    })

  },

  Confirm: function () {

    wx.removeStorage({
      key: 'note_diary',
      success: function (res) {
        console.log(res.data)
      }
    })

    wx.removeStorage({
      key: 'note_diary_photo',
      success: function (res) {
        console.log(res.data)
      }
    }) 

    this.setData({
      imgStore:[],
      diarys: [],
      hiddenModal: true
    })
  },

  Cancel: function () {
    this.setData({
      hiddenModal: true
    })
  },

  exit:function(){
    wx.navigateBack({
      delta: 2,
    })
  },

  bindClose: function (e) {
    let index = e.currentTarget.dataset.index, newDiarys = this.data.diarys;
    newDiarys.splice(index, 1);
    this.setData({
      diarys: newDiarys
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我的日记',
      path: '/pages/mydiary/mydiary?id=123'
    }
  },

}) 