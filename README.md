# ui-formatter

A lightweight, zero-dependency TypeScript utility library for formatting dates, times, numbers, and phone numbers.

Designed for applications that require **high performance**, **small bundle size**, and **no external dependencies**.

---

## Features

- 🚀 Zero dependencies
- ⚡ High-performance implementations
- 📅 Date formatting
- 🕒 Time formatting
- 🔢 Number formatting
- ☎️ Phone/Fax formatting
- 🧹 Phone normalization
- 💯 TypeScript support
- 🌍 Works in Browser and Node.js

---

## Installation

```bash
npm install ui-formatter
```

or

```bash
yarn add ui-formatter
```

---

## Quick Example

```ts
import {
    formatDate,
    formatDateTime,
    formatNumber,
    formatInteger,
    formatPhone
} from "ui-formatter"

const date = new Date()

formatDate(date, "MM/dd/yyyy")
// 07/02/2026

formatDateTime(date, "yyyy-MM-dd")
// 2026-07-02 14:35

formatNumber(1234567.89, 2)
// 1,234,567.89

formatInteger(1000000)
// 1,000,000

formatPhone("8005551234")
// 800 555-1234
```

---

# API

---

## Date Utilities

### getDateFormat()

Returns the default date format.

```ts
const format = getDateFormat()

// M/d/yyyy
```

---

### addDays()

Returns a new date with the specified number of days added.

```ts
const tomorrow = addDays(new Date(), 1)
```

---

### formatDate()

Formats a Date using a custom format.

Supported tokens:

| Token | Description |
|--------|-------------|
| yyyy | 4-digit year |
| yy | 2-digit year |
| MM | 2-digit month |
| M | Month |
| dd | 2-digit day |
| d | Day |

Example

```ts
formatDate(new Date(), "yyyy-MM-dd")

// 2026-07-02
```

---

### formatTime()

Returns

```
HH:mm
```

Example

```ts
formatTime(new Date())

// 15:30
```

---

### formatLongTime()

Returns

```
HH:mm:ss
```

Example

```ts
formatLongTime(new Date())

// 15:30:45
```

---

### formatFullTime()

Returns

```
HH:mm:ss.SSS
```

Example

```ts
formatFullTime(new Date())

// 15:30:45.123
```

---

### formatDateTime()

Formats

```
<Date> <HH:mm>
```

Example

```ts
formatDateTime(new Date(), "yyyy-MM-dd")

// 2026-07-02 15:30
```

---

### formatLongDateTime()

Formats

```
<Date> <HH:mm:ss>
```

---

### formatFullDateTime()

Formats

```
<Date> <HH:mm:ss.SSS>
```

---

### datetimeToString()

Converts a Date into ISO-like format.

```ts
datetimeToString(new Date())

// 2026-07-02T15:30:45
```

---

### dateToString()

Returns a compact timestamp.

```ts
dateToString(new Date())

// 20260702153045
```

Milliseconds may be included.

```ts
dateToString(new Date(), true)

// 20260702153045123
```

---

# Number Utilities

---

### formatInteger()

Formats an integer with thousands separators.

```ts
formatInteger(123456789)

// 123,456,789
```

Custom separator

```ts
formatInteger(123456789, ".")

// 123.456.789
```

---

### formatNumber()

Formats decimal numbers.

```ts
formatNumber(1234567.89, 2)

// 1,234,567.89
```

Custom separators

```ts
formatNumber(
    1234567.89,
    2,
    ",",
    "."
)

// 1.234.567,89
```

---

# Phone Utilities

---

### normalizePhone()

Removes all characters except digits and `+`.

```ts
normalizePhone("(800) 555-1234")

// 8005551234
```

---

### normalizeFax()

Alias of

```
normalizePhone()
```

---

### formatPhone()

Formats phone numbers into a readable representation.

```ts
formatPhone("8005551234")

// 800 555-1234
```

Supports

- US numbers
- international numbers
- partial numbers

---

### formatFax()

Formats fax numbers.

```ts
formatFax("0212345678")

// 02-12345678
```

---

# Utility Functions

---

### isNotEmpty()

Checks whether an array or string is not empty.

```ts
isNotEmpty([])

// false

isNotEmpty("hello")

// true
```

---

### isChecked()

Utility for HTML templates.

```ts
isChecked(true)

// checked

isChecked(false)

// ""
```

Can also compare string values.

```ts
isChecked("admin", "admin")

// checked
```

---

# Design Goals

This library is designed with the following principles:

- Zero runtime dependencies
- High performance
- Minimal allocations
- Small bundle size
- Predictable behavior
- Browser and Node compatibility

Several implementations avoid regular expressions and repeated string concatenation in favor of allocation-friendly algorithms.

---

# Performance

The library includes optimized implementations for:

- Manual date parsing
- Number formatting
- Integer formatting
- Phone normalization

Many functions use:

- single-pass parsing
- preallocated buffers
- minimal temporary objects

making them suitable for high-throughput applications.

---

# Browser Support

Works in:

- Chrome
- Firefox
- Safari
- Edge
- Node.js
- Bun
- Deno

---

# TypeScript

Fully written in TypeScript.

No additional typings are required.
