const fs = require('fs');
 
fs.writeFile('test.txt', 'Hello Node.js', (err) => {
  if(err) throw err;
  console.log('File created');
});