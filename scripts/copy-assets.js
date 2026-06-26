import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Source directory does not exist: ${src}`);
    return;
  }
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

// Target directories in public/
const publicDir = path.join(__dirname, 'public');
const destAssets = path.join(publicDir, 'assets');
const destImages = path.join(destAssets, 'images');

// Create directories if they do not exist
fs.mkdirSync(destImages, { recursive: true });

// Copy images from src/assets/images to public/assets/images
const srcImages = path.join(__dirname, 'src', 'assets', 'images');
if (fs.existsSync(srcImages)) {
  console.log(`Copying images from ${srcImages} to ${destImages}...`);
  copyDir(srcImages, destImages);
} else {
  console.warn(`Images directory not found: ${srcImages}`);
}

// Copy videos (.mp4) from src/assets to public/assets
const srcAssets = path.join(__dirname, 'src', 'assets');
if (fs.existsSync(srcAssets)) {
  console.log(`Copying videos from ${srcAssets} to ${destAssets}...`);
  const entries = fs.readdirSync(srcAssets, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() && entry.name.toLowerCase().endsWith('.mp4')) {
      const srcPath = path.join(srcAssets, entry.name);
      const destPath = path.join(destAssets, entry.name);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
} else {
  console.warn(`Assets directory not found: ${srcAssets}`);
}

// Copy PDF documents from root to public
const pdfs = ['Application_Form_Printable.pdf', 'Costs Booklet.pdf'];
for (const pdf of pdfs) {
  const srcPath = path.join(__dirname, pdf);
  if (fs.existsSync(srcPath)) {
    const destPath = path.join(publicDir, pdf);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied pdf: ${srcPath} -> ${destPath}`);
  } else {
    console.warn(`PDF document not found at root: ${srcPath}`);
  }
}

// Compile latest live calendar events from Google iCal
import { execSync } from 'child_process';
try {
  console.log("Triggering Google Calendar live compiler...");
  execSync('node scripts/compile-calendar.js', { stdio: 'inherit' });
} catch (err) {
  console.error("Warning: Calendar compilation process encountered an issue:", err);
}

console.log('Automated assets preparation completed.');
