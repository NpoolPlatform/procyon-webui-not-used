type timestampDigits = 2 | 3 | 0

export const TimeStampToDate = (
  timestamp: string,
  digit: timestampDigits
): string => {
  const date = new Date(Number(timestamp) * 1000)
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1).toString()
      : date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  let formatTime = ''

  switch (digit) {
    case 2:
      formatTime = year.toString() + '.' + month.toString()
      break
    case 3:
      formatTime =
        year.toString() + '.' + month.toString() + '.' + day.toString()
      break
    default:
      formatTime =
        year.toString() +
        '.' +
        month.toString() +
        '.' +
        day.toString() +
        ' ' +
        hour.toString() +
        ':' +
        minute.toString() +
        ':' +
        second.toString()
      break
  }
  return formatTime
}
