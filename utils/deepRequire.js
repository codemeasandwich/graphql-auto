const fs   = require('fs');
const path = require('path');

module.exports = function loadDir(currentPath, selector) {
  const filesToReturn = {};
  const files = fs.readdirSync(currentPath);
  for (let fileName of files) {
      var curFile = path.join(currentPath, fileName);
      if (fs.statSync(curFile).isFile()) {
        filesToReturn[path.parse(fileName).name] = require(curFile)
      } else if (fs.statSync(curFile).isDirectory()) {
       filesToReturn[fileName] = loadDir(curFile);
      }
 } // END for
 return filesToReturn
} //END loadDir
