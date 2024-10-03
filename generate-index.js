const fs = require('fs');
const path = require('path');

function urlEncodeFilename(filename) {
  return encodeURIComponent(filename.replace(/\s+/g, '-')).replace(/%2F/g, '/');
}

const courseNotesFolder = './course-notes';
const topicNotesFolder = './topic-notes';

function generateCourseNotesIndex() {
  try {
    let content = `---\nlayout: layout\ntitle: Course Notes\n---\n\n# Course Notes\n\n## Sections\n\n`;

    const orderedSections = [
      'it-systems',
      'data-handling-and-web-concepts',
      // other sections here...
    ];

    orderedSections.forEach(section => {
      const sectionPath = path.join(courseNotesFolder, section);
      if (fs.existsSync(sectionPath)) {
        content += `- [${section}](./${section}/index.md)\n`;
      } else {
        console.error(`Section folder not found: ${section}`);
      }
    });

    fs.writeFileSync(path.join(courseNotesFolder, 'index.md'), content);
    console.log('Course Notes index.md generated successfully!');
  } catch (error) {
    console.error('Error generating course notes index:', error);
  }
}

function generateIndex(folder, relativePath = '') {
  let content = `---\nlayout: layout\ntitle: ${relativePath || 'Section'}\n---\n\n# ${relativePath || 'Section'}\n\n`;

  const items = fs.readdirSync(folder);

  const directories = [];
  const files = [];

  items.forEach(item => {
    const fullPath = path.join(folder, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      directories.push(item);
    } else if (item.endsWith('.md')) {
      files.push(item);
    }
  });

  if (directories.length > 0) {
    content += `## Explore the Topics:\n<div class="card-grid">\n`;
    directories.forEach(dir => {
      const folderName = dir.replace(/-/g, ' ');
      // Link now points to .html instead of .md
      content += `
<div class="card">
  <h3>${folderName}</h3>
  <p>Explore notes and topics related to ${folderName}.</p>
  <a href="./${dir}/index.html">Explore ${folderName}</a>
</div>\n`;
    });
    content += `</div>\n\n`;
  }

  if (files.length > 0) {
    content += `## Notes\n\n`;
    files.forEach(file => {
      const fileNameWithoutExtension = path.basename(file, '.md');
      // Convert link from .md to .html
      const encodedItem = urlEncodeFilename(file).replace('.md', '.html');
      content += `- [${fileNameWithoutExtension}](${encodedItem})\n`;
    });
    content += `\n`;
  }

  directories.forEach(dir => {
    const subfolderPath = path.join(folder, dir);
    const indexPath = path.join(subfolderPath, 'index.md');

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


function createTemplateNote() {
  try {
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
  } catch (error) {
    console.error('Error creating template note:', error);
  }
}

function generateAllIndexes() {
  try {
    generateCourseNotesIndex();
    generateSectionIndices(courseNotesFolder);
    generateTopicNotesIndex();
    createTemplateNote();
  } catch (error) {
    console.error('Error generating all indexes:', error);
  }
}

function generateTopicNotesIndex() {
  try {
    const indexPath = path.join(topicNotesFolder, 'index.md');
    if (fs.existsSync(indexPath)) {
      fs.unlinkSync(indexPath);
      console.log(`Removed existing index.md in topic-notes`);
    }
    const indexContent = generateIndex(topicNotesFolder);
    fs.writeFileSync(indexPath, indexContent);
    console.log('Topic Notes index.md generated successfully!');
  } catch (error) {
    console.error('Error generating topic notes index:', error);
  }
}

function generateSectionIndices(baseFolder) {
  try {
    const sections = fs.readdirSync(baseFolder);
    sections.forEach(section => {
      const sectionPath = path.join(baseFolder, section);
      if (fs.existsSync(sectionPath) && fs.statSync(sectionPath).isDirectory()) {
        const indexPath = path.join(sectionPath, 'index.md');
        if (fs.existsSync(indexPath)) {
          fs.unlinkSync(indexPath);
          console.log(`Removed existing index.md in ${sectionPath}`);
        }
        const indexContent = generateIndex(sectionPath, section);
        fs.writeFileSync(indexPath, indexContent);
        console.log(`Index file generated for section: ${section}`);
      } else {
        console.error(`Section folder not found or not a directory: ${section}`);
      }
    });
  } catch (error) {
    console.error('Error generating section indices:', error);
  }
}

// Run the script to generate all indexes
generateAllIndexes();

console.log('All index files generated successfully!');
