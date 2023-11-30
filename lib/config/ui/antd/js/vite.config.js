import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue', 'vue-router', 'pinia'],
			dts: false,
			resolvers: [],
			eslintrc: {
				enabled: true,
				filepath: './.eslintrc-auto-import.json',
				globalsPropValue: true
			}
		}),
		Components({
			dts: false,
			resolvers: [
				AntDesignVueResolver({
					importStyle: false
				})
			]
		}),
		createSvgIconsPlugin({
			// 图标的路径位置
			iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
			symbolId: 'icon-[dir]-[name]'
		}),
		viteMockServe({
			mockPath: 'mock',
			enable: true
		})
	],
	server: {
		host: '0.0.0.0',
		proxy: {
			// 代理标识
			'/api': {
				// 实际请求地址
				target: 'http://xxxx:xxxx:3007/api',
				// 开启跨域
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '') // 不可以省略rewrite
			}
		}
	},
	resolve: {
		// 配置路径别名
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
})
