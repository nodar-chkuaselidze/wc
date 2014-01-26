var fs = require('fs');
fs.readFile('test.txt', 'utf8', function (err, data) {
  if (err) {
    console.log(err);
  }
  console.log('number of words is', cword(data));
  console.log('number of lines is', cline(data));
  console.log('number of lines is', data.length);
  console.log('number of bytes is', bytes(data));
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
    if (lines[i] != '') {
      countl += 1;
    }
  }
  return countl;
}

function bytes(b) {
  var countB = 0;
  for (var n = 0; n < b.length; n++) {
    var c = b.charCodeAt(n);
    if (c < 128) {
      countB++;
    }
    else if((c > 127) && (c < 2048)) {
      countB = countB + 2;
    }
    else {
      countB = countB + 3;
    }
  }
  return countB;
}
