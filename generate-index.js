const fs = require('fs');
const path = require('path');

// Function to URL-encode filenames for HTML links
function urlEncodeFilename(filename) {
  return encodeURIComponent(filename).replace(/%2F/g, '/');
}

// Folder to scan
const baseFolder = './it-systems'; // Adjust the path as necessary

// Function to scan the directory and build links
function generateIndex(folder, relativePath = '') {
  let content = `# IT Systems\n\n## Sections\n\n`;

  // Read all files and directories in the folder
  const items = fs.readdirSync(folder);
  
  // Process each item
  items.forEach(item => {
    const fullPath = path.join(folder, item);
    const stats = fs.statSync(fullPath);
    
    // Log each file or folder being processed
    console.log(`Processing: ${fullPath}`);
    
    // If it's a folder, recursively scan it
    if (stats.isDirectory()) {
      content += `### ${item}\n\n`;
      content += generateIndex(fullPath, path.join(relativePath, item));
    }
    // If it's an HTML file, add a link to it
    else if (item.endsWith('.html')) {
      const fileNameWithoutExtension = path.basename(item, '.html');
      const encodedItem = urlEncodeFilename(item);
      content += `- [${fileNameWithoutExtension}](./${path.join(relativePath, encodedItem)})\n`;
    }
  });

  return content;
}

// Generate index.md content
const indexContent = generateIndex(baseFolder);

// Write the content to index.md
fs.writeFileSync(path.join(baseFolder, 'index.md'), indexContent);

console.log('Index file generated successfully!');
