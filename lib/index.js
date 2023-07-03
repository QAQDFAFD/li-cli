#!/usr/bin/env node
import { Command } from 'commander'
const program = new Command()
program.version('0.0.8')
program.option('-d --dest <dest>', 'a destination path')
program
    .command('create') //命令名称
    .option('-n --name <projectName>', 'your project name~') //创建的项目名称
    .option('-js --javascript', 'create a javascript project~') //指定项目为vue2
    .option('-ts --typescript', 'create a typescript project~') //指定项目为vue3
    .description('create a new vue project~') //该命令的相关描述
    .action(async projectOpt => {
        //在终端输入`newvue create -n [name] -v2`该命令后会执行的操作
        //在这里我将相关action代码封装在core文件夹下，这里通过懒加载的方式引入
        const { createProject } = await import('./core/createProject.js')
        return createProject(projectOpt)
    })
program.parse()
