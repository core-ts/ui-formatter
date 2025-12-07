const et = ""

export function getDateFormat(profile?: string): string {
  return "M/D/YYYY"
}

export function addDays(d: Date, n: number): Date {
  const newDate = new Date(d)
  newDate.setDate(newDate.getDate() + n)
  return newDate
}
export function formatDate(d: Date | null | undefined, dateFormat?: string, full?: boolean, upper?: boolean): string {
  if (!d) {
    return et
  }
  let format = dateFormat && dateFormat.length > 0 ? dateFormat : "M/D/YYYY"
  if (upper) {
    format = format.toUpperCase()
  }
  let arr = [et, et, et]
  const items = format.split(/\/|\.| |-/)
  let iday = items.indexOf("D")
  let im = items.indexOf("M")
  let iyear = items.indexOf("YYYY")
  let fm = full ? full : false
  let fd = full ? full : false
  let fy = true
  if (iday === -1) {
    iday = items.indexOf("DD")
    fd = true
  }
  if (im === -1) {
    im = items.indexOf("MM")
    fm = true
  }
  if (iyear === -1) {
    iyear = items.indexOf("YY")
    fy = full ? full : false
  }
  arr[iday] = getD(d.getDate(), fd)
  arr[im] = getD(d.getMonth() + 1, fm)
  arr[iyear] = getYear(d.getFullYear(), fy)
  const s = detectSeparator(format)
  const e = detectLastSeparator(format)
  const l = items.length === 4 ? format[format.length - 1] : et
  return arr[0] + s + arr[1] + e + arr[2] + l
}
function detectSeparator(format: string): string {
  const len = format.length
  for (let i = 0; i < len; i++) {
    const c = format[i]
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c
    }
  }
  return "/"
}
function detectLastSeparator(format: string): string {
  const len = format.length - 3
  for (let i = len; i > -0; i--) {
    const c = format[i]
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c
    }
  }
  return "/"
}
export function getYear(y: number, full?: boolean): string {
  if (full || (y <= 99 && y >= -99)) {
    return y.toString()
  }
  const s = y.toString()
  return s.substring(s.length - 2)
}
function getD(n: number, fu: boolean): string {
  return fu ? pad(n) : n.toString()
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
export function formatDateTime(date: Date | null | undefined, dateFormat?: string, full?: boolean, upper?: boolean): any {
  if (!date) {
    return et
  }
  const sd = formatDate(date, dateFormat, full, upper)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatTime(date)
}
export function formatLongDateTime(date: Date | null | undefined, dateFormat?: string, full?: boolean, upper?: boolean): any {
  if (!date) {
    return et
  }
  const sd = formatDate(date, dateFormat, full, upper)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatLongTime(date)
}
export function formatFullDateTime(date: Date | null | undefined, dateFormat?: string, s?: string, full?: boolean, upper?: boolean): any {
  if (!date) {
    return et
  }
  const sd = formatDate(date, dateFormat, full, upper)
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
