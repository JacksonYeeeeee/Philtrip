// pages/accordion/accordion.js
var banner = require("../../src/js/banner.js");

//获取应用实例  
var app = getApp() 

Page({
  data: {


    isShowFrom1: false,
    isShowFrom2: false,
    isShowFrom3: false,
    isShowFrom4: false,
    duration: 800,
    array2: ['0', '1', '2', '3', '4', '5'],
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    Tshirt: 0,
    pants: 0,
    medicine: 0,
    pack: 0,
    zty: 0,
    umbrella: 0,
    brush: 0,
    towel: 0,
    otherThings:"",
    
  },
  onLoad: function (options) {
  
  },

  onShow: function () {

    wx.getStorage({
      key: 'thingsList',
      fail: function (res) {
        wx.setStorage({
          key: 'thingsList',
          data: []
        })
      }
    })
  },

  showFrom(e){
    var param = e.target.dataset.param; 
    this.setData({ 
      isShowFrom1: param == 1 ? (!this.data.isShowFrom1) : false,
      isShowFrom2: param == 2 ? (!this.data.isShowFrom2) : false,
      isShowFrom3: param == 3 ? (!this.data.isShowFrom3) : false,
      isShowFrom4: param == 4 ? (!this.data.isShowFrom4) : false
    });
    
  },

  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Tshirt: e.detail.value
    })
  },

  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pants: e.detail.value
    })
  },

  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      medicine: e.detail.value
    })
  },

  bindPickerChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pack: e.detail.value
    })
  },

  bindPickerChange5: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      zty: e.detail.value
    })
  },

  bindPickerChange6: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      umbrella: e.detail.value
    })
  },

  bindPickerChange7: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      brush: e.detail.value
    })
  },

  bindPickerChange8: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      towel: e.detail.value
    })
  },


  bindOtherThings: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      otherThings: e.detail.value
    })
  },

 
      
//完成页面跳转按钮
  finish: function () {
    var that = this
    var thingsLists = {
      Tshirt: that.data.Tshirt,
      pants: that.data.pants,
      medicine: that.data.medicine,
      pack: that.data.pack,
      zty: that.data.zty,
      umbrella: that.data.umbrella,
      brush: that.data.brush,
      towel: that.data.towel,
      otherThings: that.data.otherThings,
    }
    var data = []

    wx.getStorage({
      key: 'thingsList',
      success: function (res) {
        data = res.data;
        data.push(thingsLists);
        console.log(data);
        wx.setStorage({
          key: 'thingsList',
          data: data,
        
        })
      },
    })

    
    wx.showToast({
      title: '创建完成',
      icon: 'success',
      duration: 2000
    })

    wx.navigateTo({
      url: '../mylist/mylist',
    })
  },

  //取消按钮
  //页面跳转
  cancel: function () {
    wx.navigateBack({
      delta:1
    })
  },

})