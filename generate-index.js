const fs = require('fs');
const path = require('path');

// Function to URL-encode filenames for HTML links
function urlEncodeFilename(filename) {
  return encodeURIComponent(filename).replace(/%2F/g, '/');
}

// Base folder containing all sections (e.g., dev_journal root folder)
const baseFolder = './course-notes'; // Adjust the path if necessary to your main folder

// Function to scan the directory and build links for each section
function generateIndex(folder, relativePath = '') {
  let content = `# ${relativePath || 'Section'}\n\n## Files and Subsections\n\n`;

  // Read all files and directories in the folder
  const items = fs.readdirSync(folder);
  
  // Process each item
  items.forEach(item => {
    const fullPath = path.join(folder, item);
    const stats = fs.statSync(fullPath);
    
    // Log each file or folder being processed
    console.log(`Processing: ${fullPath}`);
    
    // If it's a folder, recursively scan it and link to the folder's index.md
    if (stats.isDirectory()) {
      const folderName = path.basename(fullPath);
      content += `### [${folderName}](./${folderName}/index.md)\n\n`;
      generateIndex(fullPath, path.join(relativePath, folderName));  // Recursively create index.md inside subfolders
    }
    // If it's a Markdown file, add a link to it
    else if (item.endsWith('.md')) {
      const fileNameWithoutExtension = path.basename(item, '.md');
      const encodedItem = urlEncodeFilename(item);
      content += `- [${fileNameWithoutExtension}](./${path.join(relativePath, encodedItem)})\n`;
    }
  });

  return content;
}

// Function to create index.md for each top-level folder
function generateSectionIndices() {
  // List all sections in the base folder
  const sections = fs.readdirSync(baseFolder);

  // Loop through each section and generate its index.md
  sections.forEach(section => {
    const sectionPath = path.join(baseFolder, section);
    
    // Check if the section folder exists and is a directory
    if (fs.existsSync(sectionPath) && fs.statSync(sectionPath).isDirectory()) {
      const indexContent = generateIndex(sectionPath, section);
      
      // Write the index.md file in the section folder
      fs.writeFileSync(path.join(sectionPath, 'index.md'), indexContent);
      console.log(`Index file generated for section: ${section}`);
    } else {
      console.error(`Section folder not found or not a directory: ${section}`);
    }
  });
}

// Generate index.md for each section in the base folder
generateSectionIndices();

console.log('All section index files generated successfully!');
