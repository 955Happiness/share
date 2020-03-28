
const newRoutes = {
    path:'/new',
    component:() => import('@/views/new/index.vue'),
    children:[
        { 
            path:'',
            component:() => import('@/views/new/standard.vue')
        },
        { 
            path:'history',
            component:() => import('@/views/new/history.vue'),
            meta:{
                //auth:'',
            }
        },
        { 
            path:'report',
            component:() => import('@/views/new/report.vue')
        },
        { 
            path:'upload',
            component:() => import('@/views/new/upload.vue')
        }
    ]
}

export default newRoutes;