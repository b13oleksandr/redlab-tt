import Vue from 'vue';
import Vuex from 'vuex';

import data from '../data/data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    peopleList: [],
  },

  mutations: {
    setPepopleList(state, list) {
      state.peopleList = list;
    },
  },

  actions: {
    async fetchPeopleList({ commit }) {
      commit('setPepopleList', data);
    },
  },
});
