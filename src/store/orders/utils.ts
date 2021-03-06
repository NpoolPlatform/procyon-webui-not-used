import { TimeStampToDate } from 'src/utils/utils'
import { Order, UserOrder } from './types'
import { goodPrice } from '../goods/utils'
import { AppGood, Promotion } from '../goods/types'

export const orderToUserOrder = (order: Order, promotions: Array<Promotion>, appGoods: Array<AppGood>): UserOrder => {
  let reductionAmount = 0
  if (order.UserSpecialReduction) {
    reductionAmount = order.UserSpecialReduction.Amount
  }

  const unitReduction = reductionAmount * 100 / order.Order.Order.Units
  const price = goodPrice(order.Good, promotions, appGoods) - unitReduction

  return {
    ID: order.Order.Order.ID,
    Date: TimeStampToDate(order.Order.Order.CreateAt, 'YYYY-MM-DD HH:mm:ss'),
    Product: order.Good.Main?.Name as string,
    Amount: order.Order.Order.Units.toString() + ' ' + order.Good.Good.Good.Unit,
    Price: price.toString() + ' ' + order.Good.Good.PriceCurrency.Unit + '/' + order.Good.Good.Good.Unit,
    Discount: ((unitReduction / order.Good.Good.Good.Price).toFixed(3)).toString() + '%',
    TechFee: '20%',
    Period: order.Good.Good.Good.DurationDays.toString() + ' ',
    Total: order.Order.Payment ? order.Order.Payment.Amount.toString() : '0',
    Paid: order.Order.Payment ? order.Order.Payment.State === 'done' : false,
    PayCoinUnit: order.PayWithCoin ? order.PayWithCoin.Unit : '',
    CreateAt: order.Order.Payment ? order.Order.Payment.CreateAt : 0,
    StartAt: order.Order.Order.Start,
    EndAt: order.Order.Order.Start + order.Good.Good.Good.DurationDays * 24 * 60 * 60,
    UserSetPaid: order.Order.Payment ? order.Order.Payment.UserSetPaid : false
  }
}

export const orderPaid = (order: Order): boolean => order.Order.Payment ? order.Order.Payment.State === 'done' : false

export const RemainZero = '00:00:00'
export const RemainMax = '06:00:00'

export const remainPayTime = (createAt: number): string => {
  const now = Math.floor(new Date().getTime() / 1000)
  const total = 6 * 60 * 60
  const elapsed = now - createAt
  if (elapsed >= total) {
    return RemainZero
  }

  const remain = total - elapsed
  const hours = Math.floor(remain / 60 / 60)
  const minutes = Math.floor((remain - (hours * 60 * 60)) / 60)
  const seconds = Math.floor(remain - (hours * 60 * 60) - minutes * 60)

  const hour = '0' + hours.toString()
  const minute = minutes > 9 ? minutes.toString() : '0' + minutes.toString()
  const second = seconds > 9 ? seconds.toString() : '0' + seconds.toString()

  return hour + ':' + minute + ':' + second
}
