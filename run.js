var fs = require('fs');

var name = 'wc',
  testEnvs  = {
    jaba : 'node wc.js',
    //jani : './wc',
    //nodo : './wc'
  },
  testFiles = fs.readdirSync('tests');

for(var i = 0; i < testFiles.length; i++) {
  console.log(testFiles[i]);
}
