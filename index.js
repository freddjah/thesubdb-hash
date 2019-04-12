const fs = require('fs').promises;
const md5 = require('md5');

/**
 * Calculates the hash of a file based on thesubdb.com hash function. Uses async/await.
 * http://thesubdb.com/api/
 * 
 * @param {String} filePath The path to the file whos hash wants to be calculated
 */
const getHash = async (filePath) => {
  const readSize = 64 * 1024;

  const fd = await fs.open(filePath, 'r+');

  const fileStats = await fd.stat();
  const fileSize = fileStats.size;

  const buffer = Buffer.alloc(readSize * 2);
  await fd.read(buffer, 0, readSize, 0);
  await fd.read(buffer, readSize, readSize, fileSize - readSize)
  
  return md5(buffer);
}

module.exports = { getHash }