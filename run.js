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
    wc   : 'wc',
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

var callArgs = '',
    callArgsList = [ 'l', 'm', 'w', 'c' ];

callArgsList.forEach(function (argument) {
  if (args[argument.toUpperCase()] == true) {
    callArgs += argument;
  }
});

callArgs = callArgs.length > 0 ? '-' + callArgs : '';

var results     = {},
    callbacks   = {};

for(var envName in testEnvs) {
  var env = testEnvs[envName];

  results[envName]   = [];
  callbacks[envName] = [];

  for(var i = 0; i < testFiles.length; i++) {
    callbacks[envName].push(async.apply(function(file, callback) {
      exec(env + ' ' + callArgs +' ' + testDir + '/' + file, function(error, stdout, stderr) {
        callback(error, stdout);
      });
    }, testFiles[i]));
  }
}
