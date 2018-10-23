/*
 * @Description : 正则校验工具
 * @Author      : zhangyg
 * @Date        : 2018-10-18 15: 35: 48
 * @LastEditTime: 2018-10-23 09: 50: 31
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
// 5位数字与字母组合图形验证码
/**
  * @msg: 校验5位数字与字母组合图形验证码
  * @param {type:srting}
  * @return: Boolean
  */
// export function validateCaptcha (password) {
//   var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6}$/
//   if (pwdReg.test(password)) {
//     return true
//   } else {
//     return false
//   }
// }

export function validateCaptcha(password) {//必须为字母加数字且长度不小于8位
   var str = password;
    if (str == null || str.length != 5) {
        return false;
    }
    var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
    if (!reg1.test(str)) {
      debugger
        return false;
    }
    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
    if (reg.test(str)) {
        return true;
    } else {
      debugger
        return false;
    }
}
