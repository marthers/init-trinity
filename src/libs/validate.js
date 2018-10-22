/*
 * @Description : validate
 * @Author      : zhangyg
 * @Date        : 2018-10-18 15: 35: 48
 * @LastEditTime: 2018-10-18 16: 38: 00
 * @LastEditors : your name
 */

// 校验手机号
export function validateMobilephone (phoneNumber) {
  if (!(/^1[34578]\d{9}$/.test(phoneNumber))) {
    return false
  } else {
    return true
  }
}
// 4位字母数字，图形验证码
export function validateGraphCode (code) {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4}$/
  if (reg.test(code)) {
    return true
  } else {
    return false
  }
}
// 8到16位数字与字母组合
/**
  * @msg: 校验密码
  * @param {type:srting}
  * @return: Boolean
  */
export function validatePassword (password) {
  var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  if (pwdReg.test(password)) {
    return true
  } else {
    return false
  }
}
/**
  * @msg: validate varification code for logging in Saas
  * @param {type:Number}
  * @return: Boolean
  */
export function validateVerificationCode (code) {
  let reg = /^\d{6}$/
  if (reg.test(code)) {
    return true
  } else {
    return false
  }
}
