import Vue from 'vue'
import VueRouter from 'vue-router'
import { AES } from 'crypto-js'
import store from '@/store/'

import loginDialog from '@/components/loginDialog';

Vue.use(VueRouter)

//import { Notification, MessageBox } from 'element-ui';

let modules = [];
let jsReg = /\.\/(.*)\.js$/;

const context = require.context('./', false, /(.*)\.js$/);

context.keys().forEach(item => {
        const match = item.match(jsReg);
        const moduleFile = match[0];
        const name = match[1];
        
        
        if(!name || (name == 'index')){
            return false;
        }
        modules.push(context(moduleFile).default)
        // modules.push(...context(moduleFile).default.map(route => {
        //     return {
        //         ...route,
        //         path:`/${name}/${route.path}`
        //     }
        // }))
})
const constRoutes = [
    {
        path:'/',
        component:() => import('@/views/checkStandard.vue')
    },
    {
        path:'/unAuth',
        component:() => import('@/views/unAuth.vue')
    },
    {
        path:'*',
        name:'Error',
        component:() => import('@/views/Error.vue')
    },
];    
const routes = [
    ...constRoutes,
    ...modules,
];
const router = new VueRouter({
    routes:routes
})
//guard
router.beforeEach(async function(to, from, next){
    let publicResources = [ '/' ];
    if(
        (publicResources.indexOf(to.path) !== -1)
        ||
        (to.name == 'Error')
    ){
        next()
        return false;
    }
    if(store.state.isLogin){
        //未授权页面
        let { meta } = to;
        //Todo  权限认证
        if(('auth' in meta)&&!meta.auth){
            let {
                name ,meta = {}, path, hash, query, params
            } = from;
            from = AES.encrypt(
                JSON.stringify({name,meta,path,hash,query,params}),
                store.state.secretKey
                );
            next({ path:'/unAuth',query:{ from }});
        }else{
            next();
        }
    }else{
        const LoginConstructor = Vue.extend(loginDialog);
        let loginComponent = new LoginConstructor();
        loginComponent.$store = store;
        loginComponent.visible = true;
        loginComponent.$on('refresh',function(){
            loginComponent.$destroy()
            next()
        })
        loginComponent.$on('cancel',function(){
            loginComponent.$destroy()
        })
        loginComponent.$mount(document.getElementById('#mount-point'))
    }
})
export default router;