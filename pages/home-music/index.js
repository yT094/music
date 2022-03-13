// pages/home-music/index.js

import { getBanners } from '../../service/api_music'

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

    handleSwiperImageLoaded: function () {
        // 获取组件的高度
        const query = wx.createSelectorQuery()
        query.select('.swiper-image').boundingClientRect()
        query.exec(res => {
            const rect = res[0]
            this.setData({ swiperHeight: rect.height })
        })
    }
})