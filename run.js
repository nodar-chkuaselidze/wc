var fs = require('fs'),
    exec = require('child_process').exec,
    args = require('commander'),
    package = require('./package.json');

args
  .version(package.version)
  .option('-l', 'print lines count')
  .option('-w', 'print words count')
  .option('-m', 'print bytes count')
  .option('-c', 'print characters count')
  .option('--program <string>', 'select concrete program to test')
  .option('--list', 'show list of programs')
  .parse(process.argv);

var name = 'wc',
  testEnvs  = {
    jaba : 'node wc.js',
    //jani : './wc',
    //nodo : './wc'
  },
  env = null
  testFiles = fs.readdirSync('tests');

if(args.list) {
  console.log('  Avaliable programs:');
  for(var env in testEnvs) {
    console.log('    ' + env);
  }
  process.exit();
}

if (args.program && (env = testEnvs[args.program]) == null) {
  console.log('\n  Program "' + args.program + '" not found');
  args.help();
}

