import * as path from 'path'

type optionsType = {
  dirPath?: string
  prefix?: string
  environment?: string
}

/**
 * 返回目录下所有文件的文件名(字符串数组形式)
 * @typedef {Object} options  参数选项
 * @param {string} options.dirPath  目录路径
 * @param {string} options.prefix  给每一个匹配项增加前缀文本
 * @return {string[]} 不传参数默认返回/config/env下所有文件拼接的数组
 */
export function getDirFilenames(options?: optionsType): string[] {
  const params = {
    environment: 'dev',
    prefix: 'config/env-common/',
    ...options,
  }

  const directoryArr = [path.resolve(process.cwd(), 'config/env-common')]

  let directory = ''

  if (params.environment === 'prod') {
    directory = path.resolve(
      process.cwd(),
      'config/env-prod/application-prod.env',
    )
  } else {
    directory = path.resolve(
      process.cwd(),
      'config/env-dev/application-dev.env',
    )
  }

  directoryArr.push(directory)

  return [...directoryArr]
}
