var fs = require('fs');
fs.readFile('1.txt', 'utf8', function (err, data) {
  if (err) {
    console.log(err);
  }
  console.log('number of words is',cword(data));
  console.log('number of lines is',cline(data));
  console.log('number of lines is',(data.length));
});

function cword(w) {
  var count = 0,
    words = w.split(/\s/g);

  console.log(words);

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
