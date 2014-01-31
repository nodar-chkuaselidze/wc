var fs = require('fs'),
    sprintf = require('sprintf'),
    async = require('async'),
    program = require('commander');

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .option('-c, --bytes', 'Add bytes')
  .option('-m, --chars', 'Add chars')
  .option('-l, --lines', 'Add lines')
  .option('-w, --words', 'Add words')
  .parse(process.argv);

/////////////////////////////////////

var files = program.args;
var tasks = {};

var all = !program.lines && !program.words && !program.bytes;

files.forEach(function (file) {
  tasks[file] = async.apply(fs.readFile, file, 'utf8');
});

async.parallel(tasks, function (err, results) {
  for (var file in results) {
    //process.stdout.write(sprintf('%8d', cline(results[file])));

    if (program.lines || all) {
      process.stdout.write(sprintf('%4d', cline(results[file])));
    }

    if (program.words || all) {
      process.stdout.write(sprintf('%5d', cword(results[file])));
    }

    // if (program.chars) {
    //   process.stdout.write(results[file].length + ' ');
    // }

    if (program.bytes || all) {
      process.stdout.write(sprintf('%5d', bytes(results[file])));
    }

    process.stdout.write(sprintf('%19s', file + '\n'));
  }
});
/////////////////////////////////////////////////////

function cword(word) {
  var count = 0,
      words = word.split(/\s/g);

  for (i = 0; i < words.length; i++) {
    if (words[i] != '') {
      count += 1;
    }
  }

  return count;
}

function cline(line) {
  return line.split('\n').length - 1;
}

function bytes(b) {
  var countB = 0;

  for (var n = 0; n < b.length; n++) {
    var c = b.charCodeAt(n);
    if (c < 128) {
      countB++;
    } else if (c > 127 && c < 2048) {
      countB = countB + 2;
    } else {
      countB = countB + 3;
    }
  }
  return countB;
}
