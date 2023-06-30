import inquirer from 'inquirer'
const { prompt } = inquirer
import { resolve } from 'path'
import fse from 'fs-extra'
import { CWD } from '../config/index.js'
const { pathExistsSync, createFileSync, writeFileSync } = fse
import ejs from 'ejs'
// 由于后续添加的功能都会考虑到使用prompt来与用户进行互动，所以将此方法抽取成一个公共的函数，使用时直接引入即可
export const promptAction = async (createType, option, defaultName) => {
    //命令行输入的-n表示创建的项目名，如若未指定，通过prompt引导用户输入项目名称
    const { name } = option.name
        ? option
        : await prompt([
              {
                  type: 'input',
                  name: 'name',
                  message: `Your Vue ${createType} Name: `,
                  default: `${defaultName}`,
              },
          ])
    //命令行输入的-v2/-v3代表vue2/vue3项目，如若已指定直接将模板复制到dir目录下，否则通过prompt引导用户选择所需模板
    const isSelectVersion = option.javascript ? 'javascript' : option.typescript ? 'typescript' : false
    const { langVersion } = isSelectVersion
        ? { langVersion: isSelectVersion }
        : await prompt([
              {
                  type: 'list',
                  name: 'langVersion',
                  message: 'Select the version of your project: ',
                  choices: ['javascript', 'typescript'],
              },
          ])
    return { name, langVersion }
}
// 下面两个方法是作者在开发后续功能时需要用到，解析对应的组件或页面模板引擎文件到指定的文件夹下，与create这个命令无关
export const handleEsjToFile = async (name, dest, templatePath, filename) => {
    const result = await esjComplier(name, templatePath)
    const componentPath = resolve(CWD, `${dest}/${filename}`)
    // 判断创建的文件是否已经存在
    if (pathExistsSync(componentPath)) {
        console.log(`${name} already exists~~`)
        return
    }
    createFileSync(componentPath)
    writeFileSync(componentPath, result)
}
// 解析模板，根据传入的data将对应的属性值渲染到ejs模板引擎中
export const esjComplier = async (name, templatePath) => {
    const result = await ejs.renderFile(templatePath, {
        data: {
            name,
            lowerName: `${name.toLowerCase()}`,
        },
    })
    return result
}
