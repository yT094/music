// pages/home-video/index.js

import { getTopMV } from '../../service/api_video'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        topMVs: [],
        hasMore: true
    },

    /**
     * 生命周期函数--监听页面加载(created)
     */
    onLoad: async function (options) {
        this.getTopMVData(0)
    },

    // 封装网络请求的方法
    getTopMVData: async function (offset) {
        // 判断是否可以请求
        if (!this.data.hasMore) return

        // 展示加载动画
        wx.showNavigationBarLoading()

        // 真正请求数据
        const res = await getTopMV(offset)
        let newData = this.data.topMVs
        if (offset === 0) {
            newData = res.data
        } else {
            newData = newData.concat(res.data)
        }

        // 设置数据
        this.setData({ topMVs: newData })
        this.setData({ hasMore: res.hasMore })
        // 关闭小圆圈
        wx.hideNavigationBarLoading()
        // 数据来了以后，就停掉动画
        if (offset === 0) {
            wx.stopPullDownRefresh()
        }
    },


    // 其他的生命周期回调函数
    onPullDownRefresh: async function () {
        this.getTopMVData(0)
    },

    onReachBottom: async function () {
        this.getTopMVData(this.data.topMVs.length)
    }
})