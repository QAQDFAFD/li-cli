const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const ora = require('ora')

const inquirer = require('inquirer')
const repoMap = require('../config/repoMap')
// 使用框架
const useFrame = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'frame',
            message: 'chose frame：',
            default: 0,
            choices: [
                { value: 0, name: '(no frame)' },
                { value: 1, name: 'Vue' },
                { value: 2, name: 'React' },
            ],
        },
    ])
}

// 使用語言
const useLang = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'lang',
            message: 'chose lang：',
            default: 1,
            choices: [
                { value: 1, name: 'JavaScript' },
                { value: 2, name: 'TypeScript' },
            ],
        },
    ])
}

const getResult = async () => {
    // 获取框架
    const frame = await useFrame()
    if (frame.frame !== 0) {
        // 获取语言
        const lang = await useLang()
        return `${frame.frame}${lang.lang}`
    } else {
        return `${frame.frame}2`
    }
}
const createProjectAction = async projectName => {
    const result = await getResult()
    console.log('result', result)
    console.log('repoMap', repoMap[result])
    const spinner = ora('Fetch...').start()
    await download(repoMap[result], projectName, { clone: true })
        .then(() => {
            spinner.succeed('success!')
            console.log(`- cd ${projectName}`)
            console.log('- npm install     -- to install dependencies')
            console.log('- npm start       -- to run the project')
            console.log('- npm run build   -- to build the project')
        })
        .catch(error => {
            spinner.fail('error!', error)
        })
}

module.exports = createProjectAction
