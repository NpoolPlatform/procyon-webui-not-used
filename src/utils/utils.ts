import dayjs from 'dayjs'
import 'dayjs/locale/ja'

export const TimeStampToDate = (
  timestamp: string,
  format: string,
  lang?: string
): string => {
  let date: string
  switch (lang) {
    case 'en':
      date = dayjs.unix(Number(timestamp)).format(format)
      break
    default:
      date = dayjs.unix(Number(timestamp)).locale('ja').format(format)
      break
  }

  return date
}
