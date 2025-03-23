import { defineStore } from 'pinia'

export const useCovidStore = defineStore('covid', {
    state: () => ({
        data: [],
    }),
    actions: {
        async fetchCovidData({ commit }) {}
    }
})