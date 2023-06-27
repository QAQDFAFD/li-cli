#!/usr/bin/env node

const program = require('commander')
const helpOptions = require('./lib/core/help')
const commands = require('./lib/core/commands')

const { version } = require('./lib/config/constants')
program.version(version, '-v,--version')
helpOptions()
commands()

program.parse(process.argv)
