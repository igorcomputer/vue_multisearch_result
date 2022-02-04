import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let urlApi = 'https://api.multisearch.io/';

let paramsApi = {
    id: 11773,
    uid: "cc441f080",
    is_params: true,
    fields: true,
    limit: 24,
    categories: 0,
    filters: {},
    offset: 0
}

let store = new Vuex.Store({
    state: {

        is_start: false,
        // RESULT
        products: [],    // result items
        categories: [],  // result categories
        total: 0,        // result total
        filters: [],     // request filters
        query: "",

        // PARAMS
        param_categories: [],
        param_filters: [],  // price":{ "from":"100000","to":"480000"}
        param_offset: 0,
        stop_price_range: false,
        sidebar_open: false   // for mobile

    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, data) => {
            state.products   = data.results.items ?? [];
            state.categories = data.results.categories ?? [];
            state.filters    = data.results.filters ?? [];
            state.total      = data.total ?? 0;
            state.query      = data.query ?? "";
        },
        SET_PARAM_FILTERS: (state, filters) => {
            state.param_filters = filters ?? {}
        },
        SET_PARAM_CATEGORIES: (state, t) => {
            state.param_categories = t ?? []
        },
        SET_PARAM_OFFSET: (state, offset) => {
            state.param_offset = offset ?? 0
        },
        SET_STOP_PRICE_RANGE: (state, stop_price_range) => {
            if(stop_price_range) {
                state.stop_price_range = true;
            } else {
                state.stop_price_range = false;
            }
        },
        SET_START: (state, start) => {
            state.is_start = start;
        }
    },
    actions: {
        GET_PRODUCTS_FROM_API({commit}, objData){
            return axios(urlApi, {
                method: "GET",
                params: {...paramsApi, ...objData}
                // start load
            }).then((res) => {
                // SAFE RESULTS
                commit('SET_PRODUCTS_TO_STATE', res.data);

                // SAFE PARAMS
                commit('SET_PARAM_FILTERS', objData.filters);
                commit('SET_PARAM_CATEGORIES', objData.t);
                commit('SET_PARAM_OFFSET', objData.offset);
                commit('SET_STOP_PRICE_RANGE', objData.stop_price_range);

                setTimeout(() => {
                    commit('SET_START', true);
                }, 500)

                return res;
            }).catch((error) => {
                console.log("Error from store.js: ", error)
                return error;
            })
        }
    },
    getters: {
        QUERY(state) {
            return state.query;
        },
        PRODUCTS(state) {
            return state.products;
        },
        TOTAL(state) {
            return state.total;
        },
        CATEGORIES(state) {
            return state.categories;
        },
        FILTERS(state) {
            return state.filters;
        },
        PARAM_CATEGORIES(state){
            return state.param_categories;
        },
        PARAM_FILTERS(state) {
            return state.param_filters;
        },
        PARAM_OFFSET(state) {
            return state.param_offset;
        },
        STOP_PRICE_RANGE(state) {
            return state.stop_price_range;
        }

    }
});

export default store;

