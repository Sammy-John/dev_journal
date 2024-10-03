const fs = require('fs');
const path = require('path');

// Function to URL-encode filenames for HTML links (encode spaces as %20)
function urlEncodeFilename(filename) {
  return encodeURIComponent(filename).replace(/%2F/g, '/'); // Encodes spaces as %20
}

// Base folders
const courseNotesFolder = './course-notes'; // Path to course-notes folder
const topicNotesFolder = './topic-notes'; // Path to topic-notes folder

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
    const sectionPath = path.join(courseNotesFolder, section);
    if (fs.existsSync(sectionPath)) {
      content += `- [${section}](./${section}/index.md)\n`;
    } else {
      console.error(`Section folder not found: ${section}`);
    }
  });

  // Write the course-notes index.md
  fs.writeFileSync(path.join(courseNotesFolder, 'index.md'), content);
  console.log('Course Notes index.md generated successfully in custom order!');
}

// Function to create index.md for each folder and subfolders
function generateIndex(folder, relativePath = '') {
  let content = `---\nlayout: layout\ntitle: ${relativePath || 'Section'}\n---\n\n# ${relativePath || 'Section'}\n\n`;

  // Read all files and directories in the folder
  const items = fs.readdirSync(folder);

  // Arrays to hold different types of items
  const directories = [];
  const files = [];
  const cheatsheets = [];

  // Process each item
  items.forEach(item => {
    const fullPath = path.join(folder, item);
    const stats = fs.statSync(fullPath);

    // If it's a folder, add to directories array
    if (stats.isDirectory()) {
      directories.push(item);
    }
    // If it's a markdown file
    else if (item.endsWith('.md')) {
      if (item.toLowerCase().includes('template.md')) {
        // Skip the template file
        return;
      } else if (item.toLowerCase().includes('cheatsheet')) {
        cheatsheets.push(item);
      } else {
        files.push(item);
      }
    }
    // If it's an HTML file
    else if (item.endsWith('.html')) {
      files.push(item);
    }
  });

  // If in topic-notes root, display grid of cards for directories
  if (folder === topicNotesFolder || folder.startsWith(topicNotesFolder + path.sep)) {
    if (directories.length > 0) {
      content += `## Explore the Topics:\n<div class="card-grid">\n`;
      directories.forEach(dir => {
        const folderName = dir.replace(/-/g, ' ');
        content += `
<div class="card">
  <h3>${folderName}</h3>
  <p>Explore notes and topics related to ${folderName}.</p>
  <a href="./${dir}/index.md">Explore ${folderName}</a>
</div>\n`;
      });
      content += `</div>\n\n`;
    }
  } else {
    // For other folders, list directories as subsections
    if (directories.length > 0) {
      content += `## Subsections\n\n`;
      directories.forEach(dir => {
        const folderName = dir.replace(/-/g, ' ');
        content += `### [${folderName}](./${dir}/index.md)\n\n`;
      });
    }
  }

  // List files (notes)
  if (files.length > 0) {
    content += `## Notes\n\n`;
    files.forEach(file => {
      const fileNameWithoutExtension = path.basename(file, path.extname(file)); // Leave spaces intact for filenames
      const encodedItem = urlEncodeFilename(file); // Encode spaces as %20
      // Use only the filename in the link, as we're already in the folder
      content += `- [${fileNameWithoutExtension}](${encodedItem}) - Brief description here.\n`;
    });
    content += `\n`;
  }

  // List cheatsheets
  if (cheatsheets.length > 0) {
    content += `## Cheatsheets\n\n`;
    cheatsheets.forEach(file => {
      const fileNameWithoutExtension = path.basename(file, path.extname(file)); // Leave spaces intact for filenames
      const encodedItem = urlEncodeFilename(file); // Encode spaces as %20
      content += `- [${fileNameWithoutExtension}](${encodedItem})\n`;
    });
    content += `\n`;
  }

  // Generate index.md files for subdirectories
  directories.forEach(dir => {
    const subfolderPath = path.join(folder, dir);
    const indexPath = path.join(subfolderPath, 'index.md');

    // Forcefully remove existing index.md file before generating
    if (fs.existsSync(indexPath)) {
      fs.unlinkSync(indexPath);
      console.log(`Removed existing index.md in ${subfolderPath}`);
    }

    const subfolderContent = generateIndex(subfolderPath, path.join(relativePath, dir));
    fs.writeFileSync(indexPath, subfolderContent);
    console.log(`Index file created: ${indexPath}`);
  });

  return content;
}

// Function to create template.md in topic-notes root
function createTemplateNote() {
  const templateContent = `---
layout: note-layout
title: [Title of the Note]
---

# [Title of the Note]

## Overview
Add your content here.

## Key Points
- Point 1
- Point 2
`;

  const templatePath = path.join(topicNotesFolder, 'template.md');

  if (!fs.existsSync(templatePath)) {
    fs.writeFileSync(templatePath, templateContent);
    console.log('Template note (template.md) created in topic-notes root.');
  } else {
    console.log('Template note (template.md) already exists in topic-notes root.');
  }
}

// Function to generate index.md for topic-notes
function generateTopicNotesIndex() {
  const indexPath = path.join(topicNotesFolder, 'index.md');

  // Forcefully remove existing index.md file before generating
  if (fs.existsSync(indexPath)) {
    fs.unlinkSync(indexPath);
    console.log(`Removed existing index.md in topic-notes`);
  }

  const indexContent = generateIndex(topicNotesFolder);
  fs.writeFileSync(indexPath, indexContent);
  console.log('Topic Notes index.md generated successfully!');
}

// Main function to generate all indexes
function generateAllIndexes() {
  // Generate course-notes indexes
  generateCourseNotesIndex();
  generateSectionIndices(courseNotesFolder);

  // Generate topic-notes indexes
  generateTopicNotesIndex();
  createTemplateNote();
}

// Function to create index.md for each section and subfolders
function generateSectionIndices(baseFolder) {
  // List all sections in the base folder
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
        console.log(`Removed existing index.md in ${sectionPath}`);
      }

      const indexContent = generateIndex(sectionPath, section);
      fs.writeFileSync(indexPath, indexContent);
      console.log(`Index file generated and overwritten for section: ${section}`);
    } else {
      console.error(`Section folder not found or not a directory: ${section}`);
    }
  });
}

// Run the script to generate all indexes
generateAllIndexes();

console.log('All index files generated successfully!');
