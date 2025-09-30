export default {
    namespaced: true,
    state: () => ({
        loading: false
    }),
    mutations: {
        start(state) {
            state.loading = true;
        },
        finish(state) {
            state.loading = false;
        }
    },
    getters: {
        isLoading: (state) => state.loading
    }
};
