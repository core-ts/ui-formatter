const et = ""

export function getDateFormat(profile?: string): string {
  return "M/d/yyyy"
}

export function addDays(d: Date, n: number): Date {
  const newDate = new Date(d)
  newDate.setDate(newDate.getDate() + n)
  return newDate
}
export function formatDate(d: Date | null | undefined, format?: string): any {
  if (!d || !format) {
    return ""
  }
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const day = d.getDate()

  let out = ""
  let i = 0

  while (i < format.length) {
    const c = format.charCodeAt(i)

    // yyyy / yy
    if (c === 121 /* y */) {
      const len = count(format, i, 121)
      if (len >= 4) {
        out += y.toString()
        i += 4
      } else {
        out += shortYear(y)
        i += 2
      }
      continue
    }

    // MM / M
    if (c === 77 /* M */) {
      const len = count(format, i, 77)
      out += len >= 2 ? pad(m) : m.toString()
      i += len >= 2 ? 2 : 1
      continue
    }

    // dd / d
    if (c === 100 /* d */) {
      const len = count(format, i, 100)
      out += len >= 2 ? pad(day) : day.toString()
      i += len >= 2 ? 2 : 1
      continue
    }

    // literal char
    out += format[i]
    i++
  }
  return out
}
function shortYear(y: number): string {
  return (y % 100 + 100) % 100 < 10
    ? "0" + ((y % 100 + 100) % 100)
    : "" + ((y % 100 + 100) % 100)
}
function count(s: string, i: number, ch: number): number {
  let n = 0
  while (i + n < s.length && s.charCodeAt(i + n) === ch) {
    n++
  }
  return n
}
export function datetimeToString(date?: Date | string): any {
  if (!date || date === et) {
    return undefined
  }
  const d2 = typeof date !== "string" ? date : new Date(date)
  const year = d2.getFullYear()
  const month = pad(d2.getMonth() + 1)
  const day = pad(d2.getDate())
  const hours = pad(d2.getHours())
  const minutes = pad(d2.getMinutes())
  const seconds = pad(d2.getSeconds())
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}
export function formatDateTime(date: Date | null | undefined, dateFormat?: string): any {
  if (!date) {
    return et
  }
  const sd = formatDate(date, dateFormat)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatTime(date)
}
export function formatLongDateTime(date: Date | null | undefined, dateFormat?: string): any {
  if (!date) {
    return et
  }
  const sd = formatDate(date, dateFormat)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatLongTime(date)
}
export function formatFullDateTime(date: Date | null | undefined, dateFormat?: string, s?: string): any {
  if (!date) {
    return et
  }
  const sd = formatDate(date, dateFormat)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatFullTime(date, s)
}
export function formatTime(d: Date): string {
  return pad(d.getHours()) + ":" + pad(d.getMinutes())
}
export function formatLongTime(d: Date): string {
  return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds())
}
export function formatFullTime(d: Date, s?: string): string {
  const se = s && s.length > 0 ? s : "."
  return formatLongTime(d) + se + pad3(d.getMilliseconds())
}
export function dateToString(d: Date, milli?: boolean): string {
  const s = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  if (milli) {
    return s + pad3(d.getMilliseconds())
  }
  return s
}
function pad(n: number): string {
  return n < 10 ? "0" + n : n.toString()
}
function pad3(n: number): string {
  if (n >= 100) {
    return n.toString()
  }
  return n < 10 ? "00" + n : "0" + n.toString()
}

export function formatNumber(v?: number | null, scale?: number, d?: string | null, g?: string): any {
  if (v == null) {
    return ""
  }
  if (!d && !g) {
    g = ","
    d = "."
  } else if (!g) {
    g = d === "," ? "." : ","
  }
  const s = scale === 0 || scale ? v.toFixed(scale) : v.toString()
  const x = s.split(".", 2)
  const y = x[0]
  const arr: string[] = []
  const len = y.length - 1
  for (let k = 0; k < len; k++) {
    arr.push(y[len - k])
    if ((k + 1) % 3 === 0) {
      arr.push(g)
    }
  }
  arr.push(y[0])
  if (x.length === 1) {
    return arr.reverse().join("")
  } else {
    return arr.reverse().join("") + d + x[1]
  }
}

// tslint:disable-next-line:class-name
export class formatter {
  // private static _preg = / |\+|\-|\.|\(|\)/g;
  static fax = / |\-|\.|\(|\)/g
  static phone = / |\-|\.|\(|\)/g
  static usPhone = /(\d{3})(\d{3})(\d{4})/
  static formatPhone(phone?: string | null): string {
    if (!phone) {
      return ""
    }
    // reformat phone number
    // 555 123-4567 or (+1) 555 123-4567
    let s = phone
    const x = removePhoneFormat(phone)
    if (x.length === 10) {
      const USNumber = x.match(formatter.usPhone)
      if (USNumber != null) {
        s = `${USNumber[1]} ${USNumber[2]}-${USNumber[3]}`
      }
    } else if (x.length <= 3 && x.length > 0) {
      s = x
    } else if (x.length > 3 && x.length < 7) {
      s = `${x.substring(0, 3)} ${x.substring(3, x.length)}`
    } else if (x.length >= 7 && x.length < 10) {
      s = `${x.substring(0, 3)} ${x.substring(3, 6)}-${x.substring(6, x.length)}`
    } else if (x.length >= 11) {
      const l = x.length
      s = `${x.substring(0, l - 7)} ${x.substring(l - 7, l - 4)}-${x.substring(l - 4, l)}`
      // formatedPhone = `(+${phoneNumber.charAt(0)}) ${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, phoneNumber.length - 1)}`;
    }
    return s
  }
  static formatFax(fax?: string | null): string {
    if (!fax) {
      return ""
    }
    // reformat phone number
    // 035-456745 or 02-1234567
    let s = fax
    const x = removePhoneFormat(fax)
    const l = x.length
    if (l <= 6) {
      s = x
    } else {
      if (x.substring(0, 2) !== "02") {
        if (l <= 9) {
          s = `${x.substring(0, l - 6)}-${x.substring(l - 6, l)}`
        } else {
          s = `${x.substring(0, l - 9)}-${x.substring(l - 9, l - 6)}-${x.substring(l - 6, l)}`
        }
      } else {
        if (l <= 9) {
          s = `${x.substring(0, l - 7)}-${x.substring(l - 7, l)}`
        } else {
          s = `${x.substring(0, l - 9)}-${x.substring(l - 9, l - 7)}-${x.substring(l - 7, l)}`
        }
      }
    }
    return s
  }
}
export function removePhoneFormat(phone?: string): string {
  return phone ? phone.replace(formatter.phone, "") : ""
}
export function removeFaxFormat(fax?: string): string {
  return fax ? fax.replace(formatter.fax, "") : ""
}
export function formatPhone(phone?: string | null): string {
  return formatter.formatPhone(phone)
}
export function formatFax(fax?: string | null): string {
  return formatter.formatFax(fax)
}

export function isNotEmpty(arr: any[] | string | null | undefined): boolean {
  return arr ? arr.length > 0 : false
}
export function isChecked(v: boolean | string | undefined | null, s: string[] | string | undefined): string {
  if (!v) {
    return ""
  }
  if (typeof v === "boolean") {
    return v ? "checked" : ""
  } else if (s) {
    if (Array.isArray(s)) {
      return s.includes(v) ? "checked" : ""
    } else {
      return s === v ? "checked" : ""
    }
  }
  return ""
}
