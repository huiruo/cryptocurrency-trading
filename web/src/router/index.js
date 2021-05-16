import { createRouter,createWebHashHistory} from 'vue-router'
// import index from '../views/index'
// import account from '../views/account'
const index =()=>import('../views/index')
const account =()=>import('../views/account')

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/account',
    name: 'account',
    component: account
  },
]

export const router = createRouter({
    // 采用hash 模式
    history: createWebHashHistory(),
    // 采用 history 模式
    // history: createWebHistory(),
  routes: routes
})
