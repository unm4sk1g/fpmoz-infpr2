import { v4 as uuidv4 } from 'uuid';

const state = {
    loading: false,
    alerts: [],

};

const getters = {
    loading(state) {
        return state.loading;
    },
    alerts(state) {
        return state.alerts
    }
};

const mutations = {
    SET_LOADING(state, value) {
        state.loading = value;
    },
    ADD_ALERT(state, payload) {
        state.alerts.unshift(payload);
    },
    REMOVE_ALERT(state, i) {
        state.alerts.splice(i, 1)
    }
};

const actions = {
    setLoading({commit}, value) {
        commit('SET_LOADING', value);
    },
    addAlert({commit}, data) {
        data.uuid = uuidv4();
        commit('ADD_ALERT', data);
    },
    removeAlert({commit}, uuid) {
        let alertIndex = state.alerts.findIndex((alert) => alert.uuid === uuid)
        commit('REMOVE_ALERT', alertIndex)
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
