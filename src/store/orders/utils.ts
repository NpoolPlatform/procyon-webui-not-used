import { TimeStampToDate } from 'src/utils/utils'
import { Order, UserOrder } from './types'

export const orderToUserOrder = (order: Order): UserOrder => {
  let reductionAmount = 0
  if (order.UserSpecialReduction) {
    reductionAmount = order.UserSpecialReduction.Amount
  }
  return {
    ID: order.Order.ID,
    Date: TimeStampToDate(order.Order.Start, 'YYYY-MM-DD HH:mm:ss'),
    Product: order.Good.Main?.Name as string,
    Amount: order.Order.Units.toString() + order.Good.Good.Unit,
    Price: order.Good.Good.Price.toString() + order.Good.Good.PriceCurrency.Unit + '/' + order.Good.Good.Unit,
    Discount: ((reductionAmount * 100 / order.Order.Units / order.Good.Good.Price).toFixed(3)).toString() + '%',
    TechFee: '20%',
    Period: order.Good.Good.DurationDays.toString(),
    Total: order.Order.Payment ? order.Order.Payment.Amount.toString() : '0',
    Paid: order.Order.Payment ? order.Order.Payment.State === 'done' : false,
    PayCoinUnit: order.PayWithCoin ? order.PayWithCoin.Unit : 'NaN',
    CreateAt: order.Order.Payment ? order.Order.Payment.CreateAt : 0
  }
}

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
