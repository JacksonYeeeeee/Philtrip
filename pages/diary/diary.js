// 引用百度地图微信小程序JSAPI模块   
var bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
// pages/accordion/accordion.js
var banner = require("../../src/js/banner.js");

//获取应用实例  
var app = getApp()

Page({
  data: {

    imgMax: 7,   //最大图片上传数（空间有限）
    isImgMax: false, //是否达到规定最大上传数：
    img: [],          //tmp路径
    imgStore: [],     //store路径


    isDisabled:false,
    
    ak: "xduwaR9hL5o5u93pGug4URYLsrgVh8mK",
    weatherData: '',
    futureWeather: [],
    isShowFrom1: false,
    duration: 800,
    hiddenmodalput: true,
    diary:"",
    hiddenModal:true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
  },

  onShow: function () {
    wx.getStorage({
      key: 'note_diary',
      fail: function (res) {
        wx.setStorage({
          key: 'note_diary',
          data: []
        })
      }
    })

    //图片
    wx.getStorage({
      key: 'note_diary_photo',
      fail: function (res) {
        wx.setStorage({
          key: 'note_diary_photo',
          data: [],
        })
      }
    })
    this.setData({
      img: [],
      imgStore: wx.getStorageSync("note_diary_photo")
    })

  },


  bindDiary: function (e) {
    this.setData({
      diary: e.detail.value
    })
  },


  showFrom(e) {
    var param = e.target.dataset.param;
    this.setData({
      isShowFrom1: param == 1 ? (!this.data.isShowFrom1) : false,
    });

  },

  //保存成功弹窗提示
  save: function () {

    var that = this
    var diarys={
      diary:that.data.diary
    }

    var data = []

    if (this.data.diary) {


      wx.getStorage({
        key: 'note_diary',
        success: function (res) {
          data = res.data;
          data.push(diarys);
          console.log(data);
          wx.setStorage({
            key: 'note_diary',
            data: data,
            success: function () {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        },
      })


      
      wx.navigateTo({
        url: '../mydiary/mydiary',
      })
     

    } else {
      wx.showModal({
        title: '您还未记录',
        content: '请写入日记',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },

  onLoad: function (options) {
    var that = this;
    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      console.log(data);

      var weatherData = data.currentWeather[0];
      var futureWeather = data.originalData.results[0].weather_data;
      console.log(futureWeather);
      //weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        weatherData: weatherData,
        futureWeather: futureWeather
      });
    }

    // 发起weather请求   
    BMap.weather({
      fail: fail,
      success: success
    });
  },


  reset:function(e){
    this.setData({
      isDisabled:true,
      top:"10000px",
      hiddenModal:!this.data.hiddenModal
    })
  },

  Confirm: function () {

    this.setData({
      diary:'',
      tempFilePathSum: [],
      isDisabled: false,
      top:"0px",
      hiddenModal: true
    })
  },

  Cancel: function () {
    this.setData({
      isDisabled: false,
      top: "0px",
      hiddenModal: true
    })
  },


  //图片
  //添加图片
  chooseImage: function (e) {
    wx.chooseImage({
      count: 9,
      success: res => {
        console.log('wx.chooseImage 成功');
        var imgTemp = this.data.img;
        imgTemp = imgTemp.concat(res.tempFilePaths);
        //把新的图片impTemp路径加入到img中
        this.setData({
          img: imgTemp
        });
        //当达到最大上传数时：1.弹窗 2.变为true，隐藏“添加图片png”
        if (imgTemp.length >= this.data.imgMax) {
          imgTemp = imgTemp.slice(0, this.data.imgMax);
          this.showToastImgMax();
          this.setData({
            isImgMax: true,
            img: imgTemp
          })
        }
      },

      fail: res => {
        console.log('wx.chooseImage 失败');
      }
    })
  },
  //删除图片：1.更改img数组 2.isImgMax显示“+png”
  deleteImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgTemp = this.data.img;
    imgTemp.splice(index, 1);
    this.setData({
      img: imgTemp,
      isImgMax: false
    })
  },
  // 预览图片
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgTemp = this.data.img;
    wx.previewImage({
      current: imgTemp[index],
      urls: imgTemp
    })
  },
  //save 到 storge
  saveImgs: function () {
    var imgStoreTemp = this.data.imgStore;
    var imgStoreId = imgStoreTemp.length;
    var imgStoreSon = [];
    if (this.data.img.length > 0) {
      for (var j = 0; j < this.data.img.length; j++) {
        wx.saveFile({
          tempFilePath: this.data.img[j],
          success: res => {
            console.log(res);
            imgStoreSon.push(res.savedFilePath);
            imgStoreTemp[imgStoreId] = imgStoreSon;
            console.log(j);//why异步
            this.setData({
              imgStore: imgStoreTemp,
            });
            wx.setStorageSync('note_diary_photo', this.data.imgStore)

          },
          fail: function (res) {
            console.log('saveFile失败')
          },
        });
      };
      /*wx.navigateTo({
        url: '../../pages/mydiary/mydiary?imgStoreId=' + imgStoreId,
      })*/
    }

    wx.showToast({
      title: '上传成功',
      icon: 'success',
      duration: 2000
    })

  },

  //弹窗“最多上传N个”
  showToastImgMax: function () {
    wx: wx.showToast({
      title: '最多上传' + this.data.imgMax + '张',
      success: function (res) {
        console.log('showToastImgMax调用成功')
      },
      fail: function (res) {
        console.log('showToastImgMax调用失败')
      }
    })
  }

}) 