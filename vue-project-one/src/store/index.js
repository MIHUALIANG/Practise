import { createStore } from 'vuex';

export default createStore({
  state: {
    tableData: []
  },
  getters: {
    getTableData: (state) => state.tableData
  },
  mutations: {
    ADD_TABLE_DATA(state, payload) {
      state.tableData.push(payload);
    },
    CLEAR_TABLE_DATA(state) {
      state.tableData = [];
    }
  },
  actions: {
    addTableData({ commit }, data) {
      commit('ADD_TABLE_DATA', data);
    },
    clearTableData({ commit }) {
      commit('CLEAR_TABLE_DATA');
    }
  },
  modules: {}
});
