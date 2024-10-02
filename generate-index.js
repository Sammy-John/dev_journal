const fs = require('fs');
const path = require('path');

// Function to URL-encode filenames for HTML links (encode spaces as %20)
function urlEncodeFilename(filename) {
  return encodeURIComponent(filename).replace(/%2F/g, '/'); // Encodes spaces as %20
}

// Base folder containing all sections (e.g., dev_journal root folder)
const baseFolder = './course-notes'; // Path to course-notes folder

// Function to scan the directory and build links for each section
function generateIndex(folder, relativePath = '') {
  let content = `---\nlayout: layout\ntitle: ${relativePath || 'Section'}\n---\n\n# ${relativePath || 'Section'}\n\n## Files and Subsections\n\n`;

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
      const folderName = path.basename(fullPath); // Leave spaces intact for folder names
      content += `### [${folderName}](./${folderName}/index.md)\n\n`;
      // Recursively create index.md inside subfolders
      const subfolderContent = generateIndex(fullPath, path.join(relativePath, folderName));
      fs.writeFileSync(path.join(fullPath, 'index.md'), subfolderContent);
      console.log(`Index file created: ${path.join(fullPath, 'index.md')}`);
    }
    // If it's an HTML file, add a link to it (encode spaces and special characters)
    else if (item.endsWith('.html')) {
      const fileNameWithoutExtension = path.basename(item, '.html'); // Leave spaces intact for filenames
      const encodedItem = urlEncodeFilename(item); // Encode spaces as %20
      // Manually construct the relative path for the encoded filename
      content += `- [${fileNameWithoutExtension}](./${relativePath}/${encodedItem})\n`;
    }
  });

  return content;
}

// Function to generate index.md for the course-notes folder itself with custom order
function generateCourseNotesIndex() {
  let content = `---\nlayout: layout\ntitle: Course Notes\n---\n\n# Course Notes\n\n## Sections\n\n`;

  // Define the order of sections based on the classes attended
  const orderedSections = [
    'it-systems',
    'data-handling-and-web-concepts',
    'programming-principles',
    'business-analysis-and-solution',
    'secure-web-app-development',
    'data-structures-and-algorithms',
    'game-development',
    'mobile-app-development',
    'web-services',
    'software-testing-and-maintenance',
    'agile-project-management',
    'final-project',
    'software-project',
    'advanced-mobile-development',
    'data-access-and-management',
    'event-driven-programming',
    'web-programming',
    'advanced-programming',
    'interaction-design',
    'web-technologies',
    'full-stack-python-development'
  ];

  // Add each section to the course-notes index.md in the specified order
  orderedSections.forEach(section => {
    const sectionPath = path.join(baseFolder, section);
    if (fs.existsSync(sectionPath)) {
      content += `- [${section}](./${section}/index.md)\n`;
    } else {
      console.error(`Section folder not found: ${section}`);
    }
  });

  // Write the course-notes index.md
  fs.writeFileSync(path.join(baseFolder, 'index.md'), content);
  console.log('Course Notes index.md generated successfully in custom order!');
}

// Function to create index.md for each top-level folder and subfolders
function generateSectionIndices() {
  // Generate course-notes index.md first
  generateCourseNotesIndex();

  // List all sections in the course-notes folder
  const sections = fs.readdirSync(baseFolder);

  // Loop through each section and generate its index.md
  sections.forEach(section => {
    const sectionPath = path.join(baseFolder, section);
    
    // Check if the section folder exists and is a directory
    if (fs.existsSync(sectionPath) && fs.statSync(sectionPath).isDirectory()) {
      const indexPath = path.join(sectionPath, 'index.md');
      
      // Forcefully remove existing index.md file before generating
      if (fs.existsSync(indexPath)) {
        fs.unlinkSync(indexPath);
        console.log(`Removed existing index.md in ${section}`);
      }
      
      const indexContent = generateIndex(sectionPath, section);
      
      // Write the new index.md file in the section folder
      fs.writeFileSync(indexPath, indexContent);
      console.log(`Index file generated and overwritten for section: ${section}`);
    } else {
      console.error(`Section folder not found or not a directory: ${section}`);
    }
  });
}

// Generate index.md for each section and the course-notes folder
generateSectionIndices();

console.log('All index files generated successfully!');
