const fs = require('fs');

const compactionCode = function (s) {
  s = s.replace(/\s*\;\s*/g, ';');
  s = s.replace(/\s*\=\s*/g, '=');
  s = s.replace(/\s*\(\s*/g, '(');
  s = s.replace(/\s*\)\s*/g, ')');
  s = s.replace(/\s*\{\s*/g, '{');
  s = s.replace(/\s*\}\s*/g, '}');
  s = s.replace(/\s*\,\s*/g, ',');
  s = s.replace(/\s+/g, ' ');

  s = s.replace(/^\s*/g, '');
  s = s.replace(/\s*$/g, '');
  return s;
};

const script = fs.readFileSync('./puyo.js', 'utf8');

const bookmarklet = 'javascript:' + encodeURIComponent(compactionCode(script));

console.log(bookmarklet);
