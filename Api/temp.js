const fs = require('fs');
var fileCode ="";

 fs.readFile('./Roadmap.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Store the file contents in a variable
  fileCode = data;

  // Use the fileCode variable here
  console.log(fileCode);
});
