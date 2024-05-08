const fs = require('fs').promises;

async function createFolderAndFiles() {
 try {
  const folderName = 'random_numbers';
  await fs.mkdir(folderName);

  for (let i = 1; i <= 3; i++) {
    const randomNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
    await fs.writeFile(`${folderName}/file${i}.txt`, randomNumbers);
  }
  console.log('Folder and files has created');
 } catch (error) {
  console.error('Error', error);
 }
}

createFolderAndFiles();
