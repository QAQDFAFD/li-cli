// 对外暴露插件对象
import SvgIcon from './SvgIcon.vue'

const allGlobalComponents = [SvgIcon]

export default {
    install(app) {
        allGlobalComponents.forEach(component => {
            app.component(component.__name, component)
        })
    }
}
