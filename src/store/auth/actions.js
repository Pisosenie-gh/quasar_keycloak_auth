import { api } from 'boot/axios'

export const doLogin = async ({ commit, dispatch }, payload) => {
  await api.post('http://localhost:8080/backend/api/realms/Test/protocol/openid-connect/token ', payload).then(response => {
    const token = response.data
    commit('setToken', token)
    api.defaults.headers.common.Authorization = 'Bearer ' + token.access_token
    dispatch('getMe', token)
  })
}

export const signOut = ({ commit }) => {
  api.defaults.headers.common.Authorization = ''
  commit('removeToken')
}

export const getMe = async ({ commit }, token) => {
  await api.get('http://localhost:8080/backend/api/realms/Test/protocol/openid-connect/userinfo', token.access_token).then(response => {
    commit('setMe', response.data)
  })
}

export const init = async ({ commit, dispatch }) => {
  const token = localStorage.getItem('token')
  if (token) {
    await commit('setToken', JSON.parse(token))
    api.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse(token).access_token
    dispatch('getMe', JSON.parse(token))
  } else {
    commit('removeToken')
  }
}
