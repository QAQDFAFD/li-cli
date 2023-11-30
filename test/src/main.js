import { createApp } from 'vue'
import './styles/style.css'
import 'animate.css'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
// routes
import router from './routes/index'
// pinia
import { createPinia } from 'pinia'
// 全局组件
import globalComponent from './components'
// icon
import 'virtual:svg-icons-register'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
// app.use(ElementPlus)
app.use(globalComponent)
app.mount('#app')
