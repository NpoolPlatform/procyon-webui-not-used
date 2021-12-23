import dayjs from 'dayjs'
require('dayjs/locale/ja')

type timestampDigits = 2 | 3 | 0

export const TimeStampToDate = (
  timestamp: string,
  digit?: timestampDigits,
  lang?: string
): string => {
  let date: dayjs.Dayjs
  switch (lang) {
    case 'en':
      date = dayjs.unix(Number(timestamp))
      break
    default:
      date = dayjs.unix(Number(timestamp)).locale('ja')
      break
  }

  let formatDate: string
  switch (digit) {
    case 2:
      formatDate = date.get('y').toString() + '.' + date.get('month').toString()
      break
    case 3:
      formatDate =
        date.get('y').toString() +
        '.' +
        date.get('month').toString() +
        date.get('date').toString()
      break
    default:
      formatDate =
        date.get('y').toString() +
        '.' +
        date.get('month').toString() +
        '.' +
        date.get('date').toString() +
        ' ' +
        date.get('hour').toString() +
        ':' +
        date.get('minute').toString() +
        ':' +
        date.get('second').toString()
      break
  }

  return formatDate
}
