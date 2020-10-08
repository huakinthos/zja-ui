export default class Validator {
  static add(fnName, fn) {
    Validator.prototype[fnName] = fn
  }

  validate (formData, rules) {
    const errs = {}
    for (const item of Object.entries(rules)) { // [[name,[namerule]]]
      const checkName = item[0]
      if (formData[checkName] === undefined) continue
      for (const rule of item[1]) {
        const validatorKey = Object.keys(rule).filter(x => ['lengthControl', 'pattern', 'validator', 'required'].includes(x))[0]
        const res = this[validatorKey](formData[checkName], rule)
        if (!res) {
          console.log(checkName, 'checked failed in', validatorKey)
          errs[checkName] = rule.message
          break
        }
        if (typeof res === 'string') {
          console.log(checkName, 'checked failed in', validatorKey)
          errs[checkName] = res
          break
        }
      }
    }
    return errs
  }

  required (val) {
    return !(val === undefined || val === '')
  }

  lengthControl (val, rule) {
    let flag = true
    const dataLength = val.toString().length
    const [min, max] = rule.lengthControl
    if (min && dataLength < min) { flag = false }
    if (max && dataLength > max) { flag = false }
    return flag
  }

  max (val, rule) {
    return val.toString().length <= rule.max
  }

  pattern (val, rule) {
    const res = rule.pattern.test(val)
    return res
  }

  validator (val, rule) {
    try {
      return rule.validator.call(this, val)
    } catch (e) {
      return e.message
    }
  }
}