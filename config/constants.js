// 一些常量的配置
// version
const { version } = request('../../package.json')
// 配置需要的命令
const actions = {
    // 创建项目的命令  ->  li-cli create
    create: {
        alias: 'c',
        description: 'create a project',
        examples: ['li-cli create <project-name>'],
    },
    // 脚手架的介绍
    hello: {
        alias: 'hello',
        description: 'vue-cli bases on vue3',
        examples: ['li-cli hello'],
    },
    // 无法匹配的命令，目前除了 create 没有其他的命令
    '*': {
        alias: '',
        description: 'command not found',
        examples: [],
    },
}
// 抛出
module.exports = {
    version,
    actions,
}
