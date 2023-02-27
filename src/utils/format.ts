import md5 from 'js-md5'
export const formatIDNo = (str:string) => {
  if (!str || str.length !== 18) {
    return '-'
  }
  return str.replace(/^(.{1})(.{16})(.{1})$/, '$1****************$3')
}
export const formatMobile = (str:string) => {
  if (!str) return ''
  return str.replace(/^(.{3})(.{4})(.{4})$/, '$1****$3')
}
export const formatName = (name:string) => {
  if (!name) return ''
  return name.replace(/^(.{1})(.*)$/, '*$2')
}
export const formatPw = (pw: string) => {
  if (!pw) return ''
  return md5(pw)
}
