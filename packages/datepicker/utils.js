function getDateInfo(dateObj) {
  const [ date, month, year ] = [ dateObj.getDate(), dateObj.getMonth(), dateObj.getFullYear() ]
  return { date, month, year }
}

// 将两位以下的数字转化
function normalizedDoubleDigits(num) {
  if (typeof num !== 'number' || num > 99) {
    throw new Error('number over range!')
  }

  return num < 10 ? `0${num}` : num
}

export default {
  getMonthFirstDay(dateObj) {
    const { month, year } = getDateInfo(dateObj)
    return new Date(year, month, 1)
  },
  getMonthLastDay(dateObj) {
    const { month, year } = getDateInfo(dateObj)
    return new Date(year, month + 1, 0)
  },
  // 获取星期几
  getDay(dateObj) {
    return dateObj.getDay()
  },
  getRange(begin, end) {
    const arr = []
    for (let i = begin; i <= end; i++) {
      arr.push[i]
    }
    return arr
  },
  getFormatDate(dateObj) {
    let { date, month, year } = getDateInfo(dateObj)
    const seperator = '-'
    date = normalizedDoubleDigits(date)
    month = normalizedDoubleDigits(month)
    year = ++year
    const array = [year, month, date]
    return array.join(seperator)
  },
  isInSameDay(dateA, dateB) {
    const { date: date1, month: month1, year: year1 } = getDateInfo(dateA)
    const { date: date2, month: month2, year: year2 } = getDateInfo(dateB)
    return date1 === date2 && month1 === month2 && year1 === year2
  },
  setNewYear(dateObj, newDate) {
    const { month, date } = getDateInfo(dateObj)
    return new Date(newDate, month, date)
  },
  setNewMonth(dateObj, newDate) {
    const { year, date } = getDateInfo(dateObj)
    return new Date(year, newDate, date)
  }
}