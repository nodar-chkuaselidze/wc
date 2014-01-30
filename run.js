var fs = require('fs'),
    exec = require('child_process').exec,
    args = require('commander'),
    async = require('async'),
    package = require('./package.json');

args
  .version(package.version)
  .option('-l', 'print lines count')
  .option('-w', 'print words count')
  .option('-m', 'print bytes count')
  .option('-c', 'print characters count')
  .option('--program <string>', 'select concrete program to test')
  .option('--list', 'show list of programs')
  //.option('--level <string>', 'level of test (more deeper and harder)')
  .parse(process.argv);

var name = 'wc',
  testEnvs  = {
    jaba : 'node wc.js',
    //jani : './wc',
    //nodo : './wc'
  },
  env = null
  testDir   = './tests',
  testFiles = fs.readdirSync(testDir);

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

var wcResults   = {},
    wcCallbacks = [],
    results     = {},
    callbacks   = {};

for(var i = 0; i < testFiles.length; i++) {
  wcCallbacks[i] = async.apply(function(file, callback) {
    exec('wc ' + testDir + '/' + file, function(error, stdout, stderr) {
      callback(error, stdout);
    });
  }, testFiles[i]);
}

async.parallel(wcCallbacks, function(err, results) {
  wcResults = results;
  console.log(wcResults);
});

