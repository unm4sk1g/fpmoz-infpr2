import Api from "../../services/Api";

const state = {
    games: [],
    deals: [],
};

const getters = {
    deals(state) {
        return state.deals;
    }
};

const actions = {
    getDeals({commit}, params) {
        return new Promise((resolve, reject) => {
            this.dispatch('common/setLoading', true);
            Api.getDeals(params).then(response => {
                commit('SET_DEALS', response.data);
                this.dispatch('common/addAlert', {
                    type: 'success',
                    message: `Games fetched successfully`
                }, {root: true});
                resolve(response);
            }).catch(err => {
                this.dispatch('common/addAlert', {
                    type: 'error',
                    message: `Greška: ${err.response.data}`
                }, {root: true});
                reject(err.response.data);
            }).finally(() => {
                this.dispatch('common/setLoading', false);
            })
        })
    },
}

const mutations = {
    SET_DEALS(state, deals) {
        state.deals = deals;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
