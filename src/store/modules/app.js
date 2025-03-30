const state = {
  isLightMode: false
}

const mutations = {
  SET_LIGHT_MODE: (state, isLight) => {
    state.isLightMode = isLight
  }
}

const actions = {
  toggleLightMode({ commit }, isLight) {
    commit('SET_LIGHT_MODE', isLight)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}