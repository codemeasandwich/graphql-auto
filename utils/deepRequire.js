const fs   = require('fs');
const path = require('path');

const fileNamesToImport = ["mutation","query","subscription"]

module.exports = function loadDir(currentPath,onlyRequireHandlers) {
  const filesToReturn = {};
  const files = fs.readdirSync(currentPath);
  for (let fileName of files) {
      const curFile = path.join(currentPath, fileName);
      if (fs.statSync(curFile).isFile()) {
        const name = path.parse(fileName).name
        if ( ! onlyRequireHandlers || fileNamesToImport.includes(name)) {
           filesToReturn[name] = require(curFile)
        }
      } else if (fs.statSync(curFile).isDirectory()) {
       filesToReturn[fileName] = loadDir(curFile);
      }
 } // END for
 return filesToReturn
} //END loadDir
