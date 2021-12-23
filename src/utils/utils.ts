import dayjs from 'dayjs'
import 'dayjs/locale/ja'

export const TimeStampToDate = (
  timestamp: number,
  format: string,
  lang?: string
): string => {
  switch (lang) {
    case 'en-US':
      return dayjs.unix(timestamp).format(format)
    default:
      return dayjs.unix(timestamp).locale('ja').format(format)
  }
}
