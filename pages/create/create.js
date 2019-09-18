var app=getApp();
Page({
  //初始化数据
  data: {
    array: ['0','1','2','3','4','5','6'],
    array1: ['中国', '美国', '巴西', '日本','英国'],
    array5: ['观光型',
     '文娱消遣型',
     '公务型',
     '个人及家庭事务型',
     '医疗保健型',
     '文化知识型旅游者',
     '生态 / 探险型旅游者'],

    journalName:app.globalData.journalName,
    male: app.globalData.male,
    female: app.globalData.female,
    kid: app.globalData.kid,
    journalStart: app.globalData.journalStart,
    journalEnd: app.globalData.journalEnd,
    date: app.globalData.date,
    journalCata: app.globalData.journalCata,
    journalAc: app.globalData.journalAc,

  },

  onShow:function(){
    wx.getStorage({
      key: 'list',
      fail: function (res) {
        wx.setStorage({
          key: 'list',
          data: []
        })
      }
    })
  },

  bindJournalName:function(e){
    this.setData({
      journalName: e.detail.value
    })
  },

  //地区选择及旅游类型选择
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      journalStart: e.detail.value
    })
  },

  //
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      journalEnd: e.detail.value
    })
  },

  //
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      journalCata: e.detail.value
    })
  },

  bindPickerChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      male: e.detail.value
    })
  },



  bindPickerChange5: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      female: e.detail.value
    })
  },

  bindPickerChange6: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      kid: e.detail.value
    })
  },

  //日期选择
  bindDateChange4: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  
  bindJournalAc: function (e) {
    this.setData({
      journalAc: e.detail.value
    })
  },

  
  //页面跳转
  gotoNext: function (options) {

    if(this.data.journalName&&this.data.journalAc){
      wx.navigateTo({
        url: '../accordion/accordion',
      })

      var that = this
      var lists = {
        journalName: that.data.journalName,
        male: that.data.male,
        female:that.data.female,
        kid:that.data.kid,
        journalStart:that.data.journalStart,
        journalEnd:that.data.journalEnd,
        date:that.data.date,
        journalCata:that.data.journalCata,
        journalAc:that.data.journalAc,
      }
      var data = []

      wx.getStorage({
        key: 'list',
        success: function (res) {
          data = res.data;
          data.push(lists);
          console.log(data);
          wx.setStorage({
            key: 'list',
            data: data,
          })
        },
      })


    }else{
      wx.showModal({
        title: '旅行名称或旅行活动为空',
        content: '请输入旅行名称和旅行活动',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    
  },
  
  
})