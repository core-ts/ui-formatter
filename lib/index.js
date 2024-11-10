"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var et = "";
function getDateFormat(profile) {
  return "M/D/YYYY";
}
exports.getDateFormat = getDateFormat;
function addDays(d, n) {
  var newDate = new Date(d);
  newDate.setDate(newDate.getDate() + n);
  return newDate;
}
exports.addDays = addDays;
function formatDate(d, dateFormat, full, upper) {
  if (!d) {
    return et;
  }
  var format = dateFormat && dateFormat.length > 0 ? dateFormat : "M/D/YYYY";
  if (upper) {
    format = format.toUpperCase();
  }
  var arr = [et, et, et];
  var items = format.split(/\/|\.| |-/);
  var iday = items.indexOf("D");
  var im = items.indexOf("M");
  var iyear = items.indexOf("YYYY");
  var fm = full ? full : false;
  var fd = full ? full : false;
  var fy = true;
  if (iday === -1) {
    iday = items.indexOf("DD");
    fd = true;
  }
  if (im === -1) {
    im = items.indexOf("MM");
    fm = true;
  }
  if (iyear === -1) {
    iyear = items.indexOf("YY");
    fy = full ? full : false;
  }
  arr[iday] = getD(d.getDate(), fd);
  arr[im] = getD(d.getMonth() + 1, fm);
  arr[iyear] = getYear(d.getFullYear(), fy);
  var s = detectSeparator(format);
  var e = detectLastSeparator(format);
  var l = items.length === 4 ? format[format.length - 1] : et;
  return arr[0] + s + arr[1] + e + arr[2] + l;
}
exports.formatDate = formatDate;
function detectSeparator(format) {
  var len = format.length;
  for (var i = 0; i < len; i++) {
    var c = format[i];
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c;
    }
  }
  return "/";
}
function detectLastSeparator(format) {
  var len = format.length - 3;
  for (var i = len; i > -0; i--) {
    var c = format[i];
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c;
    }
  }
  return "/";
}
function getYear(y, full) {
  if (full || (y <= 99 && y >= -99)) {
    return y.toString();
  }
  var s = y.toString();
  return s.substring(s.length - 2);
}
exports.getYear = getYear;
function getD(n, fu) {
  return fu ? pad(n) : n.toString();
}
function datetimeToString(date) {
  if (!date || date === et) {
    return undefined;
  }
  var d2 = typeof date !== "string" ? date : new Date(date);
  var year = d2.getFullYear();
  var month = pad(d2.getMonth() + 1);
  var day = pad(d2.getDate());
  var hours = pad(d2.getHours());
  var minutes = pad(d2.getMinutes());
  var seconds = pad(d2.getSeconds());
  return year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds;
}
exports.datetimeToString = datetimeToString;
function formatDateTime(date, dateFormat, full, upper) {
  if (!date) {
    return et;
  }
  var sd = formatDate(date, dateFormat, full, upper);
  if (sd.length === 0) {
    return sd;
  }
  return sd + " " + formatTime(date);
}
exports.formatDateTime = formatDateTime;
function formatLongDateTime(date, dateFormat, full, upper) {
  if (!date) {
    return et;
  }
  var sd = formatDate(date, dateFormat, full, upper);
  if (sd.length === 0) {
    return sd;
  }
  return sd + " " + formatLongTime(date);
}
exports.formatLongDateTime = formatLongDateTime;
function formatFullDateTime(date, dateFormat, s, full, upper) {
  if (!date) {
    return et;
  }
  var sd = formatDate(date, dateFormat, full, upper);
  if (sd.length === 0) {
    return sd;
  }
  return sd + " " + formatFullTime(date, s);
}
exports.formatFullDateTime = formatFullDateTime;
function formatTime(d) {
  return pad(d.getHours()) + ":" + pad(d.getMinutes());
}
exports.formatTime = formatTime;
function formatLongTime(d) {
  return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
}
exports.formatLongTime = formatLongTime;
function formatFullTime(d, s) {
  var se = s && s.length > 0 ? s : ".";
  return formatLongTime(d) + se + pad3(d.getMilliseconds());
}
exports.formatFullTime = formatFullTime;
function dateToString(d, milli) {
  var s = "" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
  if (milli) {
    return s + pad3(d.getMilliseconds());
  }
  return s;
}
exports.dateToString = dateToString;
function pad(n) {
  return n < 10 ? "0" + n : n.toString();
}
function pad3(n) {
  if (n >= 100) {
    return n.toString();
  }
  return n < 10 ? "00" + n : "0" + n.toString();
}
