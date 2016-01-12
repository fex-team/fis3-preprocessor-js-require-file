fis3-preprocessor-js-require-file
===============
支持 js 中直接 require 文件. (es6 的 import 也支持，但是先通过 es6 => es5 的转换。)


只能在 fis3 中使用。

如果想 require css, 请使用 [fis3-preprocessor-js-require-css](https://github.com/fex-team/fis3-preprocessor-js-require-css)，可以一起使用。

```
npm install -g fis3-preprocessor-js-require-file
```

使用方式配置如下：

```js
fis.match('*.{js,es,es6,jsx,ts,tsx}', {
  preprocessor: fis.plugin('js-require-file')
})
```


## 参数说明

`useEmbedWhenSizeLessThan`: 默认 20K。即：当目标文件的体积小于 20k 时，自动用 base64 引入。
大于 20K 时，用目标文件的 url. 如果不想启用此功能，请设置为 0 或者 null, false 都可以。
