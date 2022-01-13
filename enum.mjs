export default class Enum {

  static filters(filters) {
    if(this == Enum) return
    if(filters) {
      Object.defineProperty(this, "filters", {
        value: filters,
        writable: false,
        configurable: false,
        enumerable: false
      })
    }
  }

  static get keys() {
    return Object.keys(this)
  }

  static get values() {
    return Object.values(this)
  }

  static get(a, b) {
    if(!b) {
      if(typeof a == "number") return this.values[a]
      return this[a]
    }
    var filter = this.filters[a]
    if(!filter) return null
    var vals = this.values
    var keys = this.keys
    for(var i in vals) {
      if(filter(b, keys[i], vals[i], i)) return vals[i]
    }
    return undefined
  }

  #values; #filters;
  constructor(o, filters) {
    this.#values = o || {}
    this.#filters = filters || []
    if(o instanceof Object && !(o instanceof Array)) {
      for(var k of Object.keys(o)) {
        if(["keys","values","get","init"].includes(k)) continue // illegal keys
        Object.defineProperty(this, k, {
          value: o[k],
          writable: false,
          configurable: false,
          enumerable: true
        })
      }
    }
  }

  get keys() {
    if(this.#values instanceof Array) return null
    return Object.keys(this.#values)
  }

  get values() {
    if(this.#values instanceof Array) return this.#values
    return Object.values(this.#values)
  }

  get(a, b, sep) {
    if(!b) {
      if(typeof a == "number") {
        if(!(this.#values instanceof Array)) return this.values[a]
        var bin = a.toString(2)
        var arr = []
        for(var i = 0; i < bin.length; i++) {
          if(bin[bin.length -1 -i] == "1") arr.push(this.#values[i])
        }
        if(sep) return arr.join(sep)
        return arr
      }
      return this.#values[a]
    }
    var filter = this.filters[a]
    if(!filter) return null
    var vals = this.values
    var keys = this.keys
    for(var i in vals) {
      if(filter(b, keys[i], vals[i], i)) return vals[i]
    }
    return undefined
  }

}

// TODO: put on github+npm, check for extends
