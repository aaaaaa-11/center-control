import md5 from 'js-md5'
export const formatIDNo = (num) => {
  if (!num) return ''
  const str = String(num)
  if (!str || str.length !== 18) {
    return '-'
  }
  return str.replace(/^(.{1})(.{16})(.{1})$/, '$1****************$3')
}
export const formatMobile = (num) => {
  if (!num) return ''
  const str = String(num)
  return str.replace(/^(.{3})(.{4})(.{4})$/, '$1****$3')
}
export const formatName = (name) => {
  if (!name) return ''
  const str = String(name)
  return str.replace(/^(.{1})(.*)$/, '*$2')
}
export const formatPw = (pw: string) => {
  if (!pw) return ''
  return md5(pw)
}
