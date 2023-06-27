const program = require('commander')
const { actions } = require('../config/constants')

const helpOptions = () => {
    program.on('--help', () => {
        console.log('\nExamples')
        Reflect.ownKeys(actions).forEach(action => {
            actions[action].examples.forEach(example => {
                console.log(example)
            })
        })
    })
}

module.exports = helpOptions
