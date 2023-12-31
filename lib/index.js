#!/usr/bin/env node
import { Command } from 'commander'
const program = new Command()
program.version('0.0.10')
program.option('-d --dest <dest>', 'a destination path')
program
	.command('create') //命令名称
	.option('-n --name <projectName>', 'your project name~') //创建的项目名称
	.option('-js --javascript', 'create a javascript project~')
	.option('-ts --typescript', 'create a typescript project~')
	.option('-el --element', 'use element-plus for this project~')
	.option('-a --antd', 'use ant-design-vue for this project~')
	.description('create a new vue project~') //该命令的相关描述
	.action(async projectOpt => {
		//在终端输入`newvue create -n [name] -v2`该命令后会执行的操作
		//在这里我将相关action代码封装在core文件夹下，这里通过懒加载的方式引入
		const { createProject } = await import('./core/createProject.js')
		return createProject(projectOpt)
	})
program.parse()
