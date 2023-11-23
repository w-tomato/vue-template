import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
// 后台使用了jwt，加入了用于刷新token的freshToken
const freshTokenKey = 'vue_admin_template_fresh_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getFreshToken() {
  return Cookies.get(freshTokenKey)
}

export function setFreshToken(token) {
  return Cookies.set(freshTokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey) && Cookies.remove(freshTokenKey)
}
