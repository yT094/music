// pages/home-music/index.js

import { getBanners } from '../../service/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'

const throttleQueryRect = throttle(queryRect, 1000)


Page({
    /**
     * 页面的初始数据
     */
    data: {
        banners: [],
        swiperHeight: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取页面数据
        this.getPageData()
    },

    // 网络请求
    getPageData: function () {
        getBanners().then(res => {
            this.setData({ banners: res.banners })
        })
    },

    // 事件处理
    handleSearchClick: function () {
        wx.navigateTo({
            url: '/pages/detail-search/index',
        })
    },

    handleSwiperImageLoaded: function() {
        // 获取图片的高度(如果去获取某一个组件的高度)
        throttleQueryRect(".swiper-image").then(res => {
          const rect = res[0]
          this.setData({ swiperHeight: rect.height })
        })
      },
    
})