import fse from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const { copy, pathExistsSync } = fse
import { CWD } from '../config/index.js' // CWD当前工作路径
import { promptAction } from '../utils/actioncommon.js' // 存放action中的公共代码
import logger from '../utils/logger.js' // 指定控制台输出样式的相关代码
import figlet from 'figlet'
import download from 'download-git-repo'
import { createSpinner } from 'nanospinner'

export async function createProject(option) {
	const { name, langVersion, uiVersion } = await promptAction('Project', option, 'vue_app')

	// 指定创建的项目的路径，即当前命令行所在的路径加上你输入的项目名称
	const dir = path.resolve(CWD, name)

	const __filename = fileURLToPath(import.meta.url)
	const __dirname = dirname(__filename)

	if (pathExistsSync(dir)) {
		//判断需要创建的项目是否已经存在
		console.log(`${name} already exists~~`)
		return
	}

	//根据创建时选择的版本去拼接模板路径 -> 本地使用
	// const template = 'D:\\vue-cli\\template\\' + temp

	// 使用 figlet 绘制 Logo和提示信息
	figlet('li-vue', function (err, data) {
		if (err) {
			console.log('Something went wrong...')
			console.log(err)
			return
		}

		const spinner = createSpinner('开始下载...').start()

		// 1. 通过download-git-repo下载模板，即选择的 ts 或者 js 版本
		download(
			`direct:https://gitee.com/lijiajun999/vue-${langVersion}-base-template.git#${
				langVersion === 'javascript' ? 'main' : 'master'
			}`,
			name,
			{ clone: true },
			function (err) {
				if (err) {
					spinner.error({ text: '下载失败' + err })
				} else {
					new Promise((resolved, reject) => {
						// 2. 将下载的模版中的 package.json 和 vite.config.js 根据选择的 element 或者 antd 进行替换
						const packagePath = path.resolve(dir, 'package.json')
						// 使用 fsextra 的 copy 方法将 /lib/config/ui 中的 package.json 和 vite.config.js 复制到项目中
						// 分为 js 和 ts 两种情况
						// 2.1 js
						if (langVersion === 'javascript') {
							let viteConfigPath = path.resolve(dir, 'vite.config.js')
							copy(
								path.resolve(__dirname, '../config/ui/', uiVersion, 'js/package.json'),
								packagePath
							).then(() => {
								copy(
									path.resolve(__dirname, '../config/ui/', uiVersion, 'js/vite.config.js'),
									viteConfigPath
								).then(() => {
									resolved()
								})
							})
						} else {
							let viteConfigPath = path.resolve(dir, 'vite.config.ts')
							copy(
								path.resolve(__dirname, '../config/ui/', uiVersion, 'ts/package.json'),
								packagePath
							).then(() => {
								copy(
									path.resolve(__dirname, '../config/ui/', uiVersion, 'ts/vite.config.ts'),
									viteConfigPath
								).then(() => {
									resolved()
								})
							})
						}
					}).then(() => {
						spinner.success({ text: 'Application created successfully!' })
						spinner.success({
							text: '项目创建成功，请依次执行以下命令'
						})
						logger.warning('------------------')
						logger.info(`cd ${name}`)
						logger.info(`pnpm install`)
						logger.info(`pnpm dev`)
						logger.warning('------------------')
					})
				}
			}
		)
	})
}
