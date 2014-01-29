var fs = require('fs'),
    program = require('commander');

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .option('-c, --bytes', 'Add bytes')
  .option('-m, --chars', 'Add chars')
  .option('-l, --lines', 'Add lines')
  .option('-w, --words', 'Add words')
  .parse(process.argv);

fs.readFile(program.args[0], 'utf8', function (err, data) {
  if (err) {
    console.log(err);
  }
  if (program.lines) process.stdout.write(cline(data) +' ');
  if (program.words) process.stdout.write(cword(data) +' ');
  if (program.chars) process.stdout.write(data.length +' ');
  if (program.bytes) process.stdout.write(bytes(data) +' ');
  console.log(program.args[0]);

});

function cword(w) {
  var count = 0,
    words = w.split(/\s/g);

  //console.log(words);

  for (i = 0; i < words.length; i++) {
    if (words[i] != '') {
      count += 1;
    }
  }
  return count;
}

function cline(l) {
  var countl = 0,
    lines = l.split('\n');

  //console.log(lines);

  for (j = 0; j < lines.length; j++) {
    countl += 1;
  }
  return countl - 1;
}

function bytes(b) {
  var countB = 0;
  for (var n = 0; n < b.length; n++) {
    var c = b.charCodeAt(n);
    if (c < 128) {
      countB++;
    }
    else if (c > 127 && c < 2048) {
      countB = countB + 2;
    }
    else {
      countB = countB + 3;
    }
  }
  return countB;
}
