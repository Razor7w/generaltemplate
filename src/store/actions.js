// https://vuex.vuejs.org/en/actions.html

export default {
  changeModals ({ commit }, payload) {
    commit('setModal', payload)
  }
}
