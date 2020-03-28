import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//Todo state persist
const Store = {
    state:{
        theme:window.localStorage.getItem('theme')||'blue',
        //["green", "orange", "blue",'red','grey']
        themeData: {
            "green":"#67C23A",
            "orange":"#ffde03",
            "blue":"#409EFF",
            "red":"#ff0266",
            "gray":"#909399",
            "qing":"#03dac6",
            "purple":"#6200ee",
        },
        uploadUrl:'https://jsonplaceholder.typicode.com/posts/',

        isLogin:!!window.localStorage.getItem('isLogin'), //测试登录

        secretKey:'secretKey',
    },
    getters:{},
    mutations:{
        setTheme(state,payload){
            state.theme = payload;
            document.body.setAttribute('data-theme',payload);
            window.localStorage.setItem('theme',payload);
        },
        setLogin(state,payload){
            state.isLogin = !!payload;
            window.localStorage.setItem('isLogin',!!payload);
        }
    },
    actions:{}
}
const store = new Vuex.Store(Store)
export default store;