import { useStore } from '..'
import { Good } from './types'

const goodPrice = (good: Good): number => {
  const store = useStore()
  const promotions = store.getters.getPromotions
  for (let i = 0; i < promotions.length; i++) {
    if (promotions[i].GoodID === good.Good.Good.ID) {
      if (new Date().getTime() / 1000 < promotions[i].End && new Date().getTime() / 1000 > promotions[i].Start) {
        return promotions[i].Price
      }
    }
  }
  return good.Good?.Good.Price
}

export {
  goodPrice
}
