"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var et = "";
function getDateFormat(profile) {
  return "M/d/yyyy";
}
exports.getDateFormat = getDateFormat;
function addDays(d, n) {
  var newDate = new Date(d);
  newDate.setDate(newDate.getDate() + n);
  return newDate;
}
exports.addDays = addDays;
function formatDate(d, format) {
  if (!d || !format) {
    return "";
  }
  var y = d.getFullYear();
  var m = d.getMonth() + 1;
  var day = d.getDate();
  var out = "";
  var i = 0;
  while (i < format.length) {
    var c = format.charCodeAt(i);
    if (c === 121) {
      var len = count(format, i, 121);
      if (len >= 4) {
        out += y.toString();
        i += 4;
      }
      else {
        out += shortYear(y);
        i += 2;
      }
      continue;
    }
    if (c === 77) {
      var len = count(format, i, 77);
      out += len >= 2 ? pad(m) : m.toString();
      i += len >= 2 ? 2 : 1;
      continue;
    }
    if (c === 100) {
      var len = count(format, i, 100);
      out += len >= 2 ? pad(day) : day.toString();
      i += len >= 2 ? 2 : 1;
      continue;
    }
    out += format[i];
    i++;
  }
  return out;
}
exports.formatDate = formatDate;
function shortYear(y) {
  return (y % 100 + 100) % 100 < 10
    ? "0" + ((y % 100 + 100) % 100)
    : "" + ((y % 100 + 100) % 100);
}
function count(s, i, ch) {
  var n = 0;
  while (i + n < s.length && s.charCodeAt(i + n) === ch) {
    n++;
  }
  return n;
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
function formatDateTime(date, dateFormat) {
  if (!date) {
    return et;
  }
  var sd = formatDate(date, dateFormat);
  if (sd.length === 0) {
    return sd;
  }
  return sd + " " + formatTime(date);
}
exports.formatDateTime = formatDateTime;
function formatLongDateTime(date, dateFormat) {
  if (!date) {
    return et;
  }
  var sd = formatDate(date, dateFormat);
  if (sd.length === 0) {
    return sd;
  }
  return sd + " " + formatLongTime(date);
}
exports.formatLongDateTime = formatLongDateTime;
function formatFullDateTime(date, dateFormat, s) {
  if (!date) {
    return et;
  }
  var sd = formatDate(date, dateFormat);
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
function formatNumber(v, scale, d, g) {
  if (v == null) {
    return "";
  }
  if (!d && !g) {
    g = ",";
    d = ".";
  }
  else if (!g) {
    g = d === "," ? "." : ",";
  }
  var s = scale === 0 || scale ? v.toFixed(scale) : v.toString();
  var x = s.split(".", 2);
  var y = x[0];
  var arr = [];
  var len = y.length - 1;
  for (var k = 0; k < len; k++) {
    arr.push(y[len - k]);
    if ((k + 1) % 3 === 0) {
      arr.push(g);
    }
  }
  arr.push(y[0]);
  if (x.length === 1) {
    return arr.reverse().join("");
  }
  else {
    return arr.reverse().join("") + d + x[1];
  }
}
exports.formatNumber = formatNumber;
var formatter = (function () {
  function formatter() {
  }
  formatter.formatPhone = function (phone) {
    if (!phone) {
      return "";
    }
    var s = phone;
    var x = removePhoneFormat(phone);
    if (x.length === 10) {
      var USNumber = x.match(formatter.usPhone);
      if (USNumber != null) {
        s = USNumber[1] + " " + USNumber[2] + "-" + USNumber[3];
      }
    }
    else if (x.length <= 3 && x.length > 0) {
      s = x;
    }
    else if (x.length > 3 && x.length < 7) {
      s = x.substring(0, 3) + " " + x.substring(3, x.length);
    }
    else if (x.length >= 7 && x.length < 10) {
      s = x.substring(0, 3) + " " + x.substring(3, 6) + "-" + x.substring(6, x.length);
    }
    else if (x.length >= 11) {
      var l = x.length;
      s = x.substring(0, l - 7) + " " + x.substring(l - 7, l - 4) + "-" + x.substring(l - 4, l);
    }
    return s;
  };
  formatter.formatFax = function (fax) {
    if (!fax) {
      return "";
    }
    var s = fax;
    var x = removePhoneFormat(fax);
    var l = x.length;
    if (l <= 6) {
      s = x;
    }
    else {
      if (x.substring(0, 2) !== "02") {
        if (l <= 9) {
          s = x.substring(0, l - 6) + "-" + x.substring(l - 6, l);
        }
        else {
          s = x.substring(0, l - 9) + "-" + x.substring(l - 9, l - 6) + "-" + x.substring(l - 6, l);
        }
      }
      else {
        if (l <= 9) {
          s = x.substring(0, l - 7) + "-" + x.substring(l - 7, l);
        }
        else {
          s = x.substring(0, l - 9) + "-" + x.substring(l - 9, l - 7) + "-" + x.substring(l - 7, l);
        }
      }
    }
    return s;
  };
  formatter.fax = / |\-|\.|\(|\)/g;
  formatter.phone = / |\-|\.|\(|\)/g;
  formatter.usPhone = /(\d{3})(\d{3})(\d{4})/;
  return formatter;
}());
exports.formatter = formatter;
function removePhoneFormat(phone) {
  return phone ? phone.replace(formatter.phone, "") : "";
}
exports.removePhoneFormat = removePhoneFormat;
function removeFaxFormat(fax) {
  return fax ? fax.replace(formatter.fax, "") : "";
}
exports.removeFaxFormat = removeFaxFormat;
function formatPhone(phone) {
  return formatter.formatPhone(phone);
}
exports.formatPhone = formatPhone;
function formatFax(fax) {
  return formatter.formatFax(fax);
}
exports.formatFax = formatFax;
function isNotEmpty(arr) {
  return arr ? arr.length > 0 : false;
}
exports.isNotEmpty = isNotEmpty;
function isChecked(v, s) {
  if (!v) {
    return "";
  }
  if (typeof v === "boolean") {
    return v ? "checked" : "";
  }
  else if (s) {
    if (Array.isArray(s)) {
      return s.includes(v) ? "checked" : "";
    }
    else {
      return s === v ? "checked" : "";
    }
  }
  return "";
}
exports.isChecked = isChecked;
