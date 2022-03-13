import { HYEventStore } from 'hy-event-store'

import { getRankings  } from '../service/api_music'

const rankingStore = new HYEventStore({
  // 共享一些数据
  state: {
    hotRanking: {}
  },
  
  // 发送网络请求 
  actions: {
    getRankingDataAction(ctx) {
      getRankings(1).then(res => {
        ctx.hotRanking = res.playlist
      })
    }
  }
})

export {
  rankingStore
}
