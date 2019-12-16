const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    }, {
        path: '/login',
        meta: {
            title: 'login'
        },
        component: (resolve) => require(['./views/login/index'],resolve)
    }
];
export default routers;