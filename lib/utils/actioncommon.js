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
					default: `${defaultName}`
				}
		  ])
	// 如若已指定直接将模板复制到dir目录下，否则通过prompt引导用户选择所需模板
	const isSelectVersion = option.javascript ? 'javascript' : option.typescript ? 'typescript' : false
	const { langVersion } = isSelectVersion
		? { langVersion: isSelectVersion }
		: await prompt([
				{
					type: 'list',
					name: 'langVersion',
					message: 'Select the version of your project: ',
					choices: ['javascript', 'typescript']
				}
		  ])

	// 选择组件库的类型 antd 或者 element
	const isSelectUI = option.element ? 'element' : option.antd ? 'antd' : false
	const { uiVersion } = isSelectUI
		? { uiVersion: isSelectUI }
		: await prompt([
				{
					type: 'list',
					name: 'uiVersion',
					message: 'Select the UI of your project: ',
					choices: ['element', 'antd']
				}
		  ])
	return { name, langVersion, uiVersion }
}
