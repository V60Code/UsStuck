const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing files for Netlify deployment...');

// Fungsi untuk copy file
function copyFile(source, destination) {
  try {
    // Buat direktori jika belum ada
    const destDir = path.dirname(destination);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      console.log(`📁 Created directory: ${destDir}`);
    }
    
    // Copy file
    fs.copyFileSync(source, destination);
    console.log(`✅ Copied: ${source} → ${destination}`);
    return true;
  } catch (error) {
    console.error(`❌ Error copying ${source} to ${destination}:`, error.message);
    return false;
  }
}

// Fungsi untuk check file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Fungsi untuk get file size
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024 / 1024).toFixed(2) + ' MB';
  } catch (error) {
    return 'Unknown';
  }
}

// Main execution
async function main() {
  const sourceFile = 'src/scripts/data/hadits.json';
  
  // Check if source file exists
  if (!fileExists(sourceFile)) {
    console.error(`❌ Source file not found: ${sourceFile}`);
    process.exit(1);
  }
  
  console.log(`📄 Source file found: ${sourceFile} (${getFileSize(sourceFile)})`);
  
  // Copy to multiple locations for maximum compatibility
  const destinations = [
    'src/public/hadits.json',  // For Vite public directory
    'hadits.json',             // For root access
    'public/hadits.json'       // Alternative public directory
  ];
  
  let successCount = 0;
  
  for (const dest of destinations) {
    if (copyFile(sourceFile, dest)) {
      successCount++;
    }
  }
  
  // Verify copies
  console.log('\n🔍 Verifying copied files...');
  for (const dest of destinations) {
    if (fileExists(dest)) {
      console.log(`✅ ${dest} (${getFileSize(dest)})`);
    } else {
      console.log(`❌ ${dest} - Not found`);
    }
  }
  
  if (successCount === destinations.length) {
    console.log('\n🎉 All files prepared successfully for Netlify deployment!');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run build');
    console.log('2. Deploy the dist/ folder to Netlify');
    console.log('3. hadits.json will be accessible at: https://yoursite.netlify.app/hadits.json');
  } else {
    console.error(`\n❌ Only ${successCount}/${destinations.length} files copied successfully`);
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});