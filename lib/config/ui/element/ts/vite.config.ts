/* eslint-disable */
// @ts-nocheck
import { ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
	return {
		plugins: [
			vue(),
			viteMockServe({
				mockPath: 'mock',
				enable: true
			}),
			AutoImport({
				imports: ['vue', 'vue-router', 'pinia'],
				dts: './auto-imports.d.ts',
				resolvers: [ElementPlusResolver()],
				eslintrc: {
					enabled: true,
					filepath: './.eslintrc-auto-import.json',
					globalsPropValue: true
				}
			}),
			Components({
				dts: false,
				resolvers: [ElementPlusResolver()]
			}),
			createSvgIconsPlugin({
				// 图标的路径位置
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				symbolId: 'icon-[dir]-[name]'
			}),
			UnoCSS({
				configFile: 'uno.config.ts'
			}),
			// 打包后的可视化分析
			visualizer({ open: true })
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "./src/styles/global.scss";`,
					javascriptEnabled: true
				}
			}
		},
		// 资源打包路径-方便后期的资源管理
		build: {
			rollupOptions: {
				output: {
					chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
					entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
					assetFileNames: '[ext]/[name]-[hash].[ext]' // 资源文件像 字体，图片等
				}
			},
			minify: 'esbuild',
			esbuildOptions: {
				// 在这里设置 esbuild 压缩选项
				target: 'es2015' // 指定目标浏览器版本
			},
			outDir: 'dist',
			emptyOutDir: true
		},
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
		}
	}
}
