const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { search: /bg-\[#FDFBF7\]/g, replace: 'bg-[#FDFBF7] dark:bg-[#12041C]' },
  { search: /bg-white/g, replace: 'bg-white dark:bg-[#1D0A2D]' },
  { search: /text-\[#2A0845\]/g, replace: 'text-[#2A0845] dark:text-[#FDFBF7]' },
  { search: /text-\[#2A0845\]\/70/g, replace: 'text-[#2A0845]/70 dark:text-[#FDFBF7]/70' },
  { search: /bg-\[#2A0845\]/g, replace: 'bg-[#2A0845] dark:bg-[#3D155F]' }, // For buttons/footers etc
  { search: /border-\[#EAC2BB\]\/20/g, replace: 'border-[#EAC2BB]/20 dark:border-[#D4AF37]/20' },
  { search: /border-\[#EAC2BB\]\/30/g, replace: 'border-[#EAC2BB]/30 dark:border-[#D4AF37]/30' },
  { search: /bg-\[#f9f5ed\]/g, replace: 'bg-[#f9f5ed] dark:bg-[#12041C]' }, // Product image backgrounds
];

// Ensure we don't accidentally duplicate classes if run multiple times
function safeReplace(content, regex, replacement) {
  // We can just use standard replace, but we should check if it already has dark: applied right after
  return content.replace(regex, (match, offset, string) => {
    const nextChars = string.slice(offset + match.length, offset + match.length + 5);
    if (nextChars.includes('dark:')) return match; // Already processed
    return replacement;
  });
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { search, replace } of replacements) {
        content = safeReplace(content, search, replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Finished applying dark mode classes.');
