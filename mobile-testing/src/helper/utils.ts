import * as fs from 'fs';
import * as path from 'path';

export function deleteFolder(folderPath: string) {
  try {
     const resolve = path.join(process.cwd(), folderPath);
    if (!fs.existsSync(resolve)) {
      console.log(`Folder ${folderPath} does not exist`);
      console.log('Skipping deletion');
      return;
    }
    console.log('Deleting folder:', folderPath);
    fs.rmSync(resolve, { recursive: true, force: true });
  } catch (error) {
    console.error('Error deleting folder:', error);
  }
}


