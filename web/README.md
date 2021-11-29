### 创建
```
npx create-react-app my-app
cd my-app
npm start
```
### router
```
yarn add react-router
yarn add react-router-dom
```
### build 资源修改相对路径
```
package.json

"homepage": ".",
```
### fower 样式工具库
```
yarn add @fower/react
```

### yarn 添加 对应types/script
```
npm install XXXX --save-dev 或则 yarn add XXXX --dev
npm install XXXX --save 或则 yarn add XXXX
npm uninstall XXXX --save 或则 yarn remove XXXX
实例：
yarn add @types/react-router-dom --dev
yarn add @types/react@^17.0.2 --dev
yarn add @types/js-cookie --dev
yarn remove @types/react
```

### 适配
```
rem 单位如何转换为像素值
当使用 rem 单位，他们转化为像素大小取决于页根元素的字体大小，即 html 元素的字体大小。 根元素字体大小乘以你 rem 值。 

例如，根元素的字体大小 16px，10rem 将等同于 160px，即 10 x 16 = 160。
4rem<---> 64px

14: 10rem -->140px
    <----->64
100: 8.5rem <---->850px
```
```
npm i lib-flexible --save
npm i postcss-px2rem --save
npm run eject

1.修改配置文件
config\webpack.config.js
引入模块 : const px2rem = require('postcss-px2rem')
添加配置 : 
px2rem({ remUnit: 37.5 }) 的意思就是1rem = 37.5px 这个是根据375px设计稿来的


2.在 入口文件 index.js 里引入 lib-flexible
import 'lib-flexible'
 
3.在  public/index.html
<!--<meta name="viewport" content="width=device-width, initial-scale=1" />-->
```
```js
module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  //省略
  ...
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      ...
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            px2rem({ remUnit: 37.5 }),  //  添加的代码
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        },
      },
    ].filter(Boolean);
    //省略
    ...
};
```