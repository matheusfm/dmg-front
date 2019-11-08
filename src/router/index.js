import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/fornecedores', component: () => import("@/components/Suppliers.vue") },
    { path: '/novo/fornecedores', component: () => import("@/components/SupplierForm.vue") },
    { path: '/fornecedores/:id', component: () => import("@/components/SupplierForm.vue") },
    { path: '/pecuaristas', component: () => import("@/components/Cattlemen.vue") },
    { path: '/novo/pecuaristas', component: () => import("@/components/CattlemanForm.vue") },
    { path: '/pecuaristas/:id', component: () => import("@/components/CattlemanForm.vue") },
    { path: '/movimentacoes', component: () => import("@/components/Events.vue") },
    { path: '*', component: () => import("@/components/NotFound.vue") },   
]

export default new VueRouter({ routes })