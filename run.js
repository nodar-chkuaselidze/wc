var fs = require('fs'),
    exec = require('child_process').exec,
    args = require('commander'),
    async = require('async'),
    package = require('./package.json'),
    clc = require('cli-color');

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

if (args.list) {
  console.log('  Avaliable programs:');
  for (var env in testEnvs) {
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

var results      = {},
    callbacks    = {};
    parallelJobs = [];

for (var envName in testEnvs) {
  results[envName]   = [];
  callbacks[envName] = [];

  for (var i = 0; i < testFiles.length; i++) {
    callbacks[envName].push(async.apply(function(file, envName, callback) {
      var command = 'cd ' + envName + '; ' + testEnvs[envName] + ' ' + callArgs +' ../' + testDir + '/' + file + ';cd ..;';
      exec(command, function (error, stdout, stderr) {
        if (error) {
          callback({ error : error, command : command });
          return;
        }

        callback(null, stdout);
      });
    }, testFiles[i], envName));
  }

  parallelJobs.push(async.apply(function(env, callback) {
    async.parallel(callbacks[env], function(err, results) {
      if (err) {
        callback({ env : env, err : err });
        return;
      }

      callback(null, { env : env, results : results });
    });
  }, envName));
}

async.parallel(parallelJobs, function(err, _results) {
  if (err) {
    throw err;
  }

  results = {};
  _results.forEach(function(result) { 
    results[result.env] = result.results;
  });
  
  var wc = results.wc;
  
  delete results.wc;

  console.log('');
  for (var env in results) {
    var env_res = results[env],
        fail    = false;

    for (var i = 0; i < wc.length; i++) {
      if (wc[i] != env_res[i]) {
        console.log('< wc\n' + wc[i] + '----------\n' + clc.red(env_res[i] + '> Env: ' + env + '\n'));
        fail = true;
      }
    }

    if (fail) {
      console.log('  ' + clc.red(env + ' Failed tests') + '\n');
    } else {
      console.log('  ' + clc.green(env + ' work is brilliant'.toUpperCase()) + '\n');
    }
  }
});
