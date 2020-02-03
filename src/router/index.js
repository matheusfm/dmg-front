import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: () => import("@/components/Cattlemen.vue"), meta: { title: "Pecuaristas" } },
    { path: '/fornecedores', component: () => import("@/components/Suppliers.vue"), meta: { title: "Fornecedores" } },
    { path: '/novo/fornecedores', component: () => import("@/components/SupplierForm.vue"), meta: { title: "Novo Fornecedor" } },
    { path: '/fornecedores/:id', component: () => import("@/components/SupplierForm.vue"), meta: { title: "Fornecedor" } },
    { path: '/pecuaristas', component: () => import("@/components/Cattlemen.vue"), meta: { title: "Pecuaristas" } },
    { path: '/novo/pecuaristas', component: () => import("@/components/CattlemanForm.vue"), meta: { title: "Novo Pecuarista" } },
    { path: '/pecuaristas/:id', component: () => import("@/components/CattlemanForm.vue"), meta: { title: "Pecuarista" } },
    { path: '/movimentacoes', component: () => import("@/components/Events.vue"), meta: { title: "Movimentações" } },
    { path: '/login', component: () => import("@/components/Login.vue"), meta: { title: "Login" } },
    { path: '*', component: () => import("@/components/NotFound.vue"), meta: { title: "Página não encontrada" } },
]

const router = new VueRouter({ routes })
router.beforeEach((to, from, next) => {
    document.title = "DMG | " + to.meta.title
    next()
})
export default router