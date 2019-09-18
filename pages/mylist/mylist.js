// pages/accordion/accordion.js
var banner = require("../../src/js/banner.js");



var app=getApp();
Page({
  data:{

    //滑动标签
    currentTab: 0,

    lists:[],
    thingsLists: [],

    

    hiddenModal:true,
    hiddenModal2:true,
   
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框

    array: ['0', '1', '2', '3', '4', '5', '6'],
    array1: ['中国', '美国', '巴西', '日本', '英国'],
    array5: ['观光型',
      '文娱消遣型',
      '公务型',
      '个人及家庭事务型',
      '医疗保健型',
      '文化知识型旅游者',
      '生态 / 探险型旅游者'],

    journalName:"",
    male:0,
    female:0,
    kid:0,
    journalStart:0,
    journalEnd:0,
    date:'2018-01-29',
    journalCata:0,
    journalAc:"",

    Tshirt: 0,
    pants: 0,
    medicine: 0,
    pack: 0,
    zty: 0,
    umbrella: 0,
    brush: 0,
    towel: 0,
    otherThings:"",

    //改变4.1新增4个变量 改了一些变量名
    indexLists: 0,      //记录Lists点击发生的数组下标index
    isShowLists: false,   //是否展开List
    indexThingsLists: 0,      //记录ThingsLists点击发生的数组下标index
    isShowThingsLists: false,   //是否展开ThingsLists

  },

  //显示缓存数据
  onShow: function () {

    //改变4.3 页面默认隐藏表格
    this.setData({
      indexLists: 0,
      indexThingsLists: 0
    })

    var that = this
    var data = []
    wx.getStorage({
      key: 'list',
      success: function (res) {
        that.setData({
          lists: res.data,
        })
      }
    })

    wx.getStorage({
      key: 'thingsList',
      success: function (res) {
        that.setData({
          thingsLists: res.data,
        })
      }
    })
  },


  //改变4.4 两个主要的函数 
  //每次只会有一个表格被展开
  showLists(e) {
    var isShowListsTemp = this.data.isShowLists;
    var param = e.target.dataset.param;
    //没有表格展开时，点击任何一个必然展开+赋值
    if (isShowListsTemp == false) {
      this.setData({
        indexLists: param,
        isShowLists: true,
      })
      //有表格A展开+点击A， 则隐藏A
    } else if (param == this.data.indexLists) {
      this.setData({
        isShowLists: false,
      })
      //有表格A展开+点击B， 则展开B，并赋值
    } else {
      this.setData({
        indexLists: param,
        isShowLists: true,
      });
    };
  },
  //每次只会有一个表格被展开
  showThingsLists(e) {
    var isShowThingsListsTemp = this.data.isShowThingsLists;
    var param = e.target.dataset.param;
    //没有表格展开时，点击任何一个必然展开+赋值
    if (isShowThingsListsTemp == false) {
      this.setData({
        indexThingsLists: param,
        isShowThingsLists: true,
      })
      //有表格A展开+点击A， 则隐藏A
    } else if (param == this.data.indexThingsLists) {
      this.setData({
        isShowThingsLists: false,
      })
      //有表格A展开+点击B， 则展开B，并赋值
    } else {
      this.setData({
        indexThingsLists: param,
        isShowThingsLists: true,
      });
    };
  },


  //清空指定缓存行程
  clear_trip: function () {
    this.setData({
      hiddenModal: !this.data.hiddenModal
    })
   
  },

  Confirm_trip: function () {

    wx.removeStorage({
      key: 'list',
      success: function (res) {
        console.log(res.data)
      }
    })
    
    this.setData({
      lists: [],
      hiddenModal: true
    })
  },

  Cancel_trip: function () {
    this.setData({
      hiddenModal: true
    })
  },





  //清空指定缓存物品清单
  clear_things: function () {
    this.setData({
      hiddenModal2: !this.data.hiddenModal2
    })

  },

  Confirm_things: function () {

    wx.removeStorage({
      key: 'thingsList',
      success: function (res) {
        console.log(res.data)
      }
    })

    this.setData({
      thingsLists: [],
      hiddenModal2: true
    })
  },

  Cancel_things: function () {
    this.setData({
      hiddenModal2: true
    })
  },



  bindClose: function (e) {
    wx.navigateBack({
      delta: 2,
    })
  },


  //滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  //点击tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },


  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '规划清单',
      path: '/pages/mylist/mylist?id=123'
    }
  },

})
