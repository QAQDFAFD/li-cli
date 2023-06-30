//这个文件存放一些公共的配置信息
import { resolve } from 'path'
export const CWD = process.cwd()
export const VUE_TEMPLATE = resolve(CWD, 'lib', 'template')
