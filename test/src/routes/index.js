import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        // 使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
        component: () => import('../views/home.vue')
    }
]
// 路由
const router = createRouter({
    history: createWebHistory(),
    routes
})
// 导出
export default router
