import * as fs from 'fs';
import * as path from 'path';


type optionsType = {
  dirPath?: string;
  prefix?: string;
  environment?:string
};

/**
 * 返回目录下所有文件的文件名(字符串数组形式)
 * @typedef {Object} options  参数选项
 * @param {string} options.dirPath  目录路径
 * @param {string} options.prefix  给每一个匹配项增加前缀文本
 * @return {string[]} 不传参数默认返回/config/env下所有文件拼接的数组
 */
export function getDirFilenames(options?: optionsType): string[] {

  const params = { environment:'dev',prefix: 'config/env-common/', ...options };

  const results = [];
  const directoryArr = [path.resolve(process.cwd(), 'config/env-common')]

  if(params.environment==='prod'){
    const directory = path.resolve(process.cwd(), 'config/env-prod');
    directoryArr.push(directory)
  }else{
    const directory = path.resolve(process.cwd(), 'config/env-dev');
    directoryArr.push(directory)
  }

  try {

    directoryArr.forEach((dirPathItem)=>{
      for (const dirContent of fs.readdirSync(dirPathItem)) {
        const dirContentPath = path.resolve(dirPathItem, dirContent);
        if (fs.statSync(dirContentPath).isFile()) {
          if (dirContent.endsWith('.env')) {
            if (params.prefix) {
              //计算前缀start
              if(dirContent==='.env'){
                results.push(`${params.prefix}${dirContent}`);
              }else{
                if(params.environment==='prod'){
                  results.push(`config/env-prod/${dirContent}`);
                }else{
                  results.push(`config/env-dev/${dirContent}`);
                }
              }
              //计算前缀end
            } else {
              results.push(dirContent);
            }
          }
        }
      }
    })

    return results;

  } catch (error) {
    return results;
  }
}