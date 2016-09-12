var lang = fis.compile.lang;
var fs = require('fs');
var rRequire = /"(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|(\/\/[^\r\n\f]+|\/\*[\s\S]+?(?:\*\/|$))|\brequire\s*\(\s*('|")(.+?)\2\s*\)/g;

module.exports = function(content, file, options) {
  var mode = options.mode;

  return content.replace(rRequire, function(m, comment, quote, value) {
    if (!value)return m;

    var info = fis.project.lookup(value, file);
    var target = info.file;

    // 不处理 js 和 css 文件。
    // 其他插件会处理这块。
    if (!target || target.isJsLike || target.isCssLike) {
      return m;
    }

    var type = "uri";

    if (target.isJsonLike && options.embedJson) {
      type = "embed";
    } else if (options.useEmbedWhenSizeLessThan) {
      var size = fs.statSync(target.realpath).size;

      if (size < options.useEmbedWhenSizeLessThan) {
        type = "embed";
      }
    }

    m = quote + lang[type].wrap(value) + quote;
    return m;
  })
};


module.exports.defaultOptions = {
  embedJson: true,

  // 当文件小于 20k 的时候，使用内嵌的方式。
  useEmbedWhenSizeLessThan: 20 * 1024
}
