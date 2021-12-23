import dayjs from 'dayjs'
import 'dayjs/locale/ja'

export const TimeStampToDate = (
  timestamp: string,
  format: string,
  lang?: string
): string => {
  switch (lang) {
    case 'en-US':
      return dayjs.unix(Number(timestamp)).format(format)
    default:
      return dayjs.unix(Number(timestamp)).locale('ja').format(format)
  }
}
