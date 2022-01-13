# node-enum
Adds enums to javascript.

### Install
```sh
npm install @j0code/node-enum
```

### Usage / Syntax
See a few examples below:
- NOTE: I added Java equivalents

```js
import Enum from "@j0code/node-enum"

class MyEnum extends Enum { // public enum MyEnum {}

  // values
  static VALUE_ONE = new MyEnumLol() // VALUE_ONE(),
  static VALUE_TWO = new MyEnumLol()
  static ANOTHER_VALUE = new MyEnumLol()

  // optional
  static #_ = this.filters({})

  constructor() { // private MyEnum() {}
  
  }

}

console.log(MyEnum.VALUE_ONE) // MyEnum {}
```
or, for simple enums:
```js
// NOTE: you can specify filters new Enum({}, [here])

// with object
var myEnum = new Enum({
  VALUE_ONE: 42,
  VALUE_TWO: "lol",
  LEL: true
})
console.log(myEnum.LEL) // true

// with array
var myEnum = new Enum([45, 69, false, "lol", "Hello", "World"])
// this one has a special .get() functionality: you can get multiple values via binary!
console.log(myEnum.get(0x000)) // []       (0)
console.log(myEnum.get(0x001)) // [45]     (1)
console.log(myEnum.get(0x010)) // [69]     (2)
console.log(myEnum.get(0x011)) // [45, 69] (3)
// you can specify a separator for it to automatically .join()
console.log(myEnum.get(0x110000), undefined, " ") // "Hello World"
// if you do not want this behaviour, you can use one of these:
console.log(myEnum.get(0+"")) // 45
console.log(myEnum.values[3]) // "lol"
```
Methods:
```js
MyEnum.values         // an array of values => [MyEnum {}, MyEnum {}, MyEnum {}]
MyEnum.keys           // an array of keys => ["VALUE_ONE", "VALUE_TWO", "ANOTHER_VALUE"]
MyEnum.get("KEY")     // same as MyEnum.KEY
MyEnum.get(1)         // same as MyEnum.values[1]
MyEnum.get(filter, property) // See Filters

// with object
myEnum.values         // an array of values => [42, "lol", true]
myEnum.keys           // an array of keys => ["VALUE_ONE", "VALUE_TWO", "LEL"]
myEnum.get("KEY")     // same as myEnum.KEY
myEnum.get(1)         // same as myEnum.values[1]
myEnum.get(filter, property) // See Filters

// with array
myEnum.values         // an array of values => [45, 69, false, "lol", "Hello", "World"]
myEnum.keys           // null
myEnum.get("3")       // same as myEnum.values[3]
myEnum.get(0x1001)    // binary selector (value zero (0x1) and three (0x1000)) => [45, "lol"]
myEnum.get(0x11).join(", ")  // binary selector with .join(", ") => "45, 69"
myEnum.get(filter, property) // See Filters
```
- [Filters](https://github.com/j0code/node-enum/new/master?readme=1#how-do-i-use-filters)

### What are enums?
Enums are classes that represent a group of constants.
Like this:
```js
class Weekday {

  static MONDAY = new Weekday(0, "Monday", false)
  static TUESDAY = new Weekday(1, "Tuesday", false)
  static WEDNESDAY = new Weekday(2, "Wednesday", false)
  static THURSDAY = new Weekday(3, "Thursday", false)
  static FRIDAY = new Weekday(4, "Friday", false)
  static SATURDAY = new Weekday(5, "Saturday", true)
  static SUNDAY = new Weekday(6, "Sunday", true)

  constructor(id, name, isWeekend) {
    this.id = id
    this.name = name
    this.isWeekend = isWeekend
  }

}
```

### How do I use filters?
Filters are a way of getting a value based on a specify property, instead of index or key

Arguments:
1. property from .get(filter, property)
2. key
3. value
4. index

```js
(property, key, value, index) => condition
```

Using the Weekday example from above:
```js
class Weekday {

  static MONDAY = new Weekday(0, "Monday", false)
  static TUESDAY = new Weekday(1, "Tuesday", false)
  static WEDNESDAY = new Weekday(2, "Wednesday", false)
  static THURSDAY = new Weekday(3, "Thursday", false)
  static FRIDAY = new Weekday(4, "Friday", false)
  static SATURDAY = new Weekday(5, "Saturday", true)
  static SUNDAY = new Weekday(6, "Sunday", true)

  static #_ = this.filters([
    (p, k, v) => p == v.id,   // get first value with id (0-6)
    (p, k, v) => v.isWeekend, // get first value that is a weekend day
  ])

  constructor(id, name, isWeekend) {
    this.id = id
    this.name = name
    this.isWeekend = isWeekend
  }

}

// index of filter, property
Weekday.get(0, 3) // Weekday.THURSDAY
Weekday.get(1)    // Weekday.SATURDAY
```
