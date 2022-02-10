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
    CreateAt: order.Order.Payment?.CreateAt
  }
}
