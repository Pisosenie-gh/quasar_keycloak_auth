export const setToken = (state, token) => {
  state.token = token
  state.isAuthenticated = true
  window.localStorage.setItem('token', JSON.stringify(token))
}

export const removeToken = (state, token) => {
  localStorage.setItem('token', '')
  state.isAuthenticated = false
}

export const setMe = (state, me) => {
  state.me = me
}
