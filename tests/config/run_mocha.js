const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');

require('babel-polyfill');
//support ES6 modules
require('@babel/register');
//localstorage mocking
require('mock-local-storage');

// Instantiate a Mocha with options
const mocha = new Mocha({
  reporter: 'list'
});

//disable certificate vertification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// Use non-default Mocha test directory.
const testDir = 'tests';

// Get all .js paths and add each file to the mocha instance.
getTestPaths(testDir).forEach((file) => {
  mocha.addFile(
      path.join(file)
  );
});

/**
 * Gets the test .js file paths recursively from a given directory.
 * @param {String} dir - path to directory containing test files.
 * @returns {Array} Filepaths to each test .js file.
 */
getTestPaths(dir, fileList) = () => {
  var files = fs.readdirSync(dir);
  fileList = fileList || [];

  files.forEach((file) => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
          fileList = getTestPaths(path.join(dir, file), fileList);
      } else {
          fileList.push(path.join(dir, file));
      }
  });

  return fileList.filter((file) => {
      return path.extname(file) === '.js';
  });
}

//set storage moch for api call
localStorage.setItem('jwt-token', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNTkxNTY0OTkyfQ.m_-1kSpOqtjviQW-tZLOB9MENxNdp4Ceqh1ilYRkWDqck3t9TFuBwquIdLo2n2NmHpkIfLu3FiRCa4HeamAexw');

// Run the tests.
mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0; // exit with non-zero status if there were failures
});
