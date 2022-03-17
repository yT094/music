import { HYEventStore } from 'hy-event-store'

import { getRankings  } from '../service/api_music'

const rankingMap = { 0: "newRanking", 1: "hotRanking", 2: "originRanking", 3: "upRanking"}
const rankingStore = new HYEventStore({
  // 共享一些数据
  state: {
    newRanking: {}, // 0：新歌
    hotRanking: {}, // 1：热门
    originRanking: {}, // 2：原创
    upRanking: {}, // 3：飙升
  },
  
  // 发送网络请求 
  actions: {
    getRankingDataAction(ctx) {
      for (let i = 0; i < 4; i++) {
        getRankings(i).then( res => {
          // 用以下方法替换 switch(i)
          const rankingName = rankingMap[i]
          ctx[rankingName] = res.playlist
        })
      }
    }
  }
})

export {
  rankingStore,
  rankingMap
}
