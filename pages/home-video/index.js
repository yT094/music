// pages/home-video/index.js

import hyRequest from '../../service/index'

Page({
    /**
     * 页面的初始数据
     */
    data: {
      topMVs: []
    },

    /**
     * 生命周期函数--监听页面加载(created)
     */
    onLoad: function (options) {
        hyRequest.get("/top/mv", {offset: 0, limit: 10}).then( res => {
            this.setData({ topMVs: res.data })
        })
    },
})