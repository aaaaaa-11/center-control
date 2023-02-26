export const phoneReg = new RegExp(/^1[3-9][0-9]{9}$/)

export const phoneDeSensiReg = new RegExp(/^1[3-9][0-9][0-9\*]{4}[0-9]{4}$/)

// 6-20个字符，包含数字、字母(大写或小写)
export const pwReg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/)
// export const nameReg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/)
// 账户名1-20个字符，由数字和字母组成，为防中文乱码
export const nameReg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,20}$/)
// 验证码4-6位，数字组成
export const vcodeReg = new RegExp(/^[0-9]{4,6}$/)
