const fs = require('fs');

const files = [
  'src/styles/index.css',
  'src/styles/components.css',
  'src/styles/pages.css',
  'src/styles/redesign.css'
];

const matchIgnoreCase = (content, arr, replacement) => {
  arr.forEach(id => {
    const regex = new RegExp(id, 'gi');
    content = content.replace(regex, replacement);
  });
  return content;
};

const textDarkIds = ['#111827', '#1f2937', '#374151'];
const textMutedIds = ['#4b5563', '#6b7280', '#9ca3af', '#cbd5e1', '#d1d5db'];
const bgLightIds = ['#f3f4f6', '#f9fafb', '#f0fdf4', '#dcfce7', '#f1f8e9', '#e3f2fd', '#e5e7eb', '#f8fafc'];
const primaryIds = ['#4285F4', '#3367D6', '#4285f4', '#3367d6'];
const greenIds = ['#9DC737', '#8AB22A', '#166534', '#15803d', '#9dc737', '#8ab22a'];
const otherIds = ['#f97316', '#ffb7b2'];

const replaceValues = (content) => {
  let newContent = content;
  newContent = matchIgnoreCase(newContent, textDarkIds, '#2d3e40');
  newContent = matchIgnoreCase(newContent, textMutedIds, '#97a6a0');
  newContent = matchIgnoreCase(newContent, bgLightIds, '#e4f2e7');
  newContent = matchIgnoreCase(newContent, primaryIds, '#387373');
  newContent = matchIgnoreCase(newContent, greenIds, '#93bfb7');
  newContent = matchIgnoreCase(newContent, otherIds, '#387373'); 
  return newContent;
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, replaceValues(content));
});
