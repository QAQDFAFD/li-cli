const { actions } = require('../config/constants')
const program = require('commander')
const path = require('path')

const commands = () => {
    Reflect.ownKeys(actions).forEach(action => {
        program
            .command(action)
            .alias(actions[action].alias)
            .description(actions[action].description)
            .action(() => {
                if (action === '*') {
                    console.log(actions[action].description)
                } else {
                    require(path.resolve(__dirname, action))(...process.argv.slice(3))
                }
            })
    })
}

module.exports = commands
