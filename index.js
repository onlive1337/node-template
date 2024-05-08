const fs = require('fs').promises;

async function createFolderAndFiles() {
  try {
    const folderName = 'random_numbers';
    await fs.mkdir(folderName);
    console.log(`Folder ${folderName} is created`);

    for (let i = 1; i <= 3; i++) {
      const randomNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
      await fs.writeFile(`${folderName}/file${i}.txt`, randomNumbers);
      console.log(`File file${i}.txt created with: ${randomNumbers}`);
    }

    await readFilesAndCalculateAverages(folderName);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function readFilesAndCalculateAverages(folderName) {
  try {
    const fileNames = await fs.readdir(folderName);
    console.log(`Files in folder ${folderName}:`, fileNames);

    for (const fileName of fileNames) {
      const content = await fs.readFile(`${folderName}/${fileName}`, 'utf8');
      console.log(`Content of file ${fileName}: ${content}`);
      const numbers = content.split('').map(Number);
      const average = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
      console.log(`Arithmetic mean of the numbers in the file ${fileName}: ${average}`);
    }
  } catch (error) {
    console.error('An error occurred while reading files:', error);
  }
}

createFolderAndFiles();