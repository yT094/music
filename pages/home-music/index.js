// pages/home-music/index.js
import { rankingStore, rankingMap } from '../../store/index'

import { getBanners, getSongMenu } from '../../service/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'

const throttleQueryRect = throttle(queryRect, 1000)


Page({
    /**
     * 页面的初始数据
     */
    data: {
        banners: [],
        swiperHeight: 0,
        recommendSongs: [],
        hotSongMenu: [],
        recommendSongMenu: [],
        rankings: { 0: {}, 2:{}, 3:{} },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取页面数据
        this.getPageData()

        // 发起共享数据的请求
        rankingStore.dispatch("getRankingDataAction")

        // 从store 获取共享的数据
        rankingStore.onState("hotRanking", (res) => {
            if(!res.tracks) return
            const recommendSongs = res.tracks.slice(0, 6)
            this.setData({ recommendSongs })
        })
        rankingStore.onState("newRanking", this.getRankingHandle(0))
        rankingStore.onState("originRanking", this.getRankingHandle(2))
        rankingStore.onState("upRanking", this.getRankingHandle(3))
    },

    // 网络请求
    getPageData: function () {
        getBanners().then(res => {
            this.setData({ banners: res.banners })
        })

        getSongMenu().then( res => {
            this.setData({ hotSongMenu: res.playlists })
        })

        getSongMenu("华语").then( res => {
            this.setData({ recommendSongMenu: res.playlists })
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

    handleMoreClick: function() {
        this.navigateToDetailSongsPage("hotRanking")
    },
    
    handleRankingItemClick: function(event) {
        const idx = event.currentTarget.dataset.idx
        const rankingName = rankingMap[idx]
        this.navigateToDetailSongsPage(rankingName)
    },

    navigateToDetailSongsPage: function(rankingName) {
        wx.navigateTo({
            url: `/pages/detail-songs/index?ranking=${rankingName}`,
        })
    },

    onUnload: function () {
        // 取消数据监听
        // rankingStore.offState("newRanking", this.getNewRankingHandler)
    },
      
    getRankingHandle: function(idx) {
       return (res) => {
        // 如果对象为空，直接返回
        if( Object.keys(res).length === 0) return
        const name = res.name
        const coverImgUrl = res.coverImgUrl
        const playCount = res.playCount
        const songList = res.tracks.slice(0, 3)
        // 榜单对象
        const rankingObj = { name, coverImgUrl, playCount, songList }
        // 浅拷贝
        const newRankings = {...this.data.rankings, [idx]: rankingObj}
        this.setData( { rankings: newRankings} )
       }
    },
    
})