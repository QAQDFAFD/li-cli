import fse from 'fs-extra'
import { resolve } from 'path'
import path from 'path'
const { copy, pathExistsSync } = fse
import { CWD } from '../config/index.js' //CWD当前工作路径，VUE_TEMPLATE是vue模版路径
import { promptAction } from '../utils/actioncommon.js' //存放action中的公共代码
import logger from '../utils/logger.js' //指定控制台输出样式的相关代码
export async function createProject(option) {
    //第一个参数用来判断创建的是'Project/Component/Page',第二个参数用来接收你输入的命令里面的相关参数，第三个参数用来指定创建的'Project/Component/Page'的默认名
    const { name, langVersion } = await promptAction('Project', option, 'vue_app')
    const dir = resolve(CWD, name)
    if (pathExistsSync(dir)) {
        //判断需要创建的项目是否已经存在
        console.log(`${name} already exists~~`)
        return
    }
    //根据创建时选择的版本去拼接模板路径
    const temp = langVersion == 'typescript' ? 'tsapp' : 'jsapp'
    const template = 'D:\\vue-cli\\template\\' + temp
    await copy(template, dir) //将项目模板复制到新建的项目目录下
    logger.success('✨ Application created successfully!')
    logger.info(`\
      cd ${name}
      npm install
      npm run dev
      `)
}
