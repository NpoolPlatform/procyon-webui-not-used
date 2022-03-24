import { AppGood, Good, Promotion } from './types'

const goodPrice = (good: Good, promotions: Array<Promotion>, appGoods: Array<AppGood>): number => {
  for (let i = 0; i < promotions.length; i++) {
    if (promotions[i].GoodID === good.Good.Good.ID) {
      if (new Date().getTime() / 1000 < promotions[i].End && new Date().getTime() / 1000 > promotions[i].Start) {
        return promotions[i].Price
      }
    }
  }
  for (const appGood of appGoods) {
    if (appGood.GoodID === good.Good.Good.ID) {
      return appGood.Price
    }
  }
  return good.Good?.Good.Price
}

export {
  goodPrice
}
