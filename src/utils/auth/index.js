import local from "../cache/local"

export function getAuthToken () {
  return getAuthCache('TOKEN_')
}
export function getAuthRToken () {
  return getAuthCache('RTOKEN_')
}
export function setAuthToken (value) {
  return setAuthCache('TOKEN_', value, import.meta.env.VITE_TOKEN_TIME)
}
export function setAuthRToken (value) {
  return setAuthCache('RTOKEN_', value, import.meta.env.VITE_RTOKEN_TIME)
}

export function getAuthCache (key) {
  return local.get(key)
}

export function setAuthCache (key, value, expire = null) {
  return local.set(key, value, expire)
}

export function clearAuthCache () {
  return local.clear()
}
